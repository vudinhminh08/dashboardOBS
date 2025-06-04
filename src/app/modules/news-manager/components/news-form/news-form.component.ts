import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BaseDestroyComponent } from '@core/components';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from '@core/services/notification.service';
import { ValidatorUtil } from '@core/utils/validator.util';
import { getValueImageBase64, isValidHttpUrl } from '@core/utils';
import {
  DATE_TIME_SQL_FORMAT,
  ModuleQuill
} from '@core/constants';
import {
  OptionSourceTypeArticle,
  OptionSourceTypeArticleValue,
  OptionStatuseArticle,
  OptionStatusArticleValue
} from '@core/options';
import { OptionModel } from '@core/models';
import { map, takeUntil } from 'rxjs/operators';
import { DateUtil } from '@core/utils/date.util';
import { differenceInCalendarDays, endOfDay, format, startOfDay } from 'date-fns';
import { NewsManagerServices } from '@modules/news-manager/state/service';
import { ApproveArticlePostRequest, ItemNewsResponsed, SaveNewsItemRequest } from '@modules/news-manager/models';
import { Router } from '@angular/router';
import { selectOptionCategoryChildByCode } from '@modules/app-config/categories-config/state/selectors';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  clearStateCategoryChildByCode,
  getCategoryChildByCode
} from '@modules/app-config/categories-config/state/actions';
import { FormUtil } from '@core/utils/form.util';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ObjUtil } from '@core/utils/obj.util';
import { RoleUser } from '@core/enums';
import { PermissionService } from '@core/services/permission.service';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
})
export class NewsFormComponent extends BaseDestroyComponent implements OnInit{

  @ViewChild('tplContent', { read: TemplateRef }) tplContent: TemplateRef<void>;
  @ViewChild('tplPreviewContent', { static: false }) tplPreviewContent?: TemplateRef<{ $implicit: { value: string }; drawerRef: NzDrawerRef<string>; }>;
  @ViewChild('tplPreviewClose') tplPreviewClose: TemplateRef<{}>;

  @Input() articleId: string;
  @Input() typeAction: 'CREATE' | 'UPDATE' | 'VIEW' = 'CREATE';

  form: FormGroup;
  formReason: FormGroup;

  valueStatuseArticle = OptionStatusArticleValue;

  loadingSave = false;
  moduleQuill = ModuleQuill;
  roleUser = RoleUser;
  optionSourceTypeArticle: OptionModel[] = OptionSourceTypeArticle;
  valueSourceTypeArticle = OptionSourceTypeArticleValue;


  optionStatusNoiBo: OptionModel<number>[] = OptionStatuseArticle.filter(item => [this.valueStatuseArticle.HieuLuc, this.valueStatuseArticle.HetHieuLuc].includes(item.value));
  optionStatusThuThap: OptionModel<number>[] = OptionStatuseArticle;

  typeArticle$: Observable<OptionModel<number | string>[]> = this.store.select(selectOptionCategoryChildByCode('NEWS'));
    // .pipe(map(list => [{label: 'Tất cả', value: ''}, ...list]));

  modalApprove: NzModalRef;
  loadingApprove = false;

  drawerPreviewRef: NzDrawerRef;

  disabledFromDate = (current: Date): boolean =>
    differenceInCalendarDays(current, new Date()) < 0 || // disable ngày trước today
    this.form?.value?.endTime && differenceInCalendarDays(current, new Date(this.form?.value?.endTime)) > 0; // nếu có endTime thì disable những ngày sau end time, nếu ko có thì thôi

  disabledToDate = (current: Date): boolean =>
    differenceInCalendarDays(current, new Date(this.form?.value?.startTime)) < 0 || // disable những ngày trc startTime, nếu ko có startTime thì disable những ngày trc today
    differenceInCalendarDays(current, new Date()) < 0;


  constructor(
    private fb: FormBuilder,
    private store: Store,
    private notification: NotificationService,
    private newsManagerServices: NewsManagerServices,
    private permissionService: PermissionService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private drawerService: NzDrawerService
  ) {
    super();
  }


  ngOnInit() {
    this.buildForm();

    this.store.dispatch(getCategoryChildByCode({payload: {globalCode: 'NEWS'}}));

    if (this.articleId){
      this.getDetailArticle(this.articleId);
    }

  }

  getDetailArticle(articleId: string){
    this.newsManagerServices.getDetailArticlePost(articleId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: ItemNewsResponsed) => {
          if (res){
            this.patchValueForm(res)
          }
        },
        error: ({error}) => {

          this.notification.open({
            type: 'error',
            content: error?.message || 'Đã có lỗi khi lấy thông tin bài viết'
          })
        }
      })
  }

  patchValueForm(data: ItemNewsResponsed){
    this.form.patchValue({
      ...data,
      bannerB64: data.bannerLink,
      isHot: Boolean(data.isHot)
    });
    this.form.patchValue({status: data.status});

    if (this.typeAction === 'VIEW'){
      this.form.disable()
    };

    if (this.typeAction === 'UPDATE'){
      this.form.controls['source'].disable();

      // nếu là bài viết nội bộ thì enable option status, hoặc nếu là bài viết thu thập và status đang là Hiệu lực hoặc hết hiệu lực thì đc enable option status
      if (this.sourceArticle === this.valueSourceTypeArticle.EXTERNAL){
        if (this.statusArticle === this.valueStatuseArticle.HieuLuc || this.statusArticle === this.valueStatuseArticle.HetHieuLuc){
          this.form.disable();
        }
        
        if (this.statusArticle === this.valueStatuseArticle.TuChoi || this.statusArticle === this.valueStatuseArticle.ChoDuyet){
          this.form.get('status')?.disable();
        } else {
          this.form.get('status')?.enable();
        }

      }
    }

  }


  setValidateFormFollowSource(sourceArticle: 'INTERNAL' | 'EXTERNAL'){

    const controls = ['description', 'content'];

    if (sourceArticle === this.valueSourceTypeArticle.INTERNAL){

      // controls.map((ele) => {
        this.form.controls['description'].addValidators([ValidatorUtil.maxLength(4000, 'Tiêu đề không cho phép nhập quá 4000 ký tự')]);
        this.form.controls['content'].addValidators([ValidatorUtil.required('Nội dung tin tức không được để trống')]);
      // });

      if (!this.form.controls['id'].value){
        this.form.patchValue({status: this.valueStatuseArticle.HieuLuc})
      }

      this.form.controls['link'].clearValidators();

    } else if (sourceArticle === this.valueSourceTypeArticle.EXTERNAL){

      controls.map((ele) => {
        this.form.controls[ele].clearValidators();
      });

      if (!this.form.controls['id'].value){
        this.form.patchValue({status: this.valueStatuseArticle.ChoDuyet})
      }

      this.form.controls['link'].addValidators([
        ValidatorUtil.required('Link bài viết không được để trống'),
        ValidatorUtil.maxLength(2000, 'Link bài viết không cho phép nhập quá 2000 ký tự')
      ]);
    }
    this.cdr.detectChanges();
    this.form.markAsPristine();
  }


  navigateToList(){
    this.router.navigate(['/news-manager/list'])
  }


  resetFormToDefaultValue(){
    this.form.reset();
    this.form.patchValue({source: this.valueSourceTypeArticle.INTERNAL})
  }

  submitForm() {

    if (!this.permissionService.hasRole([this.roleUser.ADMIN, this.roleUser.USER])){
      this.notification.open({
        type: 'warning',
        content: 'Bạn không có quyền tạo/cập nhật bài viết'
      });
      return;
    }

    FormUtil.validate(this.form);
    const formVal = this.form.getRawValue();

    const payload = {
      ...formVal,
      startTime: formVal.startTime ? DateUtil.formatTimeSQL(startOfDay(new Date(formVal.startTime)), DATE_TIME_SQL_FORMAT) : null,
      endTime: formVal.endTime ? DateUtil.formatTimeSQL(endOfDay(new Date(formVal.endTime)), DATE_TIME_SQL_FORMAT) : null,
      bannerB64: (formVal.bannerB64 && !isValidHttpUrl(formVal.bannerB64)) ? getValueImageBase64(formVal.bannerB64) : '',
      isHot: Number(formVal?.isHot),
    }

    this.saveNewsItems(payload)
  }

  saveNewsItems(body: SaveNewsItemRequest){
    this.loadingSave = true;
    this.newsManagerServices.saveArticlePost(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.notification.open({
            type: 'success',
            content: this.articleId ? 'Cập nhật thông tin bài viết thành công' : 'Tạo mới bài viết thành công'
          });
          this.loadingSave = false;
          this.router.navigate(['/news-manager/list'])
        },
        error: ({error}) => {
          this.notification.open({
            type: 'error',
            content: error?.message || (this.articleId ? 'Đã có lỗi khi cập nhật bài viết' : 'Đã có lỗi khi tạo bài viết')
          });
          this.loadingSave = false;
        }
      })
  }


  openModalConfirmApprove(status: 1 | 3){
    if (status === this.valueStatuseArticle.TuChoi){
      this.formReason.controls['reason'].addValidators([
        ValidatorUtil.required('Lý do từ chối không được để trống'),
        ValidatorUtil.maxLength(500, 'Lý do từ chối không cho phép nhập quá 500 ký tự')
      ]);
      // this.formReason.controls['reason'].updateValueAndValidity();
    } else {
      this.formReason.controls['reason'].clearValidators();
    }

    this.modalApprove = this.modal.confirm({
      nzTitle: status === this.valueStatuseArticle.HieuLuc ? 'Duyệt bài viết' : 'Từ chối duyệt',
      nzContent: status === this.valueStatuseArticle.HieuLuc ? `Bạn có chắc chắn muốn duyệt bài viết?` : this.tplContent,
      nzOkText: 'OK',
      nzWrapClassName: 'modalConfirm',
      nzIconType: '',
      nzWidth: 500,
      nzOnOk: () => {
        this.confirmApproveOrReject(status);
        return false;
      },
      nzOnCancel: () => {this.formReason.reset()}
    });
    return;
  }

  confirmApproveOrReject(status: 1 | 3){ // duyệt và từ chối dùng chung 1 api, duyệt thì truyền status = 1, từ chối thì status = 3 và thêm reason

    FormUtil.validate(this.formReason, true);
    if (this.formReason.invalid ){
      return;
    }

    this.modalApprove.updateConfig({nzOkLoading: true});

    const body: ApproveArticlePostRequest = {
      id: this.articleId,
      status,
      reason: this.formReason.controls['reason'].value || ''
    }

    this.newsManagerServices.approveArticlePost(ObjUtil.deleteNullProp(body))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res == 'Success'){ // api chỉ trả về 1 TEXT "Success" khi thành công
            this.notification.open({
              type: 'success',
              content: status === this.valueStatuseArticle.HieuLuc ? "Bài viết đã được duyệt thành công" : 'Đã từ chối duyệt bài viết'
            });

            this.loadingApprove = false;
            this.modalApprove.destroy();
            this.getDetailArticle(this.articleId);
          }
        },
        error: ({error}) => {
          this.modalApprove.updateConfig({nzOkLoading: false});
          this.notification.open({
            type: 'error',
            content: error?.message || (status === this.valueStatuseArticle.HieuLuc ? "Đã có lỗi khi duyệt bài viết" : 'Đã có lỗi khi từ chối bài viết')
          });
        }
      });
  }

  onPreview(): void {
    const formVal = this.form.getRawValue();

    if(formVal.source === this.valueSourceTypeArticle.INTERNAL){
      this.drawerPreviewRef = this.drawerService.create({
        nzTitle: 'Preview',
        nzFooter: '',
        nzExtra: this.tplPreviewClose,
        nzContent: this.tplPreviewContent,
        nzClosable: false
      });
    } else if (formVal.source === this.valueSourceTypeArticle.EXTERNAL){
      window.open(formVal.link);
    }

  };

  closeDrawerRef(){
    this.drawerPreviewRef.close()
  }

  buildForm(){
    this.form = this.fb.group({
      id: [],
      globalListDetailId: ['', [ValidatorUtil.required('Loại tin tức không được để trống')]],

      typeNews: [],
      source: [this.valueSourceTypeArticle.INTERNAL, [ValidatorUtil.required('Nguồn bài viết không được để trống')]],
      startTime: ['', [ValidatorUtil.required('Thời điểm bắt đầu không được để trống')]],
      endTime: [],
      status: [{value: this.valueStatuseArticle.HieuLuc, disabled: this.typeAction === 'CREATE'}, [ValidatorUtil.required()]], // nếu source = INTERNAL thì status mặc định là 1 (Hiệu lực); nếu source = EXTERNAL thì status mặc định là 2 (Chờ duyệt)
      title: ['', [ValidatorUtil.required('Tiêu đề bài viết không được để trống'), ValidatorUtil.maxLength(1000, 'Tiêu đề không cho phép nhập quá 1000 ký tự')]],
      description: ['', ValidatorUtil.maxLength(4000, 'Tiêu đề không cho phép nhập quá 4000 ký tự')],
      content: ['', [ValidatorUtil.required('Nội dung tin tức không được để trống')]],

      link: [''],
      bannerLink: ['',],
      bannerB64: ['', [ValidatorUtil.required('Ảnh banner không được để trống')]],

      priority: [],
      isHot: [],

    });

    this.formReason = this.fb.group({
      reason: [null, [
        ValidatorUtil.required('Lý do từ chối không được để trống'),
        ValidatorUtil.maxLength(500, 'Lý do từ chối không cho phép nhập quá 500 ký tự')
      ]],
    });
  }


  get statusArticle() {
    return this.form && (this.form.controls['status'].value);
  }

  get sourceArticle() {
    return this.form && (this.form.controls['source'].value);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.store.dispatch(clearStateCategoryChildByCode())
  }

}

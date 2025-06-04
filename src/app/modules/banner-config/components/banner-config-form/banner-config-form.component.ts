import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { BaseDestroyComponent } from '@core/components';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from '@core/services/notification.service';
import { ValidatorUtil } from '@core/utils/validator.util';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { getBase64, getValueImageBase64, isValidHttpUrl } from '@core/utils';
import {
  DATE_TIME_SQL_FORMAT_TIMEZONE,
  CODE_FORMAT,
  ModuleQuill,
  SPECIAL_CHARACTERS_REJECT,
  REGEX_USERNAME_ALLOW_INPUT
} from '@core/constants';
import {
  OptionDisplayType,
  OptionSourceTypeArticle,
  OptionStatuseArticle,
  ValueOptionDisplayType
} from '@core/options';
import { OptionModel } from '@core/models';
import { takeUntil } from 'rxjs/operators';
import { ItemCategoryDetailList } from '@modules/app-config/categories-config/models';
import { DateUtil } from '@core/utils/date.util';
import { differenceInCalendarDays, format } from 'date-fns';
import { NewsManagerServices } from '@modules/news-manager/state/service';
import { Router } from '@angular/router';
import { SaveBannerItemRequest } from '@modules/banner-config/models';
import { Store } from '@ngrx/store';
import { getGlobalListService } from '@modules/service-configuration/service-config/state/service-config.actions';
import { selectGlobelList } from '@modules/service-configuration/service-config/state/service-config.selectors';
import { FormUtil } from '@core/utils/form.util';
import { ObjUtil } from '@core/utils/obj.util';
import { flatten } from 'lodash';
import { BannerConfigService } from '@modules/banner-config/services/banner-config.service';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { clearStateCurrentBannerConfig, findOneBannerConfig } from '@modules/banner-config/states/banner-config.actions';
import {
  selectBannerConfigLoading,
  selectCurrentBannerConfig
} from '@modules/banner-config/states/banner-config.selectors';
import { IAlbum, Lightbox } from 'ngx-lightbox';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-banner-config-form',
  templateUrl: './banner-config-form.component.html',
})
export class BannerConfigFormComponent
  extends BaseDestroyComponent
  implements OnInit
{
  form: FormGroup;
  loadingSave = false;
  checkCode: boolean = true;
  moduleQuill = ModuleQuill;
  optionSourceTypeArticle: OptionModel[] = OptionSourceTypeArticle;
  typeArticle: OptionModel<number>[] = [];
  lstBannerType: OptionModel[] = [
    { value: 'BACKGROUND_IMAGE', label: 'Ảnh background' },
    { value: 'HOME_BANNER', label: 'Banner màn hình chính' },
    { value: 'SCREEN_BANNER', label: 'Banner các màn hình' }
  ];
  lstScreenBanner: { value: any; label: any }[];

  isUpdate: boolean = false;
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  linkBanner: string;
  previewVisible = false;
  readonly modalData = inject(NZ_MODAL_DATA);
  REGEX_USERNAME = REGEX_USERNAME_ALLOW_INPUT;

  optionAccount = OptionDisplayType;
  valueDisplayType = ValueOptionDisplayType;

  disabledFromDate = (current: Date): boolean =>
    differenceInCalendarDays(current, new Date()) < 0 || // disable ngày trước today
    (this.form?.value?.endTime &&
      differenceInCalendarDays(current, new Date(this.form?.value?.endTime)) >
        0); // nếu có endTime thì disable những ngày sau end time, nếu ko có thì thôi

  disabledToDate = (current: Date): boolean =>
    differenceInCalendarDays(current, new Date(this.form?.value?.startTime)) <
      0 || // disable những ngày trc startTime, nếu ko có startTime thì disable những ngày trc today
    differenceInCalendarDays(current, new Date()) < 0;


  loading$ = this.store.select(selectBannerConfigLoading);

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private router: Router,
    private store: Store,
    private serviceBannerConfig: BannerConfigService,
    private modalRef: NzModalRef,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  get itemData(){
    return this.modalData.data;
  }

  ngOnInit() {
    this.buildForm();

    this.store.dispatch(getGlobalListService({ payload: { status: 1 } }));
    this.getData();



    if (this.itemData?.id) {
      this.isUpdate = true;
      this.cdr.markForCheck()
      this.form.controls['bannerType'].disable();
      this.store.dispatch(findOneBannerConfig({ payload: { id: this.itemData.id } }));
      this.form.controls['bannerCode'].disable();
    } else {
      this.store.dispatch(clearStateCurrentBannerConfig())
      this.isUpdate = false;
      this.cdr.markForCheck()
    }
    this.store
    .select(selectCurrentBannerConfig)
    .pipe(takeUntil(this.destroy$))
    .subscribe((item: any) => {
      this.form.patchValue({...item, imageB64: item?.linkBanner});
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  submitForm() {
    const formVal = this.form.getRawValue();
    const payload = {
      ...formVal,
      startTime: formVal.startTime
        ? DateUtil.formatTimeSQL(
            new Date(formVal.startTime),
            DATE_TIME_SQL_FORMAT_TIMEZONE
          )
        : null,
      endTime: formVal.endTime
        ? DateUtil.formatTimeSQL(
            new Date(formVal.endTime),
            DATE_TIME_SQL_FORMAT_TIMEZONE
          )
        : null,
        status: Number(formVal.status),
      imageB64: (formVal.imageB64 && !isValidHttpUrl(formVal.imageB64)) ? getValueImageBase64(formVal.imageB64) : '',
    };
    this.saveNewsItems(payload);
  }

  saveNewsItems(body: SaveBannerItemRequest) {
    FormUtil.validate(this.form);
    if (this.modalData.data) {
      this.loadingSave = true;
      this.serviceBannerConfig
        .updateBannerConfig(this.modalData.data.id, body)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.notification.open({
              type: 'success',
              content: 'Cập nhật banner thành công'
            });
            this.loadingSave = false;
            this.modalRef.destroy({ data: true });
          },
          error: ({ error }) => {
            this.notification.open({
              type: 'error',
              content: error?.message || 'Đã có lỗi khi cập nhật banner'
            });
            this.loadingSave = false;
          }
        });
    } else {
      this.loadingSave = true;
      this.serviceBannerConfig
        .createBannerConfig(body)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.notification.open({
              type: 'success',
              content: 'Tạo mới banner thành công'
            });
            this.loadingSave = false;
            this.modalRef.destroy({ data: true });
          },
          error: ({ error }) => {
            this.notification.open({
              type: 'error',
              content: error?.message || 'Đã có lỗi khi tạo banner'
            });
            this.loadingSave = false;
          }
        });
    }
  }


  getData() {
    this.store
      .select(selectGlobelList)
      .pipe(takeUntil(this.destroy$))
      .subscribe((items: any) => {
        if (items) {
          // const lstBanner = items.filter((item: any) =>
          //   ['BACKGROUND_IMAGE', 'HOME_BANNER', 'SCREEN_BANNER'].includes(
          //     item.code
          //   )
          // );
          // const banner = flatten(
          //   lstBanner.map((item: any) => item.globalListDetails)
          // );
          // this.lstBannerType =
          //   banner?.map((x: any) => {
          //     return { value: x.globalListDetailId, label: ` ${x.name}` };
          //   }) || [];

          for (const arrElement of items) {
            if (arrElement && arrElement.code == 'SCREEN_BANNER') {
              const list = arrElement.globalListDetails?.filter(
                (arr: any) => arr.status == 1
              );
              this.lstScreenBanner =
                list?.map((x: any) => {
                  return { value: x.code, label: ` ${x.name}` };
                }) || [];
            }
          }
        }
      });
  }

  onChangeBannerType(item: 'BACKGROUND_IMAGE' | 'HOME_BANNER' | 'SCREEN_BANNER') {
    if (item == 'BACKGROUND_IMAGE' || item == 'HOME_BANNER') {
      this.checkCode = true;
      this.form.controls['bannerCode'].reset();

    } else {
      this.checkCode = false;
      this.form.controls['bannerCode'].reset();
    }

    if (item == 'SCREEN_BANNER'){
      this.form.controls['displayType'].patchValue(this.valueDisplayType.TatCa);
      this.form.controls['displayType'].disable();

    } else {
      this.form.controls['displayType'].enable();

    }
  }
  cancel() {
    this.modalRef.destroy();
  }
  onClear() {
    this.form.reset();
  }
  onSwitchChange(value: boolean) {
    this.form.controls['status'].patchValue(!value);
  }


  onChangeDisplayType(value: 1 | 2){
    if (value === this.valueDisplayType.TatCa){
      this.form.controls['displayFor'].clearValidators();
      this.form.controls['displayFor'].disable();
      this.form.controls['displayFor'].reset();
    } else if (value === this.valueDisplayType.NhapDsKhachHang){
      this.form.controls['displayFor'].addValidators([
        ValidatorUtil.required('Danh sách tài khoản không được để trống'),
        ValidatorUtil.maxLength(3000, 'Mô tả không cho phép nhập quá 3000 kí tự')
      ]);
      this.form.controls['displayFor'].enable();
    }
  }

  buildForm() {
    this.form = this.fb.group({
      id: [],
      bannerType: ['', [ValidatorUtil.required('Loại banner không được để trống')]],
      bannerCode: ['', [
          ValidatorUtil.required('Mã banner không được để trống'),
          ValidatorUtil.patternReject(SPECIAL_CHARACTERS_REJECT, 'Mã banner không đúng định dạng'),
          ValidatorUtil.maxLength(50, 'Mã banner không cho phép nhập quá 50 kí tự')
        ]],
      bannerName: ['', [
          ValidatorUtil.maxLength(200, 'Tiêu đề banner không cho phép nhập quá 200 kí tự'),
          ValidatorUtil.required('Tên banner không được để trống')
        ]],
      typeNews: [],
      title: [],
      description: ['', ValidatorUtil.maxLength(500, 'Mô tả không cho phép nhập quá 500 kí tự')],
      content: [],
      status: [],
      screenRedirect: [''],
      link: [],
      linkBanner: [''],
      imageB64: ['', [ValidatorUtil.required('Ảnh banner không được để trống')]],
      priority: [],
      displayType: [this.valueDisplayType.TatCa],
      displayFor: [{value: null, disabled: true}],

    });
  }
}

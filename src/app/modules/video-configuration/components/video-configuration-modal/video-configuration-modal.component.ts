import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseDestroyComponent } from '@core/components';
import { CODE_FORMAT, REGEX_USERNAME_ALLOW_INPUT, SPECIAL_CHARACTERS_REJECT } from '@core/constants';
import { OptionModel } from '@core/models';
import { NotificationService } from '@core/services/notification.service';
import { FormUtil } from '@core/utils/form.util';
import { ObjUtil } from '@core/utils/obj.util';
import { ValidatorUtil } from '@core/utils/validator.util';
import { getGlobalListService } from '@modules/service-configuration/service-config/state/service-config.actions';
import { selectGlobelList } from '@modules/service-configuration/service-config/state/service-config.selectors';
import { clearStateCreateVideosConfig, clearStateCreateVideosConfigError, clearStateUpdateVideosConfig, clearStateUpdateVideosConfigError, createVideosConfig, updateVideosConfig } from '@modules/video-configuration/states/video-configuration.actions';
import { selectCreateVideosConfigError, selectCreateVideosConfigSuccess, selectUpdateVideosConfigError, selectUpdateVideosConfigSuccess, selectVideosConfigLoading } from '@modules/video-configuration/states/video-configuration.selectors';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-video-configuration-modal',
  templateUrl: './video-configuration-modal.component.html',
  styleUrls: ['./video-configuration-modal.component.scss']
})
export class VideoConfigurationModalComponent extends BaseDestroyComponent implements OnInit {
    
  constructor(private fb: FormBuilder,
    private modalRef: NzModalRef,
     private store: Store,
     protected notificationService: NotificationService,
     private cdr: ChangeDetectorRef ) {super() }
form: FormGroup
loading$: Observable<boolean>;
optionHome: OptionModel<any>[] = [
  { label: 'Trên', value: 1 },
  { label: 'Dưới', value: 0 },
];
id: any
isUpdate: boolean = false
numberOfElements: number
lstPartner: { value: any; label: any }[];
lstScreenHome: { value: any; label: any }[];
readonly modalData = inject(NZ_MODAL_DATA);
REGEX_USERNAME = REGEX_USERNAME_ALLOW_INPUT;

ngOnInit() {
  this.buildForm()
  this.loading$ = this.store.select(selectVideosConfigLoading);
  this.store.dispatch(getGlobalListService({ payload: { status: 1 } }))
  this.getData()
  if(this.modalData.data){
    this.isUpdate = true
    this.form.patchValue(this.modalData.data)
    this.form.controls['videoCode'].disable()
    this.store
    .select(selectUpdateVideosConfigSuccess)
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res){  this.notificationService.open({
        type: 'success',
        content: 'Cập nhật thông tin thành công'
      });
      this.modalRef.destroy({ data: true});
      this.store.dispatch(clearStateUpdateVideosConfig())
    } 
    });
  this.store
    .select(selectUpdateVideosConfigError)
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res){
        this.notificationService.open({
          type: 'error',
          content: res?.message || 'Có lỗi xảy ra, vui lòng liên hệ CSKH 1900980 để được hỗ trợ'
        });
      this.store.dispatch(clearStateUpdateVideosConfigError())}
    });
  }
  else {
    this.isUpdate = false
    this.store
    .select(selectCreateVideosConfigSuccess)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res){ 
         this.notificationService.open({
        type: 'success',
        content: 'Thêm mới video thành công'
      });
      this.modalRef.destroy({ data: true});}
      this.store.dispatch(clearStateCreateVideosConfig())
      
    });

  this.store
    .select(selectCreateVideosConfigError)
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => {  
      if (res){
        this.notificationService.open({
          type: 'error',
          content: res?.message || 'Có lỗi xảy ra, vui lòng liên hệ CSKH 1900980 để được hỗ trợ'
        });
        this.store.dispatch(clearStateCreateVideosConfigError())
      }
      
    });
  }
}
buildForm(){
  this.form = this.fb.group({
    videoCode: [null, [
      ValidatorUtil.required('Mã video không được để trống'),
      ValidatorUtil.patternReject(SPECIAL_CHARACTERS_REJECT, 'Mã video không cho phép nhập ký tự đặc biệt'),
      ValidatorUtil.maxLength(50, 'Mã video không cho phép nhập quá 50 kí tự')]
     ],
    videoName: [null,[ValidatorUtil.maxLength(200,'Tên video không cho phép nhập quá 200 kí tự'), ValidatorUtil.required('Tên video không được để trống')]],
    videoLink: [null, ValidatorUtil.required('Link video không được để trống')],
    screenHome: [0, ValidatorUtil.required('Hiển thị trên trang chủ không được để trống')],
    status:true,
    description: ['',ValidatorUtil.maxLength(500,'Mô tả không cho phép nhập quá 500 kí tự')],
    globalListDetailId:[null, ValidatorUtil.required('Loại video không được để trống')],
    priority: [{value: '', disabled: true}],

  })
}

getData() {

  this.store.select(selectGlobelList).pipe(takeUntil(this.destroy$)).subscribe((item: any) => {

    for (const arrElement of item) {
      if (arrElement && arrElement.code == 'VIDEOS') {
        const list = arrElement.globalListDetails?.filter((arr: any) => arr.status == 1)
        this.lstPartner = list?.map((x: any) => {
          return { value: x.globalListDetailId, label: ` ${x.name}` };
        }) || [];
      }
      if (arrElement && arrElement.code == 'SCREEN_HOME') {
        const list = arrElement.globalListDetails?.filter((arr: any) => arr.status == 1)
        this.lstScreenHome = list?.map((x: any) => {
          return { value: x.value, label: ` ${x.name}` };
        }) || [];
      }
    }

  })
}

save(){
  FormUtil.validate(this.form);

  let formVal = {...this.form.getRawValue(), status: this.form.getRawValue().status ? 1 : 0}
  if(this.modalData.data){
    this.store.dispatch(updateVideosConfig({ payload:ObjUtil.deleteNullProp( formVal), id: this.modalData.data?.id}))
  }
  else{
    this.store.dispatch(createVideosConfig({payload: ObjUtil.deleteNullProp(formVal)}))
  }
}
cancel(){
  this.modalRef.destroy();
}


onSwitchChange(value: boolean){
  this.form.controls['status'].patchValue(!value)
}

}



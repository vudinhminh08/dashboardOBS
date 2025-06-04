import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, Observer, takeUntil } from 'rxjs';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Store } from '@ngrx/store';
import { NotificationService } from '@core/services/notification.service';
import { BaseDestroyComponent } from '@core/components';
import { selectCreateMainServicesError, selectCreateMainServicesSuccess, selectLoadingMainServices, selectUpdateMainServicesError, selectUpdateMainServicesSuccess } from '@modules/main-service-configuration/state/main-service-configuration.selectors';
import { clearStateCreateMainServices, clearStateCreateMainServicesError, clearStateUpdateMainServices, clearStateUpdateMainServicesError, createMainServices, updateMainServices } from '@modules/main-service-configuration/state/main-service-configuration.actions';
import { getBase64, getValueImageBase64, isValidHttpUrl } from '@core/utils';
import { ObjUtil } from '@core/utils/obj.util';
import { ValidatorUtil } from '@core/utils/validator.util';
import { CODE_FORMAT, REGEX_USERNAME_ALLOW_INPUT, SPECIAL_CHARACTERS_REJECT } from '@core/constants';
import { FormUtil } from '@core/utils/form.util';
import { IAlbum, Lightbox } from 'ngx-lightbox';
import { OptionModel } from '@core/models';
@Component({
  selector: 'app-main-service-configuration-modal',
  templateUrl: './main-service-configuration-modal.component.html',
  styleUrls: ['./main-service-configuration-modal.component.scss']
})
export class MainServiceConfigurationModalComponent extends BaseDestroyComponent implements OnInit {
  constructor(private store: Store,
     private fb: FormBuilder,
     private modalRef: NzModalRef, 
     private msg: NzMessageService, 
     protected notificationService: NotificationService,
     private cdr: ChangeDetectorRef,
    private lightbox: Lightbox,
    ) { super()}
form: FormGroup
loading$: Observable<boolean>;
data: any
readonly modalData = inject(NZ_MODAL_DATA);
loading = false;
avatarUrl?: string;
requiredOption: boolean
previewImage: string | undefined = '';
fileList: NzUploadFile[] = [];
isUpdate: boolean = false
optionAccount: OptionModel<number>[] = [
  { value: 1, label: 'Tất cả' },
  { value: 2, label: 'Danh sách khách hàng' },
];
REGEX_USERNAME = REGEX_USERNAME_ALLOW_INPUT;

ngOnInit() {
  this.buildForm()
  this.loading$ = this.store.select(selectLoadingMainServices);
  if(this.modalData.data){
    this.isUpdate = true
    this.form.patchValue({
      ...this.modalData.data, 
      imageB64: this.modalData.data.appIcon, 
      displayFor: this.modalData.data.displayFor,
      displayType: this.modalData.data.displayType})
    this.form.controls['serviceCode'].disable()
    this.changeOption(this.modalData.data.displayType )
  }else{
    this.isUpdate = false
    this.form.controls['displayFor'].disable()
}
this.store
.select(selectUpdateMainServicesSuccess)
.pipe( takeUntil(this.destroy$))
.subscribe((res) => {
  if (res){
    this.notificationService.open({
      type: 'success',
      content: 'Cập nhật thông tin dịch vụ thành công'
    });
    this.store.dispatch(clearStateUpdateMainServices())
    this.modalRef.destroy({ data: true});
  }
  
});

this.store
.select(selectUpdateMainServicesError)
.pipe( takeUntil(this.destroy$))
.subscribe((res) => {
  if (res){
    this.notificationService.open({
      type: 'error',
      content: res?.message || 'Có lỗi xảy ra, vui lòng liên hệ CSKH 1900980 để được hỗ trợ'
    });
    this.store.dispatch(clearStateUpdateMainServicesError())
  }
});
this.store
.select(selectCreateMainServicesSuccess)
.pipe( takeUntil(this.destroy$))
.subscribe((res) => {
  if (res){
    this.notificationService.open({
      type: 'success',
      content: 'Thêm mới dịch vụ thành công'
    });
    this.store.dispatch(clearStateCreateMainServices())
    this.modalRef.destroy({ data: true});
  }
 
});

this.store
.select(selectCreateMainServicesError)
.pipe( takeUntil(this.destroy$))
.subscribe((res) => {
  if (res){
    this.notificationService.open({
      type: 'error',
      content: res?.message || 'Có lỗi xảy ra, vui lòng liên hệ CSKH 1900980 để được hỗ trợ'
    });
    this.store.dispatch(clearStateCreateMainServicesError())
  }
});
}
buildForm(){
  this.form = this.fb.group({
    id: null,
    serviceCode: ['',[
      ValidatorUtil.required('Mã dịch vụ không được để trống'),
      ValidatorUtil.patternReject(SPECIAL_CHARACTERS_REJECT, 'Mã dịch vụ không cho phép nhập ký tự đặc biệt'),
      ValidatorUtil.maxLength(50, 'Mã dịch vụ không cho phép nhập quá 50 kí tự')]
     ],
    serviceName: ['',[ValidatorUtil.maxLength(200, 'Tên dịch vụ không cho phép nhập quá 200 kí tự'), ValidatorUtil.required('Tên dịch vụ không được để trống')]],
    status:[true],
    description: ['', ValidatorUtil.maxLength(500, 'Mô tả không cho phép nhập quá 500 kí tự')],
    home:null,
    appIcon: [''],
    imageB64: ['', [ValidatorUtil.required('Ảnh icon không được để trống')]],
    screenRedirect:['',[ValidatorUtil.maxLength(2000, 'Điều hướng không cho phép nhập quá 2000 kí tự'),ValidatorUtil.required('Điều hướng không được để trống')]],
    priority: [{value: '', disabled: true}],
    displayFor:['', ValidatorUtil.maxLength(3000, 'Danh sách khách hàng không cho phép nhập quá 3000 kí tự')],
    displayType:[1, [ValidatorUtil.required('Hiển thị không được để trống')]]
  })
}


save(){
  FormUtil.validate(this.form);
  let formVal = this.form.getRawValue()
  let payload   ={
    ...formVal, 
    imageB64: (formVal.imageB64 && !isValidHttpUrl(formVal.imageB64)) ? getValueImageBase64(formVal.imageB64) : '',
     status: this.form.getRawValue().status ? 1 : 0
     } 
  if(this.modalData.data){
    this.store.dispatch(updateMainServices({ payload:ObjUtil.deleteNullProp( payload)}))
  }
  else{
    this.store.dispatch(createMainServices({payload: ObjUtil.deleteNullProp( payload)}))
  }
}
cancel(){
  this.modalRef.destroy();
}

onSwitchChange(value: boolean){
  this.form.controls['status'].patchValue(!value)
}

changeOption(item: number){
  if(item === 1 ){
    this.form.controls['displayFor']?.clearValidators();
    this.form.controls['displayFor']?.addValidators(
      [
       ValidatorUtil.maxLength(3000, 'Danh sách khách hàng không cho phép nhập quá 3000 kí tự')]
    );
    this.form.controls['displayFor']?.updateValueAndValidity();
    this.requiredOption = false
    this.form.controls['displayFor'].disable()
    this.form.controls['displayFor'].reset()
  }else{
    this.form.controls['displayFor']?.addValidators(
      [ValidatorUtil.required('Danh sách khách hàng không được để trống'),
       ValidatorUtil.maxLength(3000, 'Danh sách khách hàng không cho phép nhập quá 3000 kí tự')]
    );
    this.form.controls['displayFor']?.updateValueAndValidity();
    this.requiredOption = true;
    this.form.controls['displayFor'].enable()
  }
}

}


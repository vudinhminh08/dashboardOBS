import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidatorUtil } from '@core/utils/validator.util';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, takeUntil } from 'rxjs';
import { clearStateCreateGroupService, clearStateCreateGroupServiceError, clearStateUpdateGroupService, clearStateUpdateGroupServiceError, createServiceGroupConfig, searchServiceGroupConfig, updateServiceGroupConfig } from '../../state/config-field.actions';
import { selectConfigFieldLoading, selectCreateServiceGroupConfigError, selectCreateServiceGroupConfigSuccess, selectServiceGroupConfigList, selectUpdateServiceGroupConfigError, selectUpdateServiceGroupConfigSuccess } from '../../state/config-field.selectors';
import { BaseDestroyComponent } from '@core/components';
import { NotificationService } from '@core/services/notification.service';
import { CODE_FORMAT, REGEX_USERNAME_ALLOW_INPUT, SPECIAL_CHARACTERS_REJECT } from '@core/constants';
import { FormUtil } from '@core/utils/form.util';

@Component({
  selector: 'app-config-field-group-modal',
  templateUrl: './config-field-group-modal.component.html',
  styleUrls: ['./config-field-group-modal.component.scss']
})
export class ConfigFieldGroupModalComponent extends BaseDestroyComponent implements OnInit {
  constructor(private fb: FormBuilder,private modalRef: NzModalRef, private store: Store, protected notificationService: NotificationService ) {super() }
form: FormGroup
loading$: Observable<boolean>;
data: any
isUpdate: boolean = false

readonly modalData = inject(NZ_MODAL_DATA);
REGEX_USERNAME = REGEX_USERNAME_ALLOW_INPUT;

ngOnInit() {
  this.buildForm()
  this.loading$ = this.store.select(selectConfigFieldLoading);
  if(this.modalData.data){
    this.isUpdate = true
    this.form.patchValue(this.modalData.data)
    this.form.controls['code'].disable()
    this.store
    .select(selectUpdateServiceGroupConfigSuccess)
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res){this.notificationService.open({
        type: 'success',
        content: 'Cập nhật thông tin nhóm dịch vụ thành công'
      });
      this.modalRef.destroy({ data: true, id: this.modalData.data.businessDomainId});}
      this.store.dispatch(clearStateUpdateGroupService())
    });

  this.store
    .select(selectUpdateServiceGroupConfigError)
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res)
        this.notificationService.open({
          type: 'error',
          content: res?.message || 'Có lỗi xảy ra, vui lòng liên hệ CSKH 1900980 để được hỗ trợ'
        });
      this.store.dispatch(clearStateUpdateGroupServiceError())
    });
  }else{
    this.form.patchValue({ businessDomainId: this.modalData.businessDomainId})

    this.store
      .select(selectCreateServiceGroupConfigSuccess)
      .pipe( takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res){this.notificationService.open({
          type: 'success',
          content: 'Thêm mới nhóm dịch vụ thành công'
        });
        this.modalRef.destroy({ data: true});}
        this.store.dispatch(clearStateCreateGroupService())
          
      });

    this.store
      .select(selectCreateServiceGroupConfigError)
      .pipe( takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res){
          this.notificationService.open({
            type: 'error',
            content: res?.message || 'Có lỗi xảy ra, vui lòng liên hệ CSKH 1900980 để được hỗ trợ'
          });
          this.store.dispatch(clearStateCreateGroupServiceError())
        }
         
      });
  }

  
}
buildForm(){
  this.form = this.fb.group({

    code: ['', [ValidatorUtil.required('Mã nhóm dịch vụ không được để trống'),
    ValidatorUtil.patternReject(SPECIAL_CHARACTERS_REJECT, 'Mã nhóm dịch vụ không cho phép nhập ký tự đặc biệt'),
      ValidatorUtil.maxLength(50, 'Mã nhóm dịch vụ không cho phép nhập quá 50 kí tự')]
   ],
    name: [null,[ValidatorUtil.maxLength(200, 'Tên nhóm dịch vụ không cho phép nhập quá 200 kí tự'), ValidatorUtil.required('Tên nhóm dịch vụ không được để trống')]],
    status:[],
    description: ['', ValidatorUtil.maxLength(500, 'Mô tả không cho phép nhập quá 500 kí tự')],
    priority: [],
    home:null,
    businessDomainId: [''],
    orderServiceGroup: [{value: null, disabled: true}]
  })
}
save(){
  FormUtil.validate(this.form);
  let formVal = {...this.form.getRawValue(), status: this.form.getRawValue().status ? 1 : 0}
  if(this.modalData.data){
    this.store.dispatch(updateServiceGroupConfig({id: this.modalData.data.id, payload: formVal}))
  }
  else{
    this.store.dispatch(createServiceGroupConfig({payload: formVal}))
  }
}
cancel(){
  this.modalRef.destroy();
}

onSwitchChange(value: boolean){
  this.form.controls['status'].patchValue(!value)
}

}
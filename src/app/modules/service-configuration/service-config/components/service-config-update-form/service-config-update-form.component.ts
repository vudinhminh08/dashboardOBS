import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDestroyComponent } from '@core/components';
import { NotificationService } from '@core/services/notification.service';
import { ValidatorUtil } from '@core/utils/validator.util';
import { Store } from '@ngrx/store';
import { Observable, skip, takeUntil } from 'rxjs';
import { clearStateUpdateService, clearStateUpdateServiceError, findOneServiceGroupConfig, getGlobalListService, searchServiceConfig, updateServiceConfig } from '../../state/service-config.actions';
import { selectCurrentServiceConfig, selectGlobelList, selectLoadingServiceConfig, selectServiceConfigList, selectUpdateServiceConfigError, selectUpdateServiceConfigSuccess } from '../../state/service-config.selectors';
import { searchConfigField, searchServiceGroupConfig } from '@modules/service-configuration/config-field/state/config-field.actions';
import { ObjUtil } from '@core/utils/obj.util';
import { selectConfigfieldList, selectServiceGroupConfigList } from '@modules/service-configuration/config-field/state/config-field.selectors';
import { FormUtil } from '@core/utils/form.util';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { getBase64, getValueImageBase64, isValidHttpUrl } from '@core/utils';
import { IAlbum, Lightbox } from 'ngx-lightbox';
import { OptionModel } from '@core/models';

@Component({
  selector: 'app-service-config-update-form',
  templateUrl: './service-config-update-form.component.html',
  styleUrls: ['./service-config-update-form.component.scss']
})
export class ServiceConfigUpdateFormComponent extends BaseDestroyComponent implements OnInit {
  constructor(private fb: FormBuilder, 
    private store: Store, 
    private route: Router, 
    protected notificationService: NotificationService,
    private activeRoute: ActivatedRoute,
    private lightbox: Lightbox,

    ) { super() }

form: FormGroup
loading$: Observable<boolean>;
data: any
lstService: any
id: any
required: boolean
requiredPopupContent: boolean
requiredOption: boolean
lstPartner: { value: any; label: any; status: any, disable: boolean }[];
lstPartnerFillter: { value: any; label: any; status: any }[];
lstAppType: { value: any; label: any; status: any, disable: boolean }[];
lstMsisdn: { value: any; label: any; status: any, disable: boolean }[];
lstOpenBrowser: { value: any; label: any; status: any, disable: boolean }[];
lstOpenPopup: { value: any; label: any; status: any, disable: boolean }[];
lstScreenHome: { value: any; label: any; status: any, disable: boolean }[];
lstGlobalList: any[]
optionBusinessDomain: { value: any; label: any; status: any, disable: boolean }[];
optionServiceGroup: { value: any; label: any; status: any, disable: boolean }[];
optionLableServiceGroup: { value: any; label: any; status: any, disable: boolean }[];
optionGlobalList: { value: any; label: any; status: any, disable: boolean }[];
previewImage: string | undefined = '';
fileList: NzUploadFile[] = [];
name: any
optionAccount: OptionModel<number>[] = [
  { value: 1, label: 'Tất cả', disabled: false },
  { value: 2, label: 'Danh sách khách hàng', disabled: false },
];
ngOnInit() {
  this.loading$ = this.store.select(selectLoadingServiceConfig);
  this.activeRoute.params.subscribe((params) => {
    this.id = params.id;
  })
  this.buildForm()
  this.getData()
  this.selectData()
  this.store
  .select(selectUpdateServiceConfigSuccess)
  .pipe(takeUntil(this.destroy$))
  .subscribe((res) => {
  if (res) {
    this.notificationService.open({
      type: 'success',
      content: 'Cập nhật thông tin dịch vụ thành công'
    });
    this.store.dispatch(clearStateUpdateService())
    this.cancel()
  }
});

this.store
.select(selectUpdateServiceConfigError)
.pipe(takeUntil(this.destroy$))
.subscribe((res) => {
  if (res) {
    this.notificationService.open({
      type: 'error',
      content: res?.message || 'Có lỗi xảy ra, vui lòng liên hệ CSKH 1900980 để được hỗ trợ'
    });
    this.store.dispatch(clearStateUpdateServiceError())
    this.cancel()
  }

  

});
  
}
buildForm(){
  this.form = this.fb.group({
    id: null,
    businessDomainId: ['', ValidatorUtil.required('Lĩnh vực không được để trống')],
    serviceGroupId: null,
    screenRedirect: ['',[ValidatorUtil.maxLength(2000, 'Điều hướng không cho phép nhập quá 2000 kí tự'),
    ValidatorUtil.required('Điều hướng không được để trống')]], //, Validators.pattern('https?://.+')
    appType: ['', ValidatorUtil.required('Loại app không được để trống')],
    priority: [{value: '', disabled: true}],
    priorityMain: [{value: '', disabled: true}],
    isInsertMsisdn: ['', ValidatorUtil.required('Chèn Msisdn không được để trống')],
    isOpenBrowserApp: ['', ValidatorUtil.required('Mở ứng dụng trình duyệt không được để trống')],
    isOpenConfirm: ['', ValidatorUtil.required('Mở popup xác nhận không được để trống ')],
    contentCondition: ['', ValidatorUtil.required('Nội dung điều khoản không được để trống')],
    contentConfirm: ['', ValidatorUtil.maxLength(500, 'Nội dũng xác nhận không cho phép nhập quá 500 kí tự')],
    screenHome: ['', ValidatorUtil.required('Hiển thị trên trang chủ không được để trống')],
    description: ['', ValidatorUtil.maxLength(500, 'Mô tả không cho phép nhập quá 500 kí tự')],
    notiService: ['', ValidatorUtil.maxLength(10, 'Thông báo không cho phép nhập quá 10 kí tự')],
    status: true,
    serviceCode: [{value: null, disabled: true}],
    serviceName: ['', [ValidatorUtil.maxLength(200, 'Tên dịch vụ không cho phép nhập quá 200 kí tự'),ValidatorUtil.required('Tên dịch vụ không được để trống')]],
    globalListDetailId: ['', ValidatorUtil.required('Đối tác không được để trống')],
    createBy: null,
    updateBy: null,
    appIcon: [''],
    imageB64: ['', [ValidatorUtil.required('Ảnh icon không được để trống')]],
    displayFor:['', ValidatorUtil.maxLength(3000, 'Danh sách khách hàng không cho phép nhập quá 3000 kí tự')],
    displayType:[1, [ValidatorUtil.required('Hiển thị không được để trống')]]
    

  })
}

changeOption(item: any){
  if(item === 1 ){
    this.form.controls['displayFor']?.clearValidators();
    this.form.controls['displayFor']?.addValidators(
       ValidatorUtil.maxLength(3000, 'Danh sách khách hàng không cho phép nhập quá 3000 kí tự')
    );
    this.form.controls['displayFor']?.updateValueAndValidity();
    this.requiredOption = false
    this.form.controls['displayFor'].disable()
    this.form.controls['displayFor'].reset()
  }else{
    this.form.controls['displayFor']?.addValidators(
      [ValidatorUtil.required('Danh sách khách hàng không được để trống'),  ValidatorUtil.maxLength(3000, 'Danh sách khách hàng không cho phép nhập quá 3000 kí tự')]
    );
    this.form.controls['displayFor']?.updateValueAndValidity();
    this.requiredOption = true;
    this.form.controls['displayFor'].enable()
  }
}

changeBD(item: any) {
  if (item) {
    this.form.controls['serviceGroupId'].reset()
    this.store.dispatch(searchServiceGroupConfig({ payload: ObjUtil.deleteNullProp({ businessDomainId: item }) }))
    this.store.select(selectServiceGroupConfigList).pipe(skip(1),takeUntil(this.destroy$)).subscribe((data: any) => {
      if (data) {
        if(data?.content. length > 0){
          this.form.controls['serviceGroupId']?.addValidators(
            ValidatorUtil.required('Nhóm dịch vụ không được để trống')
          );
          this.form.controls['serviceGroupId']?.updateValueAndValidity();
          this.required = true;
        }else{
          this.form.controls['serviceGroupId']?.clearValidators();
          this.form.controls['serviceGroupId']?.updateValueAndValidity();
          this.required = false
        }
         
        this.optionServiceGroup = data?.content?.map((x: any) => {
            return { value: x.id, label: `${x.name}` , status: x.status, disabled: !Boolean(x.status) };
          }) || [];
      }


    })
  }
  else {
    this.form.controls['serviceGroupId'].reset()
    this.optionServiceGroup = []
  }
}

getData(){
    this.store.dispatch(getGlobalListService({ payload: { status: 1 } }))
    this.store.dispatch(searchConfigField({ param: {getALL: -1 } }));
    this.store.dispatch(findOneServiceGroupConfig({ payload: { id: this.id }  }));
    
}

selectData(){
  this.store.select(selectGlobelList).pipe(takeUntil(this.destroy$)).subscribe((item: any) => {
    this.optionGlobalList =
      item?.map((x: any) => {
        return { value: x.globalListId, label: `${x.name}` , disabled: !Boolean(x.status) };
      }) || [];

    for (const arrElement of item) {
      if (arrElement && arrElement.code == 'PARTNER_CODE') {
        const list = arrElement.globalListDetails
        this.lstPartner = list?.map((x: any) => {
          return { value: x.globalListDetailId, label: `${x.name}`, disabled: !Boolean(x.status) };
        }) || [];
      }
      if (arrElement && arrElement.code == 'APP_TYPE') {
        const list = arrElement.globalListDetails
        this.lstAppType = list?.map((x: any) => {
          return { value: x.value, label: `${x.name}` , disabled: !Boolean(x.status) };
        }) || [];
      } if (arrElement && arrElement.code == 'IS_INSERT_MSISDN') {
        const list = arrElement.globalListDetails
        this.lstMsisdn = list?.map((x: any) => {
          return { value: x.value, label: `${x.name}` , disabled: !Boolean(x.status) };
        }) || [];
      } if (arrElement && arrElement.code == 'IS_OPEN_BROWSER_APP') {
        const list = arrElement.globalListDetails
        this.lstOpenBrowser = list?.map((x: any) => {
          return { value: x.value, label: `${x.name}` , disabled: !Boolean(x.status) };
        }) || [];
      } if (arrElement && arrElement.code == 'IS_OPEN_CONFIRM') {
        const list = arrElement.globalListDetails
        this.lstOpenPopup = list?.map((x: any) => {
          return { value: x.value, label: `${x.name}` , disabled: !Boolean(x.status) };
        }) || [];
      } if (arrElement && arrElement.code == 'SCREEN_HOME') {
        const list = arrElement.globalListDetails
        this.lstScreenHome = list?.map((x: any) => {
          return { value: x.value, label: `${x.name}` , disabled: !Boolean(x.status) };
        }) || [];
      }
    }

  })
  this.store
  .select(selectConfigfieldList)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data: any) => {
    {
      this.optionBusinessDomain =
        data?.content?.map((x: any) => {
          return { value: x.id, label: `${x.name}`, disabled: !Boolean(x.status) };
        }) || [];
    }

  });
  this.store
  .select(selectCurrentServiceConfig)
  .pipe(skip(1),takeUntil(this.destroy$))
  .subscribe((data: any) => {
    if (data){
    this.form.patchValue({...data,
    status: data.status ? true : false, 
    imageB64: data?.appIcon})
    this.name = this.form.getRawValue().serviceName
    }
      
     });
  this.store.select(selectServiceGroupConfigList).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
    if (data) {
      this.optionServiceGroup =
        data?.content?.map((x: any) => {
          return { value: x.id, label: `${x.name}` , status: x.status, disabled: !Boolean(x.status) };
        }) || [];

        if (data) {
          if(data?.content?.length > 0){
            this.form.controls['serviceGroupId']?.addValidators(
              ValidatorUtil.required('Nhóm dịch vụ không được để trống')
            );
            this.form.controls['serviceGroupId']?.updateValueAndValidity();
            this.required = true;
          }else{
            this.form.controls['serviceGroupId']?.clearValidators();
            this.form.controls['serviceGroupId']?.updateValueAndValidity();
            this.required = false
          }
           
          this.optionServiceGroup = data?.content?.map((x: any) => {
              return { value: x.id, label: `${x.name}` , status: x.status, disabled: !Boolean(x.status) };
            }) || [];
        }
    }

  })
}


changePopup(item: any){
  if(item == 1){
    this.form.controls['contentConfirm']?.addValidators(
      [ValidatorUtil.required('Nội dung xác nhận không được để trống'),
       ValidatorUtil.maxLength(500, 'Nội dũng xác nhận không cho phép nhập quá 500 kí tự')]
    );
    this.form.controls['contentConfirm']?.updateValueAndValidity();
    this.requiredPopupContent = true;
  }
  else{
    this.form.controls['contentConfirm']?.clearValidators();
    this.form.controls['contentConfirm']?.addValidators(
       [ValidatorUtil.maxLength(500, 'Nội dũng xác nhận không cho phép nhập quá 500 kí tự')]
    );
    this.form.controls['contentConfirm']?.updateValueAndValidity();
    this.requiredPopupContent = false
  }
    } 
save(){
  FormUtil.validate(this.form);
  let formVal =this.form.getRawValue()
  let payload   ={
    ...formVal, 
    imageB64: (formVal.imageB64 && !isValidHttpUrl(formVal.imageB64)) ? getValueImageBase64(formVal.imageB64) : '',
     status: this.form.getRawValue().status ? 1 : 0
     } 
  this.store.dispatch(updateServiceConfig({ payload: ObjUtil.deleteNullProp(payload) }))
}
cancel(){
  this.route.navigateByUrl('service-configuration/service-config')

}
onSwitchChange(value: boolean){
  this.form.controls['status'].patchValue(!value)
}

}
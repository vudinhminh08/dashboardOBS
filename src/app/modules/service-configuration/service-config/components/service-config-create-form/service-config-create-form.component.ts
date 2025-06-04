import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, skip, takeUntil } from 'rxjs';
import { clearStateCreateServiceFeild, clearStateCreateServiceGroup, createServiceConfig, getGlobalListService } from '../../state/service-config.actions';
import { selectCreateServiceConfigError, selectCreateServiceConfigSuccess, selectGlobelList, selectLoadingServiceConfig } from '../../state/service-config.selectors';
import { takeWhile } from 'lodash';
import { BaseDestroyComponent } from '@core/components';
import { ValidatorUtil } from '@core/utils/validator.util';
import { Router } from '@angular/router';
import { searchConfigField, searchServiceGroupConfig } from '@modules/service-configuration/config-field/state/config-field.actions';
import { selectConfigfieldList, selectServiceGroupConfigList } from '@modules/service-configuration/config-field/state/config-field.selectors';
import { ObjUtil } from '@core/utils/obj.util';
import { FormUtil } from '@core/utils/form.util';
import { NotificationService } from '@core/services/notification.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { getBase64, getValueImageBase64 } from '@core/utils';
import { REGEX_USERNAME_ALLOW_INPUT, SPECIAL_CHARACTERS_REJECT } from '@core/constants';
import { IAlbum, Lightbox } from 'ngx-lightbox';
import { OptionModel } from '@core/models';

@Component({
  selector: 'app-service-config-create-form',
  templateUrl: './service-config-create-form.component.html',
  styleUrls: ['./service-config-create-form.component.scss']
})
export class ServiceConfigCreateFormComponent extends BaseDestroyComponent implements OnInit {
  constructor(private fb: FormBuilder, 
    private store: Store, 
    private route: Router,
     protected notificationService: NotificationService,
     private lightbox: Lightbox) { super() }
  form: FormGroup
  loading$: Observable<boolean>;
  data: any
  lstPartner: { value: any; label: any }[];
  lstAppType: { value: any; label: any }[];
  lstMsisdn: { value: any; label: any }[];
  lstOpenBrowser: { value: any; label: any }[];
  lstOpenPopup: { value: any; label: any }[];
  lstScreenHome: { value: any; label: any }[];
  required: boolean
  requiredPopupContent: boolean
  requiredOption: boolean
  lstGlobalList: any[]
  optionBusinessDomain: { value: any; label: any }[];
  optionServiceGroup: { value: any; label: any }[];
  optionLableServiceGroup: { value: any; label: any }[];
  optionGlobalList: { value: any; label: any }[];
  previewImage: string | undefined = '';
  fileList: NzUploadFile[] = [];
  optionAccount: OptionModel<number>[] = [
    { value: 1, label: 'Tất cả', disabled: false },
    { value: 2, label: 'Danh sách khách hàng', disabled: false },
  ];
  REGEX_USERNAME = REGEX_USERNAME_ALLOW_INPUT;

  ngOnInit() {
  this.loading$ = this.store.select(selectLoadingServiceConfig);
    this.buildForm()
    this.getData()
    this.selectData()
    // if (this.data) {
    //   this.form.patchValue(this.data)
    // }
    // this.form.controls['displayType'].patchValue(1)
    this.form.controls['displayFor'].disable()


    this.store
      .select(selectCreateServiceConfigSuccess)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.notificationService.open({
            type: 'success',
            content: 'Thêm mới dịch vụ thành công'
          });
          this.store.dispatch(clearStateCreateServiceGroup())
          this.cancel()
        }
      });

      this.store
      .select(selectCreateServiceConfigError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.notificationService.open({
            type: 'error',
            content: res?.message || 'Có lỗi xảy ra, vui lòng liên hệ CSKH 1900980 để được hỗ trợ'
          });
          this.store.dispatch(clearStateCreateServiceFeild())
        }
      });
  }
  buildForm() {
    this.form = this.fb.group({
      id: '',
      businessDomainId: ['', ValidatorUtil.required('Lĩnh vực không được để trống')],
      serviceGroupId: '',
      appIcon: [''],
      screenRedirect: ['',[ValidatorUtil.maxLength(2000, 'Điều hướng không cho phép nhập quá 2000 kí tự'),
       ValidatorUtil.required('Điều hướng không được để trống')]],
      appType: [2, ValidatorUtil.required('Loại app không được để trống')],
      priority: [{value: '', disabled: true}],
      priorityMain: [{value: '', disabled: true}],
      isInsertMsisdn: [0, ValidatorUtil.required('Chèn Msisdn không được để trống')],
      isOpenBrowserApp: ['', ValidatorUtil.required('Mở ứng dụng trình duyệt không được để trống')],
      isOpenConfirm: ['', ValidatorUtil.required('Mở popup xác nhận không được để trống ')],
      contentCondition: ['', ValidatorUtil.required('Nội dung điều khoản không được để trống')],
      contentConfirm: ['', ValidatorUtil.maxLength(500, 'Nội dung xác nhận không cho phép nhập quá 500 kí tự')],
      screenHome: ['', ValidatorUtil.required('Hiển thị trên trang chủ không được để trống')],
      description: ['', ValidatorUtil.maxLength(500, 'Mô tả không cho phép nhập quá 500 kí tự')],
      notiService: ['', ValidatorUtil.maxLength(10, 'Thông báo không cho phép nhập quá 10 kí tự')],
      status: true,
      serviceCode: ['',[
      ValidatorUtil.maxLength(50, 'Mã dịch vụ không cho phép nhập quá 50 kí tự'),
      ValidatorUtil.patternReject(SPECIAL_CHARACTERS_REJECT, 'Mã dịch vụ không cho phép nhập ký tự đặc biệt'),
      ValidatorUtil.required('Mã dịch vụ không được để trống')] ],
      serviceName: ['', [ValidatorUtil.maxLength(200, 'Tên dịch vụ không cho phép nhập quá 200 kí tự'),ValidatorUtil.required('Tên dịch vụ không được để trống')]],
      globalListDetailId: ['', ValidatorUtil.required('Đối tác không được để trống')],
      createBy: '',
      updateBy: '',
      imageB64: ['', [ValidatorUtil.required('Ảnh icon không được để trống')]],
      displayFor:['', ValidatorUtil.maxLength(3000, 'Danh sách khách hàng không cho phép nhập quá 3000 kí tự')],
      displayType:[1, [ValidatorUtil.required('Hiển thị không được để trống')]]
    })
  }

  changeOption(item: any){
    if(item === 1 ){
      this.form.controls['displayFor']?.clearValidators();
      this.form.controls['displayFor']?.updateValueAndValidity();
      this.requiredOption = false
      this.form.controls['displayFor'].disable()
      this.form.controls['displayFor'].reset()

    }else{
      this.form.controls['displayFor']?.addValidators(
        ValidatorUtil.required('Danh sách khách hàng không được để trống')
      );
      this.form.controls['displayFor']?.updateValueAndValidity();
      this.requiredOption = true;
      this.form.controls['displayFor'].enable()
    }
  } 
  changeBD(item: any) {
    if (item) {
      this.form.controls['serviceGroupId'].reset()
      this.store.dispatch(searchServiceGroupConfig({ payload: ObjUtil.deleteNullProp({ businessDomainId: item, status: 1 }) }))
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
              return { value: x.id, label: `${x.name}` };
            }) || [];
        }
 

      })
    }
    else {
      this.form.controls['serviceGroupId'].reset()
      this.optionServiceGroup = []
    }
  }

  changePopup(item: any){
    if(item == 1){
      this.form.controls['contentConfirm']?.addValidators(
        ValidatorUtil.required('Nội dung xác nhận không được để trống')
      );
      this.form.controls['contentConfirm']?.updateValueAndValidity();
      this.requiredPopupContent = true;
    }
    else{
      this.form.controls['contentConfirm']?.clearValidators();
      this.form.controls['contentConfirm']?.updateValueAndValidity();
      this.requiredPopupContent = false
    }
      } 
  getData() {
    this.store.dispatch(getGlobalListService({ payload: { status: 1 } }))
    this.store.dispatch(searchConfigField({ param: {status: 1 } }));
  }

  selectData(){
    this.store.select(selectGlobelList).pipe(takeUntil(this.destroy$)).subscribe((item: any) => {
      this.optionGlobalList =
        item?.map((x: any) => {
          return { value: x.globalListId, label: ` ${x.name}` };
        }) || [];

      for (const arrElement of item) {
        if (arrElement && arrElement.code == 'PARTNER_CODE') {
          const list = arrElement.globalListDetails?.filter((arr: any) => arr.status == 1)
          this.lstPartner = list?.map((x: any) => {
            return { value: x.globalListDetailId, label: ` ${x.name}` };
          }) || [];
        }
        if (arrElement && arrElement.code == 'APP_TYPE') {
          const list = arrElement.globalListDetails?.filter((arr: any) => arr.status == 1)
          this.lstAppType = list?.map((x: any) => {
            return { value: x.value, label: ` ${x.name}` };
          }) || [];
        } if (arrElement && arrElement.code == 'IS_INSERT_MSISDN') {
          const list = arrElement.globalListDetails?.filter((arr: any) => arr.status == 1)
          this.lstMsisdn = list?.map((x: any) => {
            return { value: x.value, label: ` ${x.name}` };
          }) || [];
        } if (arrElement && arrElement.code == 'IS_OPEN_BROWSER_APP') {
          const list = arrElement.globalListDetails?.filter((arr: any) => arr.status == 1)
          this.lstOpenBrowser = list?.map((x: any) => {
            return { value: x.value, label: ` ${x.name}` };
          }) || [];
        } if (arrElement && arrElement.code == 'IS_OPEN_CONFIRM') {
          const list = arrElement.globalListDetails?.filter((arr: any) => arr.status == 1)
          this.lstOpenPopup = list?.map((x: any) => {
            return { value: x.value, label: ` ${x.name}` };
          }) || [];
        } if (arrElement && arrElement.code == 'SCREEN_HOME') {
          const list = arrElement.globalListDetails?.filter((arr: any) => arr.status == 1)
          this.lstScreenHome = list?.map((x: any) => {
            return { value: x.value, label: ` ${x.name}` };
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
            return { value: x.id, label: `${x.name}` };
          }) || [];
      }

    });
  }

  save() {
    let formVal =this.form.getRawValue()
    console.log('formVal', formVal);
    FormUtil.validate(this.form);
    let payload   ={
      ...formVal,
       imageB64: getValueImageBase64(formVal.imageB64), 
       status: this.form.getRawValue().status ? 1 : 0 
      } 
    this.store.dispatch(createServiceConfig({ payload: ObjUtil.deleteNullProp(payload) }))

  }
  cancel() {
    this.route.navigateByUrl('service-configuration/service-config')

  }


  onSwitchChange(value: boolean) {
    this.form.controls['status'].patchValue(!value)
  }

}

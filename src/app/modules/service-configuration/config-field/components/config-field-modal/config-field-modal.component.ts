import { ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OptionModel } from '@core/models';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, takeUntil } from 'rxjs';
import { clearStateCreateConfigField, clearStateCreateConfigFieldError, clearStateUpdateConfigField, clearStateUpdateConfigFieldError, createConfigField, searchConfigField, updateConfigField } from '../../state/config-field.actions';
import { ValidatorUtil } from '@core/utils/validator.util';
import { selectConfigFieldLoading, selectConfigfieldList, selectCreateConfigfieldError, selectCreateConfigfieldSuccess, selectUpdateConfigfieldError, selectUpdateConfigfieldSuccess } from '../../state/config-field.selectors';
import { BaseDestroyComponent } from '@core/components';
import { NotificationService } from '@core/services/notification.service';
import { CODE_FORMAT, REGEX_USERNAME_ALLOW_INPUT, SPECIAL_CHARACTERS_REJECT } from '@core/constants';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { IAlbum, Lightbox } from 'ngx-lightbox';
import { getBase64, getValueImageBase64, isValidHttpUrl } from '@core/utils';
import { ObjUtil } from '@core/utils/obj.util';
import { FormUtil } from '@core/utils/form.util';

@Component({
  selector: 'app-config-field-modal',
  templateUrl: './config-field-modal.component.html',
  styleUrls: ['./config-field-modal.component.scss']
})
export class ConfigFieldModalComponent extends BaseDestroyComponent implements OnInit {
    
    constructor(private fb: FormBuilder,
      private modalRef: NzModalRef,
       private store: Store,
       protected notificationService: NotificationService,
       private cdr: ChangeDetectorRef,
       private lightbox: Lightbox, ) {super() }
  form: FormGroup
  loading$: Observable<boolean>;
  optionHome: OptionModel<any>[] = [
    { label: 'Trên', value: 1 },
    { label: 'Dưới', value: 0 },
  ];
  isUpdate: boolean = false
  numberOfElements: number
  previewImage: string | undefined = '';
fileList: NzUploadFile[] = [];
  readonly modalData = inject(NZ_MODAL_DATA);
  REGEX_USERNAME = REGEX_USERNAME_ALLOW_INPUT;

  ngOnInit() {
    this.buildForm()
    this.loading$ = this.store.select(selectConfigFieldLoading);
    if(this.modalData.data){
      this.isUpdate = true
      this.form.patchValue({...this.modalData.data, imageB64: this.modalData.data.appIcon })
      this.form.controls['code'].disable()
      this.store
      .select(selectUpdateConfigfieldSuccess)
      .pipe( takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res){  this.notificationService.open({
          type: 'success',
          content: 'Cập nhật thông tin lĩnh vực thành công'
        });
        this.modalRef.destroy({ data: true});
        this.store.dispatch(clearStateUpdateConfigField())
      }
      });

    this.store
      .select(selectUpdateConfigfieldError)
      .pipe( takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res)
          this.notificationService.open({
            type: 'error', 
            content: res?.message || 'Có lỗi xảy ra, vui lòng liên hệ CSKH 1900980 để được hỗ trợ'
          });
          this.store.dispatch(clearStateUpdateConfigFieldError())
      });
    }else{
      this.store
      .select(selectCreateConfigfieldSuccess)
      .pipe( takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res){  this.notificationService.open({
          type: 'success',
          content: 'Thêm mới lĩnh vực thành công'
        });
        this.modalRef.destroy({ data: true});}
        this.store.dispatch(clearStateCreateConfigField())
        
      });

    this.store
      .select(selectCreateConfigfieldError)
      .pipe( takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res){
          this.notificationService.open({
            type: 'error',
            content: res?.message || 'Có lỗi xảy ra, vui lòng liên hệ CSKH 1900980 để được hỗ trợ'
          });
        }
        this.store.dispatch(clearStateCreateConfigFieldError())
      });
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges(); // Manually trigger change detection
  }
  
  buildForm(){
    this.form = this.fb.group({
      id: null,
      code: [null, [ValidatorUtil.required('Mã lĩnh vực không được để trống'),
      ValidatorUtil.patternReject(SPECIAL_CHARACTERS_REJECT, 'Mã lĩnh vực không cho phép nhập ký tự đặc biệt'),
        ValidatorUtil.maxLength(50,'Mã lĩnh vực không cho phép nhập quá 50 kí tự')]
       ],
      name: [null, [ValidatorUtil.maxLength(200,'Tên lĩnh vực không cho phép nhập quá 200 kí tự'),ValidatorUtil.required('Tên lĩnh vực không được để trống')]],
      status: [''],
      description: ['', ValidatorUtil.maxLength(500, 'Mô tả không cho phép nhập quá 500 kí tự')],
      priority: [{value: null, disabled: true}],
      type:[1, ValidatorUtil.required('Vị trí home không được để trống')],
      appIcon: [''],
      imageB64: ['', [ValidatorUtil.required('Ảnh icon không được để trống')]]
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
      this.store.dispatch(updateConfigField({ payload: ObjUtil.deleteNullProp( payload)}))
    }
    else{
      this.store.dispatch(createConfigField({payload: ObjUtil.deleteNullProp( payload)}))
    }
  }
  cancel(){
    this.modalRef.destroy();
  }

  onSwitchChange(value: boolean){
    this.form.controls['status'].patchValue(!value)
  }
  
}

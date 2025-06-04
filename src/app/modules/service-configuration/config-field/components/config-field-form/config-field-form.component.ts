import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseCrudListComponent, BaseDestroyComponent } from '@core/components';
import { ColumnConfig, OptionModel } from '@core/models';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ConfigFieldModalComponent } from '../config-field-modal/config-field-modal.component';
import { ConfigFieldGroupModalComponent } from '../config-field-group-modal/config-field-group-modal.component';
import { Store } from '@ngrx/store';
import { clearStateUpdateConfigField, clearStateUpdateConfigFieldError, clearStateUpdateConfigFieldPriorityError, clearStateUpdateConfigFieldPrioritySuccess, clearStateUpdateGroupService, clearStateUpdateGroupServiceError, clearStateUpdateGroupServicePriorityError, clearStateUpdateGroupServicePrioritySuccess, searchConfigField, searchServiceGroupConfig, updateConfigField, updateConfigFieldPriority, updateServiceGroupConfig, updateServiceGroupPriority } from '../../state/config-field.actions';
import { selectConfigfieldList, selectServiceGroupConfigList, selectUpdateConfigFieldPriorityError, selectUpdateConfigfieldError, selectUpdateConfigfieldPrioritySuccess, selectUpdateConfigfieldSuccess, selectUpdateServiceGroupConfigError, selectUpdateServiceGroupConfigSuccess, selectUpdateServiceGroupPriorityError, selectUpdateServiceGroupPrioritySuccess } from '../../state/config-field.selectors';
import { skip, takeUntil } from 'rxjs';
import { ObjUtil } from '@core/utils/obj.util';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-config-field-form',
  templateUrl: './config-field-form.component.html',
  styleUrls: ['./config-field-form.component.scss']
})
export class ConfigFieldFormComponent extends BaseDestroyComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    protected modal: NzModalService,
    private store: Store,
    protected notificationService: NotificationService)
    {super();}
  @ViewChild(ConfirmationComponent) confirmation: ConfirmationComponent;

  selectedKeys: string[] = [];
  isDisable: boolean = false ;
  checkSearch: boolean = false
  isDisableServiceGroup: boolean = false ;
  typeConfirm: 'switchStatusField' | 'switchStatusGroup' = 'switchStatusField';
  params: { page?: number; size?: number; keyword?: string } = {
    page: 1,
    size: 20,
    keyword: ''
  };
  crrPagination: {
    page: number;
    size: number;
    keyword: string;
    totalPage: number;
  };
  
  businessDomainId: any
  lstConfigField: any[]
  lstServiceGroup: any
  numberOfElementsConfigField: number
  dataSelect: any
  isCheckUpdate: boolean
  optionHome: OptionModel<any>[] = [
    { label: 'Trên', value: 1 },
    { label: 'Dưới', value: 0 },
  ];
  columns: ColumnConfig[] = [
    {
      key: 'code',
      header: 'Mã lĩnh vực',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '90px',
    },
    {
      key: 'name',
      header: 'Tên lĩnh vực',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '90px',
    },
    {
      key: 'description',
      header: 'Mô tả',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '90px',
    },
    {
      key: 'status',
      header: 'Trạng thái',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '90px',
    },
    {
      key: 'actions',
      header: 'Thao tác',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '90px',
    }]
  optionStatus: OptionModel<any>[] = [
      { label: 'Hiệu lực', value: 1 },
      { label: 'Hết hiệu lực', value: 0 },
    ];
  form: FormGroup
  ngOnInit() {
    this.buildForm()
    this.store.dispatch(searchConfigField({ param: {} }));
    this.store
    .select(selectConfigfieldList)
    .pipe(skip(1),takeUntil(this.destroy$))
    .subscribe((data: any) => {
      if(data){
        this.lstConfigField  = data?.content?.map((item: any) => ({ ...item, isSelected: false }));
        this.onSearchServiceGroup( this.lstConfigField[0],  0)
        if(this.lstConfigField.length == 0){
          this.lstServiceGroup = []
        }
        this.numberOfElementsConfigField = data?.numberOfElements
      }
    });
    this.store.select(selectServiceGroupConfigList).pipe(takeUntil(this.destroy$)).subscribe((item: any) => {
      this.lstServiceGroup = item?.content
    })
    this.store
    .select(selectUpdateServiceGroupConfigSuccess)
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res){this.notificationService.open({
        type: 'success',
        content: 'Cập nhật trạng thái nhóm dịch vụ thành công'
      });
      this.store.dispatch(clearStateUpdateGroupService())
      // this.form.reset()
      // this.store.dispatch(searchConfigField({ param: {getAll: -1} }));
      this.store.dispatch(searchServiceGroupConfig({payload: {businessDomainId: this.businessDomainId}}))
    }});
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

    this.store
    .select(selectUpdateConfigfieldSuccess)
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res){  this.notificationService.open({
        type: 'success',
        content: 'Cập nhật trạng thái lĩnh vực thành công'
      });
      this.store.dispatch(clearStateUpdateConfigField())
      this.form.reset()
      this.store.dispatch(searchConfigField({ param: {getAll: -1} }));
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

    this.store
    .select(selectUpdateServiceGroupPrioritySuccess)
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => {

      if (res){
        this.notificationService.open({
          type: 'success',
          content: 'Cập nhật vị trí nhóm dịch vụ thành công'
        });
    this.store.dispatch(clearStateUpdateGroupServicePrioritySuccess())
    // this.form.reset()
    // this.store.dispatch(searchConfigField({ param: {getAll: -1} }));
    this.store.dispatch(searchServiceGroupConfig({payload: {businessDomainId: this.businessDomainId}}))
    this.isDisableServiceGroup = false
      }
    });
    this.store
    .select(selectUpdateServiceGroupPriorityError)
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res){
        this.notificationService.open({
          type: 'error',
          content: res?.message || 'Cập nhật vị trí không thành công'
        });
      }
      this.store.dispatch(clearStateUpdateGroupServicePriorityError())
    });

    this.store
    .select(selectUpdateConfigfieldPrioritySuccess)
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => {
      
      if (res){
        this.notificationService.open({
          type: 'success',
          content: 'Cập nhật vị trí lĩnh vực thành công'
        });
        this.store.dispatch(clearStateUpdateConfigFieldPrioritySuccess())
              this.form.reset()
      this.store.dispatch(searchConfigField({ param: {getAll: -1} }));
        this.isDisable = false
      this.checkSearch = false


      }
    });
    this.store
    .select(selectUpdateConfigFieldPriorityError)
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res){
        this.notificationService.open({
          type: 'error',
          content: res?.message || 'Cập nhật vị trí không thành công'
        });
      }
      this.store.dispatch(clearStateUpdateConfigFieldPriorityError())

    });
  }
buildForm(){
  this.form = this.fb.group({
    code: [null],
    name: [null],
    status:[null]
  })
}

onSwitchStatus(item: any){
  (this.typeConfirm = 'switchStatusGroup');
  setTimeout(() => {
    this.confirmation.show(item)
  }, 0)
}

onSwitchStatusField(item: any){
  (this.typeConfirm = 'switchStatusField');
  setTimeout(() => {
    this.confirmation.show(item)
  }, 0)
}

confirmSwitchStatusGroup(item: any){
     
  this.store.dispatch(updateServiceGroupConfig({payload: {...item, status: Number(!item.status)}, id: item.id}))
}


confirmSwitchStatusField(item: any){
     
  this.store.dispatch(updateConfigField({payload: {...item, status: Number(!item.status)}}))
}

  onSearch(){
    this.lstServiceGroup = []
    let formVal = this.form.getRawValue()
    this.isDisable = false
    this.isDisableServiceGroup = false
    if(formVal.code != null || formVal.name != null || formVal.status != null){
      this.checkSearch = true
    }
    else{
      this.checkSearch = false
    }
    this.store.dispatch(searchConfigField({param: ObjUtil.deleteNullProp(formVal) }))
  }

  checkButton(){
    if( this.isDisable == true && this.checkSearch == true){
      return false
    }
    if(this.isDisable == true && this.checkSearch == false){
      return true
    }
    if(this.isDisable == false && (this.checkSearch == true )){
      return false
    }
    if(this.isDisable == false && ( this.checkSearch == false)){
      return false
    }
    else{
      return false
    }
  }

  onDrop(event: CdkDragDrop<any[]>): void {
    let arrDrag = [...this.lstConfigField]
    if(event){
      this.isDisable = true

    moveItemInArray(arrDrag, event.previousIndex, event.currentIndex);
    } else {
      this.isDisable = false
    }

    const aaa = arrDrag.map((item, index) => {
      return {
        ...item,
        priority: index + 1
      }
    });
    this.lstConfigField = aaa
   
  }

  updatePriorityConfigfield(){
    
    const data = this.lstConfigField
    const payload = {
      businessDomainDTOList: data
    }
    this.store.dispatch(updateConfigFieldPriority({payload: payload}))


  }

  onDropServiceGroup(event: CdkDragDrop<any[]>): void {
    let arrDrag = [...this.lstServiceGroup]
    if(event){
      this.isDisableServiceGroup = true

    moveItemInArray(arrDrag, event.previousIndex, event.currentIndex);
    } else {
      this.isDisableServiceGroup = false
    }

    const aaa = arrDrag.map((item, index) => {
      return {
        ...item,
        orderServiceGroup: index + 1
      }
    });
    this.lstServiceGroup = aaa
  }

  updatePriorityServiceGroup(){
    const data = this.lstServiceGroup
    const payload = {
      serviceGroupDTOList: data
    }
    this.store.dispatch(updateServiceGroupPriority({payload: payload}))


  }

  onSelectKeysChange(keys: string[]){
    this.selectedKeys = keys
  }
  medicalTestModal: NzModalRef
  configFieldModal: NzModalRef
openModalService(){
  this.configFieldModal = this.modal.create({
    nzContent: ConfigFieldModalComponent,
    nzTitle: 'Thêm mới lĩnh vực',
    nzFooter: null,
    nzWidth: 1000,
    nzMaskClosable: false,
    nzData: {
   
    },
    nzClassName: 'modal'
  });
  this.configFieldModal?.afterClose.subscribe((res) => {
    if (res) {
      this.form.reset()
      this.store.dispatch(searchConfigField({ param: {getAll: -1} }));
    }
  });
}
  onDeleteItem(item: any){
  }
  onEditItemField(item: any){
    const data = item
    this.configFieldModal = this.modal.create({
      nzContent: ConfigFieldModalComponent,
      nzTitle: `Cập nhật lĩnh vực "${item?.name || ''}"`,
      nzFooter: null,
      nzWidth: 1000,
      nzMaskClosable: false,
      nzData: {
      data: data,
      numberOfElements: this.numberOfElementsConfigField
      },
      nzClassName: 'modal-medicine-adr'
    });
    this.configFieldModal?.afterClose.subscribe((res) => {
      if (res) {
        this.form.reset()
        this.store.dispatch(searchConfigField({ param: {getAll: -1} }));
      }
    });
  }

  onSearchServiceGroup(item: any, index: number){
    this.store.dispatch(searchServiceGroupConfig({payload: {businessDomainId: item.id}}))
    this.isDisableServiceGroup = false

    this.businessDomainId = item.id
    this.lstConfigField.forEach(item => item.isSelected = false);
    this.lstConfigField[index].isSelected = true;
  }
  openModalServiceGroup(){
    this.medicalTestModal = this.modal.create({
      nzContent: ConfigFieldGroupModalComponent,
      nzTitle: 'Thêm mới nhóm dịch vụ',
      nzFooter: null,
      nzMaskClosable: false,
      nzWidth: 1000,
      nzData: {
        businessDomainId: this.businessDomainId
      },
      nzClassName: 'modal-medicine-adr'
    });
    this.medicalTestModal?.afterClose.subscribe((res) => {
      if (res) {
       
        this.store.dispatch(searchServiceGroupConfig({payload: { businessDomainId: this.businessDomainId }}))
     
      }
    });
  }

  onEditItemGroup(item: any){
    this.medicalTestModal = this.modal.create({
      nzContent: ConfigFieldGroupModalComponent,
      nzTitle: `Cập nhật nhóm dịch vụ "${item?.name || ''}"`,
      nzFooter: null,
      nzWidth: 1000,
      nzMaskClosable: false,
      nzData: {
     data: item
      },
      nzClassName: 'modal-medicine-adr'
    });
    this.medicalTestModal?.afterClose.subscribe((res) => {
      if (res) {
        this.isCheckUpdate = res
    this.store.dispatch(searchServiceGroupConfig({payload: {businessDomainId: this.businessDomainId
    }}))
     
      }
    });

  }

  ngOnDestroy(): void {
      super.ngOnDestroy()
      if(this.medicalTestModal ){
        this.medicalTestModal.destroy()
      }
      if(this.configFieldModal){
        this.configFieldModal.destroy()
      }
  }

}

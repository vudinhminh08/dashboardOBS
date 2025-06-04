import { Component, OnInit, ViewChild } from '@angular/core';
import { MainServiceConfigurationModalComponent } from '../main-service-configuration-modal/main-service-configuration-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ColumnConfig, OptionModel } from '@core/models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BaseDestroyComponent } from '@core/components';
import { Store } from '@ngrx/store';
import { clearStateUpdateMainServices, clearStateUpdatePriorityServices, clearStateUpdatePriorityServicesError, searchMainServices, updateMainServices, updateMainServicesPriority } from '@modules/main-service-configuration/state/main-service-configuration.actions';
import { takeUntil } from 'rxjs';
import { selectMainServicesList, selectUpdateMainServicesPriorityError, selectUpdateMainServicesPrioritySuccess, selectUpdateMainServicesSuccess } from '@modules/main-service-configuration/state/main-service-configuration.selectors';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
import { NotificationService } from '@core/services/notification.service';
import { ObjUtil } from '@core/utils/obj.util';

@Component({
  selector: 'app-main-service-configuration-form',
  templateUrl: './main-service-configuration-form.component.html',
  styleUrls: ['./main-service-configuration-form.component.scss']
})
export class MainServiceConfigurationFormComponent extends BaseDestroyComponent implements OnInit {
  constructor(private fb: FormBuilder, 
    protected modal: NzModalService, 
    private store: Store,
    private notificationService: NotificationService){super()}
  selectedKeys: string[] = [];
  isDisable: boolean = false
  isCheckSearch: boolean = true
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
  typeConfirm: 'updatePriority' | 'switchStatus' = 'updatePriority';
  form: FormGroup
  lstMainService: any
  @ViewChild(ConfirmationComponent) confirmation: ConfirmationComponent;
  ngOnInit() {
    this.buildForm()
    this.getData()
    this.store
    .select(selectMainServicesList)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.lstMainService = data?.content;  
    });
    this.store
    .select(selectUpdateMainServicesSuccess)
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res){
        this.notificationService.open({
          type: 'success',
          content: 'Thay đổi trạng thái dịch vụ thành công'
        });
      this.getData()
      this.store.dispatch(clearStateUpdateMainServices())
    
      }
    });
    this.store
    .select(selectUpdateMainServicesPrioritySuccess)
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res){
        console.log('res',res);
        
        this.notificationService.open({
          type: 'success',
          content: 'Cập nhật vị trí dịch vụ thành công'
        });
      this.getData()
      this.isDisable = false
    this.store.dispatch(clearStateUpdatePriorityServices())

      }
    });
    this.store
    .select(selectUpdateMainServicesPriorityError)
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res){
        this.notificationService.open({
          type: 'error',
          content: res?.message || 'Có lỗi xảy ra, vui lòng liên hệ CSKH 1900980 để được hỗ trợ'
        });
      }
    });
    this.store.dispatch(clearStateUpdatePriorityServicesError())
  }
buildForm(){
  this.form = this.fb.group({
    serviceCode: [null],
    serviceName: [null],
    status:[null]
  })
}

getData(){
  this.store.dispatch(searchMainServices({ payload: {getAll: -1} }));

}
onSearch(){
  let formVal = this.form.getRawValue()
  this.isDisable = false
  if(formVal.serviceCode === null && formVal.serviceName === null && formVal.status === null){
    this.isCheckSearch = true
  }else{
    this.isCheckSearch = false
  }
  this.store.dispatch(searchMainServices({payload:ObjUtil.deleteNullProp(formVal)}))
}

checkDisable(){
  if(this.isDisable === true && this.isCheckSearch === true){
    return true
  }else{
    return false
  }
}
  onDrop(event: CdkDragDrop<string[]>): void {
    let arrDrag = [...this.lstMainService]
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
    this.lstMainService = aaa
  }

  updatePriority(){
    const data = this.lstMainService
    const payload = {
      serviceCoreDTOList: data
    }
    this.store.dispatch(updateMainServicesPriority({payload: payload}))
  }

 

  onSelectKeysChange(keys: string[]){
    this.selectedKeys = keys
  }

  onSwitchStatus(item: any){
    (this.typeConfirm = 'switchStatus');
    setTimeout(() => {
      this.confirmation.show(item)
    }, 0)
  }

  confirmSwitchStatus(item: any){
    this.store.dispatch(updateMainServices({payload: {...item, status: Number(!item.status)}}))
  }
mainServiceModal: NzModalRef
openModalService(){
   this.mainServiceModal = this.modal.create({
    nzContent: MainServiceConfigurationModalComponent,
    nzTitle: 'Thêm mới dịch vụ',
    nzFooter: null,
    nzWidth: 1000,
    nzMaskClosable: false,
    nzData: {
   
    },
    nzClassName: 'modal-medicine-adr'
  });
  this.mainServiceModal.afterClose.subscribe((res) => {
    if (res) {
   this.onSearch()
    }
  });
}
  onDeleteItem(item: any){

  }

  onEditItem(item: any){
     this.mainServiceModal = this.modal.create({
      nzContent: MainServiceConfigurationModalComponent,
      nzTitle: `Cập nhật dịch vụ "${item?.serviceName || ''}"`,
      nzFooter: null,
      nzWidth: 1000,
      nzMaskClosable: false,
      nzData: {
      data: item
      },
      nzClassName: 'modal-medicine-adr'
    });
    this.mainServiceModal.afterClose.subscribe((res) => {
      if (res) {
     
      }
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy()
    if(this.mainServiceModal ){
      this.mainServiceModal.destroy()
    }
}

}


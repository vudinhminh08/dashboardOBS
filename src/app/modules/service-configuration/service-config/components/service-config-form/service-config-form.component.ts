import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ServiceConfigModalComponent } from '../service-config-modal/service-config-modal.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseCrudListComponent, BaseDestroyComponent } from '@core/components';
import { ColumnConfig, OptionModel } from '@core/models';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { searchConfigField, searchServiceGroupConfig } from '@modules/service-configuration/config-field/state/config-field.actions';
import { selectConfigfieldList, selectServiceGroupConfigList } from '@modules/service-configuration/config-field/state/config-field.selectors';
import { skip, takeUntil } from 'rxjs';
import { selectGlobelList, selectServiceConfigList, selectUpdateServiceConfigPriority, selectUpdateServiceConfigPriorityError, selectUpdateServiceConfigPriorityMainError, selectUpdateServiceConfigPriorityMainSuccess, selectUpdateServiceConfigPrioritySuccess, selectUpdateServiceConfigSuccess } from '../../state/service-config.selectors';
import { clearStateUpdatePriorityMainService, clearStateUpdatePriorityMainServiceError, clearStateUpdatePriorityServices, clearStateUpdateService, getGlobalListService, searchServiceConfig, updateServiceConfig, updateServicePriorityConfig, updateServicesPriorityMain } from '../../state/service-config.actions';
import { ObjUtil } from '@core/utils/obj.util';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
import { NotificationService } from '@core/services/notification.service';
import { cloneDeep } from 'lodash';
import { ValidatorUtil } from '@core/utils/validator.util';
import { CODE_FORMAT } from '@core/constants';
@Component({
  selector: 'app-service-config-form',
  templateUrl: './service-config-form.component.html',
  styleUrls: ['./service-config-form.component.scss']
})
export class ServiceConfigFormComponent extends BaseDestroyComponent implements OnInit {
  constructor(private fb: FormBuilder,
    protected modal: NzModalService,
    private route: Router,
    private store: Store,
    private cdr: ChangeDetectorRef,
    protected notificationService: NotificationService) { super() }
  @ViewChild(ConfirmationComponent) confirmation: ConfirmationComponent;
  selectedKeys: string[] = [];
  isDisable: boolean = false
  isCheckSearch: boolean = false
  optionBusinessDomain: { value: any; label: any }[];
  optionServiceGroup: { value: any; label: any }[];
  optionLableServiceGroup: { value: any; label: any }[];
  optionGlobalList: { value: any; label: any }[];
  lstService: any[] = []
  checkButton: boolean = true
  isCheckPriorityMain: boolean = false
  optionStatus: OptionModel<any>[] = [
    { label: 'Hiệu lực', value: 1 },
    { label: 'Hết hiệu lực', value: 0 },


  ];
  optionScreenHome: OptionModel<any>[] = [
    { label: 'Có', value: 1 },
    { label: 'Không', value: 0 }

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
  typeConfirm: 'updatePriority' | 'switchStatus' = 'updatePriority';
  form: FormGroup
  id: number
  ngOnInit() {
    this.isCheckSearch = false
    this.buildForm()
    this.getData()
    this.selectData()
    this.store
    .select(selectUpdateServiceConfigPrioritySuccess)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res) {
        this.notificationService.open({
          type: 'success',
          content: 'Cập nhật vị trí dịch vụ thành công'
        });
        this.getData()
        this.form.reset()
        this.store.dispatch(clearStateUpdatePriorityServices())
        this.isDisable = false
    this.isCheckSearch = false

      }
    });
    this.store
    .select(selectUpdateServiceConfigPriorityError)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res) {
        this.notificationService.open({
          type: 'error',
          content: res?.message || 'Có lỗi xảy ra, vui lòng liên hệ CSKH 1900980 để được hỗ trợ'
        });
        this.getData()
      }
    });

    this.store
    .select(selectUpdateServiceConfigPriorityMainSuccess)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res) {
        this.notificationService.open({
          type: 'success',
          content: 'Cập nhật vị trí dịch vụ thành công'
        });
        this.getData()
        this.form.reset()
        this.store.dispatch(clearStateUpdatePriorityMainService())
        this.isDisable = false
    this.isCheckSearch = false

      }
    });
    this.store
    .select(selectUpdateServiceConfigPriorityMainError)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res) {
        this.notificationService.open({
          type: 'error',
          content: res?.message || 'Có lỗi xảy ra, vui lòng liên hệ CSKH 1900980 để được hỗ trợ'
        });
        // this.getData()
        this.store.dispatch(clearStateUpdatePriorityMainServiceError())
      }
    });

    this.store
.select(selectUpdateServiceConfigSuccess)
.pipe(takeUntil(this.destroy$))
.subscribe((res) => {
  if (res) {
    this.notificationService.open({
      type: 'success',
      content: 'Cập nhật trạng thái dịch vụ thành công'
    });
    this.store.dispatch(clearStateUpdateService())
    this.isCheckSearch = false
    this.form.reset()
    this.getData()
  }

});
  }

  buildForm() {
    this.form = this.fb.group({
      serviceCode: [null
     ],
      serviceName: [null],
      status: [null],
      serviceGroupId: [null],
      businessDomainId: [null],
      globalListDetailId: [null],
      screenHome: [null]
    })
  }
onChangeHome(item: any){
if(item == null){
this.checkButton = true

}else if(item == 1 || item == 0)
{
this.checkButton = false
}
}


  changeBD(item: any) {
    if (item) {
      this.form.controls['serviceGroupId'].reset()
      this.store.dispatch(searchServiceGroupConfig({ payload: ObjUtil.deleteNullProp({ businessDomainId: item }) }))
    
    }
    else {
      this.form.controls['serviceGroupId'].reset()
      this.optionServiceGroup = []

    }
  }

  onSwitchStatusUser(item: any){

  }
  onSearch() {
    this.isDisable = false;
    let formVal = this.form.getRawValue() 
    this.store.select(selectServiceGroupConfigList).pipe(takeUntil(this.destroy$)).subscribe((item: any) => {
      if(item){
      this.optionServiceGroup =
      item?.content?.map((x: any) => {
        return { value: x.id, label: `${x.name}` };
      }) || [];

      if(formVal.businessDomainId && this.optionServiceGroup?.length === 0 && (formVal.status === null && formVal.serviceName === null
        && formVal.serviceCode === null && formVal.globalListDetailId === null && formVal.screenHome === null)){
          this.isCheckSearch = true
        this.isCheckPriorityMain = false
        this.isDisable = false
          
      }
  
      if(formVal.businessDomainId && this.optionServiceGroup?.length > 0 && formVal.serviceGroupId && (formVal.status === null && formVal.serviceName === null
        && formVal.serviceCode === null && formVal.globalListDetailId === null && formVal.screenHome === null)){
          this.isCheckSearch = true
        this.isCheckPriorityMain = false
          this.isDisable = false
  
      }
  
      if(formVal.businessDomainId && this.optionServiceGroup?.length > 0 && (formVal.serviceGroupId === null && formVal.status === null && formVal.serviceName === null
        && formVal.serviceCode === null && formVal.globalListDetailId === null && formVal.screenHome === null)){
          this.isCheckSearch = false
        this.isCheckPriorityMain = false
          this.isDisable = false

  
  
      }
  
      if(formVal.screenHome === 1 && formVal.businessDomainId === null && formVal.status === null && formVal.serviceName === null
        && formVal.serviceCode === null && formVal.globalListDetailId === null ){
          this.isCheckSearch = true
        this.isCheckPriorityMain = true
  
      }
  
      if(formVal.screenHome === 1 && ( formVal.businessDomainId || formVal.status === 1 || formVal.status === 0
         || formVal.serviceName
        || formVal.serviceCode || formVal.globalListDetailId) ){
          this.isCheckSearch = false ///
        this.isCheckPriorityMain = false
        this.isDisable = false
  
      }
      if( formVal.status === 0 || formVal.status === 1 || formVal.serviceName
        || formVal.serviceCode || formVal.globalListDetailId || formVal.screenHome === 0 ){
        this.isDisable = false
        this.isCheckSearch = false
        
      }
    }
  }
  )


    // const values = Object.values(formVal);
    // if (values.every(value => value === null)) {
    //   console.log("Tất cả phần tử trong đối tượng đều là null.");
    //   this.getData()
    //   this.isDisable = false;
    //   this.isCheckPriorityMain = false;
    //   this.isCheckSearch = false;

    // } else if (values.some(value => value !== null)) {
     
    // } else {
      
    // }

    this.store.dispatch(searchServiceConfig({ payload: ObjUtil.deleteNullProp({...formVal, getAll: -1}) }));
  }

  checkDisable() {
    if (this.isDisable == true && this.isCheckSearch == false && this.isCheckPriorityMain == false) {
      return false;
    } else if (this.isDisable == false && this.isCheckSearch == true && this.isCheckPriorityMain == false) {
      return false;
    } else if (this.isDisable == false && this.isCheckSearch == false && this.isCheckPriorityMain == false) {
      return false;
    } else if(this.isDisable == true && this.isCheckSearch == true && this.isCheckPriorityMain == false){
      return true;
    }else{
      return false
    }
  }
  
  checkDisableHome(){
    if (this.isDisable == true && this.isCheckSearch == false && this.isCheckPriorityMain == true) {
      return false;
    } else if (this.isDisable == false && this.isCheckSearch == true && this.isCheckPriorityMain == true) {
      return false;
    } else if (this.isDisable == false && this.isCheckSearch == false && this.isCheckPriorityMain == true) {
      return false;
    } else if(this.isDisable == true && this.isCheckSearch == true && this.isCheckPriorityMain == true){
      return true;
    }else{
      return false
    }
  }

  selectData(){
  //   this.store.select(selectServiceGroupConfigList).pipe(takeUntil(this.destroy$)).subscribe((item: any) => {
  //     if(item){
  //     this.optionServiceGroup =
  //     item?.content?.map((x: any) => {
  //       return { value: x.id, label: `${x.name}` };
  //     }) || [];
  //   }
  // }
  // )
    this.store
    .select(selectServiceConfigList)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      if (data)
        this.lstService = data?.content;

    });

    this.store.select(selectGlobelList).pipe(takeUntil(this.destroy$)).subscribe((item: any) => {
      for (const arrElement of item) {
        if (arrElement && arrElement.code == 'PARTNER_CODE') {
          this.optionGlobalList = arrElement.globalListDetails?.map((x: any) => {
            return { value: x.globalListDetailId, label: ` ${x.name}` };
          }) || [];
        }
      }
  })
  this.store
  .select(selectConfigfieldList)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data: any) => {
    if(data?.content?.length > 0)
    {
      
      this.optionBusinessDomain =
        data?.content?.map((x: any) => {
          return { value: x.id, label: ` ${x.name}` };
        }) || [];
    }

  });
  this.store
  .select(selectUpdateServiceConfigPriority)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data: any) => {
    if (data)
    
      this.lstService = data?.content;

  });
  }

  getData() {
    // this.store.dispatch(searchServiceGroupConfig({ payload: {} }))

    this.store.dispatch(searchServiceConfig({ payload: {getAll: -1} }));

    this.store.dispatch(getGlobalListService({ payload: { status: 1 } }))

    this.store.dispatch(searchConfigField({ param: {} }));

  }

  onDrop(event: CdkDragDrop<string[]>): void {
    let arrDrag = [...this.lstService]
    if(event){
      this.isDisable = true
    moveItemInArray(arrDrag, event.previousIndex, event.currentIndex);
    } 
    else {
      this.isDisable = false
    }

    if(this.isCheckPriorityMain){
      const aaa = arrDrag.map((item, index) => {
        return {
          ...item,
          priorityMain: index + 1
        }
      });
      this.lstService = aaa
    }
    else{
      const aaa = arrDrag.map((item, index) => {
        return {
          ...item,
          priority: index + 1
        }
      });
      this.lstService = aaa
    }
  }

  updatePrioryty(){
    const data = this.lstService
    const payload = {
    serviceDTOList: data
    }
    this.store.dispatch(updateServicePriorityConfig({ payload: ObjUtil.deleteNullProp(payload) }))

  }

  updatePriorytyMain(){
    const data = this.lstService
    const payload = {
      serviceDTOList: data
    }
    this.store.dispatch(updateServicesPriorityMain({ payload: ObjUtil.deleteNullProp(payload) }))

  }

  onSelectKeysChange(keys: string[]) {
    this.selectedKeys = keys
  }

  onSwitchStatus(item: any){
    (this.typeConfirm = 'switchStatus');
    setTimeout(() => {
      this.confirmation.show(item)
    }, 0)
  }

  confirmSwitchStatus(item: any){
       
    this.store.dispatch(updateServiceConfig({payload: {...item, status: Number(!item.status)}}))
  }
  // showUpdatePriorityPU(){
  //   this.confirmation.show()

  // }



  createItem() {
    this.route.navigateByUrl('service-configuration/service-config/create')
  }

  updateItem(item: any) {
    this.route.navigate([`/service-configuration/service-config/${item.id}`]);
  }

}

import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseCrudListComponent } from '@core/components';
import { ColumnConfig, OptionModel } from '@core/models';
import { NotificationService } from '@core/services/notification.service';
import { ObjUtil } from '@core/utils/obj.util';
import { BannerConfigFormComponent } from '@modules/banner-config/components/banner-config-form/banner-config-form.component';
import { clearStateUpdateBannerConfig, searchBannerConfig, updateBannerConfig } from '@modules/banner-config/states/banner-config.actions';
import { selectBannerConfigList, selectTotalBannerConfig, selectBannerConfigLoading, selectUpdateBannerConfigError, selectUpdateBannerConfigSuccess } from '@modules/banner-config/states/banner-config.selectors';
import { getGlobalListService } from '@modules/service-configuration/service-config/state/service-config.actions';
import { selectGlobelList } from '@modules/service-configuration/service-config/state/service-config.selectors';
import { Store } from '@ngrx/store';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
import { differenceInCalendarDays, formatDistanceStrict } from 'date-fns';
import { flatten, isNil, omitBy } from 'lodash';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable, takeUntil } from 'rxjs';
import { DateUtil } from '@core/utils/date.util';
import { DATE_FORMAT, DATE_TIME_SQL_FORMAT, DATE_TIME_SQL_FORMAT_TIMEZONE } from '@core/constants';
@Component({
  selector: 'app-banner-config-list',
  templateUrl: './banner-config-list.component.html',
  styleUrls: ['./banner-config-list.component.scss']
})
export class BannerConfigListComponent extends BaseCrudListComponent implements OnInit {
  constructor(
    store: Store<any>,
    router: Router,
    drawer: NzDrawerService,
    notification: NotificationService,
    modal: NzModalService,
    activatedRoute: ActivatedRoute,
    fb: FormBuilder,
   
  ) {
    super(store, router, drawer, notification, modal, activatedRoute, fb )
  }
  @ViewChild(ConfirmationComponent) confirmation: ConfirmationComponent;
  typeConfirm: 'switchStatus' | 'delete' = 'switchStatus';
  selectedKeys: string[] = [];
  isDisable: boolean = false
  loading$: Observable<boolean>;
  pagination: any
  displayColumns: any
  total: any
  lstVideos: any[] = []
  lstBannerType:OptionModel[]=[
    {value: 'BACKGROUND_IMAGE', label: 'Ảnh background'},
    {value: 'HOME_BANNER', label: 'Banner màn hình chính'},
    {value: 'SCREEN_BANNER', label: 'Banner các màn hình'}];
  items: any[]
  columns: ColumnConfig[] = [
    {
      key: 'actions',
      header: 'Thao tác',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '90px',
    },
    {
      key: 'bannerName',
      header: 'Tiêu đề sự kiện',
      tdClass: 'text-left',
      // pipe: 'template',
      nzWidth: '250px',
    },
    {
      key: 'bannerType',
      header: 'Loại banner',
      tdClass: 'text-left',
      pipe: 'template',
      nzWidth: '150px',
    },
    {
      key: 'description',
      header: 'Mô tả',
      tdClass: 'text-left',
      // pipe: 'template',
      nzWidth: '250px',
    }, 
    {
      key: 'createBy',
      header: 'Người tạo',
      tdClass: 'text-left',
      // pipe: 'template',
      nzWidth: '120px',
    },
    {
      key: 'createTime',
      header: 'Thời điểm tạo',
      tdClass: 'text-center',
      pipe: 'date',
      nzWidth: '120px',
    },
    {
      key: 'status',
      header: 'Trạng thái',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '90px',
    },
 ]

 disabledFromDate = (current: Date): boolean =>
 this.form?.value?.endDate && differenceInCalendarDays(current, new Date(this.form?.value?.endDate)) > 0; // nếu có endDate thì disable những ngày sau end time, nếu ko có thì thôi

disabledToDate = (current: Date): boolean =>
 differenceInCalendarDays(current, new Date(this.form?.value?.startDate)) < 0; // disable những ngày trc startDate, nếu ko có startDate thì disable những ngày trc today
 optionStatus: OptionModel<any>[] = [
  { label: 'Hiệu lực', value: 1 },
  { label: 'Hết hiệu lực', value: 0 },
];
  form: FormGroup
  isDelete: boolean
  findItemsAction = searchBannerConfig;
  selectItems = selectBannerConfigList;
  selectLoading = selectBannerConfigLoading;
  selectTotal = selectTotalBannerConfig;
  ngOnInit() {
    this.buildForm()
    super.ngOnInit();
    this.store.dispatch(getGlobalListService({ payload: { status: 1 } }));
    this.getData()
    this.store
    .select(selectUpdateBannerConfigSuccess)
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res){ 
        if(this.isDelete){
          this.notification.open({
            type: 'success',
            content: 'Xoá banner thành công'
          });
        }else{
          this.notification.open({
            type: 'success',
            content: 'Cập nhật trạng thái thành công'
          });
        }
         
      this.store.dispatch(clearStateUpdateBannerConfig())
      this.findItems()
    } 
    });
  this.store
    .select(selectUpdateBannerConfigError)
    .pipe( takeUntil(this.destroy$))
    .subscribe((res) => {
      if (res){
        this.notification.open({
          type: 'error',
          content: res?.message || 'Có lỗi xảy ra, vui lòng liên hệ CSKH 1900980 để được hỗ trợ'
        });
        this.findItems()
      }
    });

  }
  
buildForm(){
  this.form = this.fb.group({
    endDate: [],
    bannerName: [''],
    startDate: [],
    status:[''],
    bannerType:['']
  })
}


getParams() {
  let formVal = {...this.form.getRawValue()}
  let startDate =  new Date(formVal.startDate)
  startDate.setHours(0, 0, 0, 0)
  let endDate = new Date(formVal.endDate)
  endDate.setHours(23, 59, 59, 999)
  return omitBy(
    {
      bannerName: formVal.bannerName,
      startDate: formVal.startDate   ? DateUtil.formatTimeSQL(
        startDate,
          DATE_TIME_SQL_FORMAT
        )
      : '',
      endDate:  formVal.endDate
      ? DateUtil.formatTimeSQL(
        endDate ,
          DATE_TIME_SQL_FORMAT
        )
      : '',
      status: formVal.status,
      bannerType: formVal.bannerType,
      page: this.currentPageNum || this.pagination.index,
      size: this.pagination.size,
      ...this.params
    },
    isNil
  );
}

findItems(payload: any = {}) {
  this.store.dispatch(
    this.findItemsAction({
      payload: {
        params: {...omitBy(this.getParams(), isNil), ...payload},
        body: ObjUtil.deleteNullProp(this.form.getRawValue() || {})
      }
    })
  );
}

onClear() {
  this.form.reset()
}

getData(){

  // this.store
  // .select(selectGlobelList)
  // .pipe(takeUntil(this.destroy$))
  // .subscribe((items: any) => {

  //   if (items) {
  //     const lstBanner = items.filter((item: any) =>
  //       ['BACKGROUND_IMAGE', 'HOME_BANNER', 'SCREEN_BANNER'].includes(
  //         item.code
  //       )
  //     );
  //     const banner = flatten(
  //       lstBanner.map((item: any) => item.globalListDetails)
  //     );
  //     this.lstBannerType =
  //       banner?.map((x: any) => {
  //         return { value: x.globalListDetailId, label: ` ${x.name}` };
  //       }) || [];
  //   }
  // });

  this.store
    .select(selectBannerConfigList)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      if (data)
        this.lstVideos = data?.content;

    });
}
  onSearch(){
    let formVal = {...this.form.getRawValue(), status: this.form.getRawValue().status ? 1 : 0}
    this.store.dispatch(searchBannerConfig({   payload: {
      body: ObjUtil.deleteNullProp(formVal || {})
    } }));
  }

  onSwitchStatus(item: any){
    (this.typeConfirm = 'switchStatus');
    setTimeout(() => {
      this.confirmation.show(item)
    }, 0)
  }

  confirmSwitchStatus(item: any){
    this.isDelete = false
    this.store.dispatch(updateBannerConfig({payload: {...item, status: Number(!item.status)}, id:item?.id}))
  }

  onDeleteItem(item: any){
    (this.typeConfirm = 'delete');
    setTimeout(() => {
      this.confirmation.show(item)
    }, 0)
  }

  confirmDelete(item: any){
   this.isDelete = true
    this.store.dispatch(updateBannerConfig({payload: {...item, status: -1}, id:item?.id}))
  }

  onDrop(event: CdkDragDrop<any[]>): void {
    if(event){
      this.isDisable = true
      
      this.lstVideos.splice(event.currentIndex, 0, this.lstVideos.splice(event.previousIndex, 1)[0]);
    }else{
      this.isDisable = false

    }
   
  }

  onSelectKeysChange(keys: string[]){
    this.selectedKeys = keys
  }
bannerModal: NzModalRef
openModalService(){
  this.bannerModal = this.modal.create({
    nzContent: BannerConfigFormComponent,
    nzTitle: 'Thêm mới banner',
    nzFooter: null,
    nzWidth: 1000,
    nzMaskClosable: false,
    nzData: {
   
    },
    nzClassName: 'modal-medicine-adr'
  });
  this.bannerModal.afterClose.subscribe((res) => {
    if (res) {
      // this.store.dispatch(searchBannerConfig({ payload: {getAll: -1} }));
      this.findItems()

    }
  });
}


  onEditItem(item: any){
    this.bannerModal = this.modal.create({
      nzContent: BannerConfigFormComponent,
      nzTitle: `Cập nhật banner "${item?.bannerName || ''}"`,
      nzFooter: null,
      nzWidth: 1000,
      nzMaskClosable: false,
      nzData: {
      data: item
      },
      nzClassName: 'modal-medicine-adr'
    });
    this.bannerModal.afterClose.subscribe((res) => {
      if (res) {
     this.findItems()
      }
    });
  }

  ngOnDestroy(): void {
      super.ngOnDestroy()
      if(this.bannerModal){
        this.bannerModal.destroy()
      }
  }

}

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseCrudListComponent, BaseDestroyComponent } from '@core/components';
import { ColumnConfig, OptionModel } from '@core/models';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { VideoConfigurationModalComponent } from '../video-configuration-modal/video-configuration-modal.component';
import { Observable, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  clearStateUpdatePriorityVideos,
  clearStateUpdatePriorityVideosMain,
  clearStateUpdateVideosConfig,
  clearStateUpdateVideosConfigError,
  searchVideosConfig,
  updateVideosConfig,
  updateVideosPriority,
  updateVideosPriorityMain
} from '@modules/video-configuration/states/video-configuration.actions';
import {
  selectTotalVideosConfig,
  selectVideosConfigLoading,
  selectUpdateVideosConfigError,
  selectUpdateVideosConfigSuccess,
  selectVideosConfigList,
  selectupdateVideosPriorityMainSuccess,
  selectupdateVideosPrioritySuccess
} from '@modules/video-configuration/states/video-configuration.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NotificationService } from '@core/services/notification.service';
import { UserManagerServices } from '@modules/user-role/user-manager/state/service';
import { VideoConfigurationService } from '@modules/video-configuration/services/video-configuration.service';
import { ConfirmationComponent } from '@shared/components/confirmation/confirmation.component';
import { isEmpty, isNil, omit, omitBy } from 'lodash';
import { ObjUtil } from '@core/utils/obj.util';
import { getGlobalListService } from '@modules/service-configuration/service-config/state/service-config.actions';
import { selectGlobelList } from '@modules/service-configuration/service-config/state/service-config.selectors';

@Component({
  selector: 'app-video-configuration-form',
  templateUrl: './video-configuration-form.component.html',
  styleUrls: ['./video-configuration-form.component.scss']
})
export class VideoConfigurationFormComponent
  extends BaseCrudListComponent
  implements OnInit {
  constructor(
    store: Store<any>,
    router: Router,
    drawer: NzDrawerService,
    notification: NotificationService,
    modal: NzModalService,
    activatedRoute: ActivatedRoute,
    fb: FormBuilder,
    private videoConfigServices: VideoConfigurationService
  ) {
    super(store, router, drawer, notification, modal, activatedRoute, fb);
  }

  @ViewChild(ConfirmationComponent) confirmation: ConfirmationComponent;

  selectedKeys: string[] = [];
  isMoveItem: boolean = false;
  isDelete: boolean;
  loading$: Observable<boolean>;
  pagination: any;
  displayColumns: any;
  total: any;
  lstVideos: any[] = [];
  items: any[];
  lstScreenHome: { value: any; label: any }[];
  lstVideoType: { value: any; label: any }[];
  typeConfirm: 'switchStatus' | 'delete' = 'switchStatus';

  allowUpdatePriority = false;
  allowUpdatePriorityMain = false;

  columns: ColumnConfig[] = [
    {
      key: 'actions',
      header: 'Thao tác',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '90px'
    },
    {
      key: 'videoCode',
      header: 'Mã video',
      tdClass: 'text-left',
      // pipe: 'template',
      nzWidth: '150px'
    },
    {
      key: 'videoName',
      header: 'Tên video',
      tdClass: 'text-left',
      // pipe: 'template',
      nzWidth: '200px'
    },
    {
      key: 'globalListDetailId',
      header: 'Loại video',
      tdClass: 'text-left',
      pipe: 'template',
      nzWidth: '150px'
    },
    {
      key: 'screenHome',
      header: 'Hiển thị trên trang chủ',
      tdClass: 'text-left',
      pipe: 'template',
      nzWidth: '200px'
    },
    {
      key: 'videoLink',
      header: 'Link',
      tdClass: 'text-left',
      // pipe: 'template',
      nzWidth: '250px'
    },

    {
      key: 'description',
      header: 'Mô tả',
      tdClass: 'text-left',
      // pipe: 'template',
      nzWidth: '250px'
    },
    {
      key: 'createBy',
      header: 'Người tạo',
      tdClass: 'text-left',
      // pipe: 'template',
      nzWidth: '150px'
    },
    {
      key: 'createTime',
      header: 'Thời điểm tạo',
      tdClass: 'text-center',
      pipe: 'date',
      nzWidth: '100px'
    },
    {
      key: 'status',
      header: 'Trạng thái',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '90px'
    }
  ];

  optionStatus: OptionModel<any>[] = [
    { label: 'Hiệu lực', value: 1 },
    { label: 'Hết hiệu lực', value: 0 }
  ];
  form: FormGroup;
  findItemsAction = searchVideosConfig;
  selectItems = selectVideosConfigList;
  selectLoading = selectVideosConfigLoading;
  selectTotal = selectTotalVideosConfig;

  ngOnInit() {
    this.buildForm();
    super.ngOnInit();
    this.getGlobalListService();
    this.selectData();
    this.store
      .select(selectUpdateVideosConfigSuccess)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
            this.notification.open({
              type: 'success',
              content: this.isDelete ? 'Xoá video thành công' : 'Cập nhật trạng thái video thành công'
            });
          this.store.dispatch(clearStateUpdateVideosConfig());
          this.onSearch();
        }
      });
    this.store
      .select(selectUpdateVideosConfigError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.notification.open({
            type: 'error',
            content: res?.message || 'Có lỗi xảy ra, vui lòng liên hệ CSKH 1900980 để được hỗ trợ'
          });
          this.store.dispatch(clearStateUpdateVideosConfigError());
        }
      });

    this.store
      .select(selectupdateVideosPrioritySuccess)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.notification.open({
            type: 'success',
            content: 'Cập nhật vị trí video thành công'
          });
          this.store.dispatch(clearStateUpdatePriorityVideos());
          this.onSearch();
        }
      });
    this.store
      .select(selectupdateVideosPriorityMainSuccess)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.notification.open({
            type: 'success',
            content: 'Cập nhật vị trí video thành công'
          });
          this.store.dispatch(clearStateUpdatePriorityVideosMain());
          // this.findItems()
          // this.isDisable = false
          // this.isCheckSearch = false;
          this.store.dispatch(getGlobalListService({ payload: { status: 1 } }));
          this.onSearch();
        }
      });
  }

  onClear() {
    this.isMoveItem = false;
    this.form.reset();
    this.findItems();
    this.checkDisable();
  }

  updatePriorytyMain() {
    const data = this.items;
    const payload = {
      videosDTOList: data
    };
    this.store.dispatch(
      updateVideosPriorityMain({ payload: ObjUtil.deleteNullProp(payload) })
    );
  }


  onSubmitUpdatePiority(){
    if (this.allowUpdatePriority){
      this.updatePrioryty();
    } else if (this.allowUpdatePriorityMain){
      this.updatePriorytyMain()
    }
  }

  updatePrioryty() {
    const data = this.items;
    const payload = {
      videosDTOList: data
    };
    this.store.dispatch(
      updateVideosPriority({ payload: ObjUtil.deleteNullProp(payload) })
    );
  }

  getGlobalListService() {
    this.store.dispatch(getGlobalListService({ payload: { status: 1 } }));
  }

  buildForm() {
    this.form = this.fb.group({
      videoCode: [null],
      videoName: [null],
      status: [null],
      screenHome: [null],
      globalListDetailId: [null]
    });
  }

  onDragDrop(event: CdkDragDrop<any[]>): void {
    let arrDrag = [...this.items];
    if (event) {
      this.isMoveItem = true;

      moveItemInArray(arrDrag, event.previousIndex, event.currentIndex);
    } else {
      this.isMoveItem = false;
    }


    if (this.allowUpdatePriorityMain) {
      const aaa = arrDrag.map((item, index) => {
        return {
          ...item,
          priorityMain: index + 1
        };
      });
      this.items = aaa;

    } else if (this.allowUpdatePriority) {
      const aaa = arrDrag.map((item, index) => {
        return {
          ...item,
          priority: index + 1
        };
      });
      this.items = aaa;
    }
  }

  selectData() {
    this.store
      .select(selectVideosConfigList)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (data) this.items = data;
      });

    this.store
      .select(selectGlobelList)
      .pipe(takeUntil(this.destroy$))
      .subscribe((item: any) => {
        for (const arrElement of item) {
          if (arrElement && arrElement.code == 'SCREEN_HOME') {
            const list = arrElement.globalListDetails;
            this.lstScreenHome =
              list?.map((x: any) => {
                return { value: x.value, label: ` ${x.name}` };
              }) || [];
          }
          if (arrElement && arrElement.code == 'VIDEOS') {
            const list = arrElement.globalListDetails;
            this.lstVideoType =
              list?.map((x: any) => {
                return { value: x.globalListDetailId, label: ` ${x.name}` };
              }) || [];
          }
        }
      });
  }

  onSearch() {
    this.isMoveItem = false;
    this.findItems();
    this.checkDisable();

  }

  checkDisable() {
    const formVal = this.form.getRawValue();
    const formValExcludeHome = omit(formVal, ['screenHome']);
    const formValExcludeVideoType = omit(formVal, ['globalListDetailId']);

    if (formVal.screenHome === 1 && isEmpty(ObjUtil.deleteNullProp(formValExcludeHome))) {
      this.allowUpdatePriorityMain = true;
    } else if (formVal.globalListDetailId && isEmpty(ObjUtil.deleteNullProp(formValExcludeVideoType))) {
      this.allowUpdatePriority = true;
    } else {
      this.allowUpdatePriority = false;
      this.allowUpdatePriorityMain = false;
    }
  }

  onSwitchStatus(item: any) {
    (this.typeConfirm = 'switchStatus');
    setTimeout(() => {
      this.confirmation.show(item);
    }, 0);
  }

  confirmSwitchStatus(item: any) {
    this.isDelete = false;
    this.store.dispatch(
      updateVideosConfig({
        payload: { ...item, status: Number(!item.status) },
        id: item?.id
      })
    );
  }

  onDeleteItem(item: any) {
    (this.typeConfirm = 'delete');
    setTimeout(() => {
      this.confirmation.show(item);
    }, 0);
  }

  confirmDelete(item: any) {
    this.isDelete = true;
    this.store.dispatch(
      updateVideosConfig({
        payload: { ...item, status: -1 },
        id: item?.id
      })
    );
  }

  onSelectKeysChange(keys: string[]) {
    this.selectedKeys = keys;
  }

  videoModal: NzModalRef;

  openModalService() {
    this.videoModal = this.modal.create({
      nzContent: VideoConfigurationModalComponent,
      nzTitle: 'Thêm mới video',
      nzFooter: null,
      nzWidth: 1000,
      nzData: {},
      nzClassName: 'modal-medicine-adr',
      nzMaskClosable: false
    });
    this.videoModal.afterClose.subscribe((res) => {
      if (res) {
        this.findItems();
      }
    });
  }


  onEditItem(item: any) {
    this.videoModal = this.modal.create({
      nzContent: VideoConfigurationModalComponent,
      nzTitle: `Cập nhật video "${item?.videoName || ''}"`,
      nzFooter: null,
      nzWidth: 1000,
      nzMaskClosable: false,
      nzData: {
        data: item
      },
      nzClassName: 'modal-medicine-adr'
    });
    this.videoModal.afterClose.subscribe((res) => {
      if (res) {
        this.onSearch();

      }
    });
  }


  getParams() {
    return omitBy(
      {
        ...this.form.getRawValue(),
        getAll: -1, // luôn luôn lấy hết tất cả bản ghi, sau này có tối ưu lại sau thì sửa sau
        page: this.currentPageNum || this.pagination.index,
        size: this.pagination.size,
        ...this.params
      },
      isNil
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.videoModal) {
      this.videoModal.destroy();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { BaseCrudListComponent } from '@core/components';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NotificationService } from '@core/services/notification.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder } from '@angular/forms';
import { CategoriesConfigServices } from '@modules/app-config/categories-config/state/service';
import { skip, takeUntil } from 'rxjs/operators';
import { isEmpty, isNil, omitBy } from 'lodash';
import {
  getCategoryDetailList,
} from '@modules/app-config/categories-config/state/actions';
import { ItemCategory, ItemCategoryDetailList } from '@modules/app-config/categories-config/models';
import {
  selectCategoryToGetDetail,
  selectDataDetailListCategory, selectLoadingDetailListCategory, selectTotalDetailListCategory
} from '@modules/app-config/categories-config/state/selectors';
import { ColumnConfig } from '@core/models';
import {
  AddNewCategoryDetailModalComponent
} from '@modules/app-config/categories-config/components/add-new-category-detail-modal/add-new-category-detail-modal.component';
import { OptionStatus } from '@core/options';

@Component({
  selector: 'app-categories-config-details',
  templateUrl: './app-config-details.component.html',
})
export class AppConfigDetailsComponent extends BaseCrudListComponent implements OnInit{


  selectedCategory: ItemCategory;
  items: ItemCategoryDetailList[] = [];
  isLoadingDelete = false;

  modalRef: NzModalRef;
  optionStatus = OptionStatus;

  constructor(
    store: Store<any>,
    router: Router,
    drawer: NzDrawerService,
    notification: NotificationService,
    modal: NzModalService,
    activatedRoute: ActivatedRoute,
    fb: FormBuilder,
    private categoriesConfigServices: CategoriesConfigServices,
  ) {
    super(store, router, drawer, notification, modal, activatedRoute, fb);
  }

  findItemsAction = getCategoryDetailList;
  selectItems = selectDataDetailListCategory;
  selectLoading = selectLoadingDetailListCategory;
  selectTotal = selectTotalDetailListCategory;

  columns: ColumnConfig[] = [
    {
      key: 'actions',
      header: 'Thao tác',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '60px',
    },
    {
      key: 'value',
      header: 'Giá trị',
      nzWidth: '80px',
      tdClass: 'text-center'
    },
    {
      key: 'code',
      header: 'Mã',
      nzWidth: '80px',
    },
    {
      key: 'name',
      header: 'Tên',
      nzWidth: '100px',
    },
    {
      key: 'description',
      header: 'Mô tả',
      nzWidth: '180px',
    },
    {
      key: 'orderGlobalListDetail',
      header: 'Thứ tự',
      nzWidth: '80px',
      tdClass: 'text-center',
    },
    {
      key: 'status',
      header: 'Trạng thái',
      nzWidth: '90px',
      pipe: 'optionLabel',
      filter: {
        options: this.optionStatus
      }
    },
  ];

  ngOnInit() {
    super.onInitFn();

    this.store.select(selectCategoryToGetDetail)
      .pipe(skip(1), takeUntil(this.destroy$))
      .subscribe((item: ItemCategory) => {
        this.selectedCategory = item;
        if (!isEmpty(item)){
          this.findItems();
        }
      })

  }




  onEditItem(item: ItemCategoryDetailList){
    this.openDialogAddNewDetailCategory(item)
  }

  onDeleteItem(item: ItemCategoryDetailList){

  }


  openDialogAddNewDetailCategory(item?: ItemCategoryDetailList) {
    this.modalRef = this.modal.create({
      nzContent: AddNewCategoryDetailModalComponent,
      nzData: {
        itemCategoryDetail: item,
        itemCategoryParent: this.selectedCategory
      },
      nzFooter: null,
      nzWidth: '580px',
      nzTitle: item ? `Cập nhật giá trị danh mục "${item?.name || ''}"` : 'Thêm mới giá trị danh mục',
      nzCloseIcon: 'close',
      nzMaskClosable: false
    });

    this.modalRef.afterClose.subscribe(isReload => {
      if(isReload){
        this.findItems();
      }
    });
  }


  getParams() {
    return omitBy(
      {
        globalListId: this.selectedCategory.id,
        page: this.currentPageNum || this.pagination.index,
        size: this.pagination.size,
        ...this.params
      },
      isNil
    );
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.modalRef){
      this.modalRef.destroy();
    }
  }

}

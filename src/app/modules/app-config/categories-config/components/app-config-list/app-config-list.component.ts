import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColumnConfig } from '@core/models';
import {
} from '@modules/user-role/role-manager/components/add-new-role-modal/add-new-role-modal.component';
import { BaseCrudListComponent } from '@core/components';
import {
  clearStateCategoryDetailList,
  getListCategories,
  setSelectCategoryToGetDetail
} from '@modules/app-config/categories-config/state/actions';
import {
  selectDataListCategories,
  selectLoadingListCategories, selectTotalListCategories
} from '@modules/app-config/categories-config/state/selectors';
import { ItemCategory } from '@modules/app-config/categories-config/models';
import {
  AddNewCategorriesConfigModalComponent
} from '@modules/app-config/categories-config/components/add-new-categorries-config-modal/add-new-categorries-config-modal.component';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { OptionStatus } from '@core/options';
import { isEmpty, isNil, omitBy } from 'lodash';
import { ObjUtil } from '@core/utils/obj.util';
import { skip, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-categories-config-list',
  templateUrl: './app-config-list.component.html',
})
export class AppConfigListComponent extends BaseCrudListComponent implements OnInit{


  form: FormGroup;
  modalRef: NzModalRef;

  optionStatus = OptionStatus;


  selectedKeys: string[] = [];

  columns: ColumnConfig[] = [
    {
      key: 'actions',
      header: 'Thao tác',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '90px',
    },
    {
      key: 'code',
      header: 'Mã danh mục',
      nzWidth: '100px',
    },
    {
      key: 'name',
      header: 'Tên danh mục',
      nzWidth: '130px',
    },
    {
      key: 'description',
      header: 'Mô tả',
      nzWidth: '280px',
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


  findItemsAction = getListCategories;
  selectItems = selectDataListCategories;
  selectLoading = selectLoadingListCategories;
  selectTotal = selectTotalListCategories;

  ngOnInit() {
    this.buildForm();
    super.ngOnInit();

    this.store.select(this.selectItems)
      .pipe(skip(1), takeUntil(this.destroy$),
        tap(items => {
          if (isEmpty(items)){
            this.store.dispatch(clearStateCategoryDetailList());
            this.store.dispatch(setSelectCategoryToGetDetail({payload: {} as ItemCategory}));
          }
        })).subscribe()

  }


  onClickItem(item: ItemCategory) {
    this.store.dispatch(setSelectCategoryToGetDetail({payload: item}))
  }


  onSelectKeysChange(keys: string[]){
    this.selectedKeys = keys
  }


  onDbClickItem(item: any) {

    console.log('onDbClickItem', item)
  }

  onSelectedItem(items: any[]) {
    console.log('onSelectedItem', items);
  }



  onDeleteItem(item: any){

  }

  onEditItem(item: ItemCategory){
    this.openDialogAddNewCategory(item)
  }


  onSearch(){
    this.findItems()
  }

  onClearSearch(){
    this.form.reset();
    this.findItems();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [],
      code: [],
      status: [],
    });

  }

  openDialogAddNewCategory(item?: ItemCategory) {
    this.modalRef = this.modal.create({
      nzContent: AddNewCategorriesConfigModalComponent,
      nzData: {
        itemCategory: item
      },
      nzFooter: null,
      nzWidth: '580px',
      nzTitle: item ? `Cập nhật danh mục "${item?.name || ''}"` : 'Thêm mới danh mục',
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
        ...ObjUtil.deleteNullProp(this.form.getRawValue()),
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

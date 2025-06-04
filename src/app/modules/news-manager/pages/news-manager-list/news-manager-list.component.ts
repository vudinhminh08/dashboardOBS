import { Component, OnInit } from '@angular/core';
import { BaseCrudListComponent } from '@core/components';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isEmpty, isNil, omit, omitBy } from 'lodash';
import { selectDataListNews, selectLoadingListNews, selectTotalListNews } from '@modules/news-manager/state/selectors';
import { getListNews } from '@modules/news-manager/state/actions';
import { ColumnConfig, OptionModel } from '@core/models';
import { ItemNewsResponsed, UpdateArticleStatusRequest, UpdatePositionPostRequest } from '@modules/news-manager/models';
import { OptionSourceTypeArticle, OptionStatuseArticle, OptionStatusArticleValue } from '@core/options';
import { differenceInCalendarDays, endOfDay, startOfDay } from 'date-fns';
import {
  clearStateCategoryChildByCode,
  getCategoryChildByCode
} from '@modules/app-config/categories-config/state/actions';
import { Observable, of } from 'rxjs';
import { selectOptionCategoryChildByCode } from '@modules/app-config/categories-config/state/selectors';
import { DateUtil } from '@core/utils/date.util';
import { DATE_TIME_SQL_FORMAT } from '@core/constants';
import { RoleUser } from '@core/enums';
import { map, takeUntil } from 'rxjs/operators';
import { ObjUtil } from '@core/utils/obj.util';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NotificationService } from '@core/services/notification.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NewsManagerServices } from '@modules/news-manager/state/service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-news-manager-list',
  templateUrl: './news-manager-list.component.html',
})
export class NewsManagerListComponent extends BaseCrudListComponent implements OnInit {

  form: FormGroup;
  items: ItemNewsResponsed[] = [];
  roleUser = RoleUser;

  optionSourceTypeArticle = OptionSourceTypeArticle;
  optionStatusArticle: OptionModel<string | number>[] = OptionStatuseArticle;
  typeArticle$: Observable<OptionModel<string | number>[]> = this.store.select(selectOptionCategoryChildByCode('NEWS'))
    // .pipe(map(list => [{label: 'Tất cả', value: ''}, ...list]));

  statusArticle = OptionStatusArticleValue;
  modalConfirmDelete: NzModalRef;

  modalConfirmSendApprove: NzModalRef;

  formValueAllowUpdatePosition = false;
  isMoveItems = false;
  loadingUpdatePosition = false;


  disabledFromDate = (current: Date): boolean =>
    this.form?.value?.endTime && differenceInCalendarDays(current, new Date(this.form?.value?.endTime)) > 0; // nếu có endTime thì disable những ngày sau end time, nếu ko có thì thôi

  disabledToDate = (current: Date): boolean =>
    differenceInCalendarDays(current, new Date(this.form?.value?.startTime)) < 0; // disable những ngày trc startTime, nếu ko có startTime thì disable những ngày trc today


  constructor(
    store: Store,
    router: Router,
    drawer: NzDrawerService,
    notification: NotificationService,
    modal: NzModalService,
    activatedRoute: ActivatedRoute,
    fb: FormBuilder,
    private newsManagerServices: NewsManagerServices
  ) {
    super(store, router, drawer, notification, modal, activatedRoute, fb);
  }


  findItemsAction = getListNews;
  selectItems = selectDataListNews;
  selectLoading = selectLoadingListNews;
  selectTotal = selectTotalListNews;

  columns: ColumnConfig[] = [
    {
      key: 'actions',
      header: 'Thao tác',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '90px',
    },
    {
      key: 'typeNews',
      header: 'Loại tin tức',
      nzWidth: '115px ',
    },
    {
      key: 'title',
      header: 'Tiêu đề tin tức',
      nzWidth: '240px',
    },
    {
      key: 'source',
      header: 'Nguồn bài viết',
      nzWidth: '90px',
      pipe: 'optionLabel',
      filter: {
        options: this.optionSourceTypeArticle
      }
    },
    {
      key: 'isHot',
      header: 'Nổi bật',
      nzWidth: '50px',
      pipe: 'template',
      tdClass: 'text-center'
    },
    {
      key: 'status',
      header: 'Trạng thái',
      nzWidth: '95px',
      pipe: 'optionLabel',
      filter: {
        options: this.optionStatusArticle
      }
    },
    {
      key: 'startTime',
      header: 'Ngày bắt đầu',
      nzWidth: '110px',
      pipe: 'date',
      tdClass: 'text-center'
    },
    {
      key: 'endTime',
      header: 'Ngày kết thúc',
      nzWidth: '110px',
      pipe: 'date',
      tdClass: 'text-center'
    },
    {
      key: 'createBy',
      header: 'Người tạo',
      nzWidth: '100px',
    },
    {
      key: 'createDate',
      header: 'Ngày tạo',
      nzWidth: '110px',
      pipe: 'date',
      tdClass: 'text-center'
    },
    {
      key: 'reason',
      header: 'Lý do từ chối',
      nzWidth: '260px',
      pipe: 'template',
    },
  ];

  ngOnInit() {
    this.buildForm();
    super.ngOnInit();

    this.store.dispatch(getCategoryChildByCode({payload: {globalCode: 'NEWS'}}));
    this.checkFormValueToEnableButtonUpdatePosition()
  }


  onSearch() {
    this.isMoveItems = false;
    this.findItems();
  }

  clearSearchForm(){
    this.form.reset();
    this.onSearch()
  }


  navigateToCreate(){
    this.router.navigate(['/news-manager/create'])
  }

  navigateToDetailEdit(item: ItemNewsResponsed){
    this.router.navigate([`/news-manager/detail/${item.id}`]);
  }

  navigateToDetailView(item: ItemNewsResponsed){
    this.router.navigate([`/news-manager/view/${item.id}`]);
  }


  openModalConfirmDelete(item: ItemNewsResponsed){
    this.modalConfirmDelete = this.modal.confirm({
      nzTitle: 'Xóa bài viết',
      nzContent: `Bạn có chắc chắn muốn xóa bài viết?`,
      nzOkText: 'OK',
      nzWrapClassName: 'modalConfirm',
      nzIconType: '',
      nzOnOk: () => this.deleteArticle(item),
    });

    return;
  }

  deleteArticle(item: ItemNewsResponsed){

    this.modalConfirmDelete.updateConfig({nzOkLoading: true});

    const payload: UpdateArticleStatusRequest = {
      id: item?.id,
      status: -1
    }
    this.newsManagerServices.updateArticleStatus(ObjUtil.deleteNullProp(payload))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res == 'Success'){ // api chỉ trả về 1 TEXT "Success" khi thành công
            this.notification.open({
              type: 'success',
              content: 'Xóa bài viết thành công'
            });
            this.modalConfirmDelete.destroy();
            this.onSearch();
          }
        },
        error: ({error}) => {
          this.notification.open({
            type: 'error',
            content: error?.message || 'Đã có lỗi khi xóa bài viết'
          });
          this.modalConfirmDelete.updateConfig({nzOkLoading: false});
        }
      });
    return false;
  }



  openModalConfirmSendApprove(item: ItemNewsResponsed){
    this.modalConfirmSendApprove = this.modal.confirm({
      nzTitle: 'Gửi duyệt bài viết',
      nzContent: `Bạn có chắc chắn muốn gửi duyệt bài viết?`,
      nzOkText: 'OK',
      nzWrapClassName: 'modalConfirm',
      nzIconType: '',
      nzOnOk: () => this.updateStatusToWaitingApprove(item),
    });

    return;
  }
  updateStatusToWaitingApprove(item: ItemNewsResponsed){

    this.modalConfirmSendApprove.updateConfig({nzOkLoading: true});

    const payload: UpdateArticleStatusRequest = {
      id: item.id,
      status: 2
    }
    this.newsManagerServices.updateArticleStatus(ObjUtil.deleteNullProp(payload))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res == 'Success'){ // api chỉ trả về 1 TEXT "Success" khi thành công
            this.notification.open({
              type: 'success',
              content: 'Bài viết đã được gửi duyệt thành công'
            });
            this.onSearch();
            this.modalConfirmSendApprove.destroy();
          }
        },
        error: ({error}) => {
          this.notification.open({
            type: 'error',
            content: error?.message || 'Đã có lỗi khi gửi duyệt bài viết'
          });
          this.modalConfirmSendApprove.updateConfig({nzOkLoading: false});
        }
      });

    return false;
  }


  getParams() {

    const formSearch = this.form.getRawValue();
    let extraParams = {};
    if (this.formValueAllowUpdatePosition){
      this.currentPageNum = 1;
      this.pagination.index = 1;
      extraParams = {getAll: 1, page: 1} // get all để có thể sắp xếp
    }
    const payloadForm = {
      ...formSearch,
      startTime: formSearch.startTime ? DateUtil.formatTimeSQL(startOfDay(new Date(formSearch.startTime)), DATE_TIME_SQL_FORMAT) : null,
      endTime: formSearch.endTime ? DateUtil.formatTimeSQL(endOfDay(new Date(formSearch.endTime)), DATE_TIME_SQL_FORMAT) : null,
    }
    return omitBy(
      {
        ...payloadForm,
        page: this.currentPageNum || this.pagination.index,
        size: this.pagination.size,
        ...this.params,
        ...extraParams,
      },
      isNil
    );
  }



  updatePositionPost(){
    const itemsList = [...this.items.reverse()];
    const itemsListPriority = itemsList.map((item: ItemNewsResponsed, index: number) => {
      return {
        id: item.id,
        priority: index + 1
      }
    });
    const payload: UpdatePositionPostRequest = {
      globalListDetailId: this.form.getRawValue().globalListDetailId,
      priorityDTOS: itemsListPriority,
    }
    this.loadingUpdatePosition = true;
    this.newsManagerServices.updatePositionPost(ObjUtil.deleteNullProp(payload))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res == 'Success'){ // api chỉ trả về 1 TEXT "Success" khi thành công
            this.notification.open({
              type: 'success',
              content: 'Cập nhật vị trí bài viết thành công'
            });
            this.onSearch();
            this.loadingUpdatePosition = false;
          }
        },
        error: ({error}) => {
          this.notification.open({
            type: 'error',
            content: error?.message || 'Đã có lỗi khi cập nhật vị trí bài viết'
          });
          this.loadingUpdatePosition = false;
        }
      });
  }

  onDragDrop(event: CdkDragDrop<any[]>): void {
    let arrDrag = [...this.items];
    if (event) {
      this.isMoveItems = true;
      moveItemInArray(arrDrag, event.previousIndex, event.currentIndex);
    } else {
      this.isMoveItems = false;
    }

    this.items = arrDrag;
  }

  checkFormValueToEnableButtonUpdatePosition(){
    this.form.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(values => {
        const formValExcludePostType = omit(values,'globalListDetailId')
        if (values.globalListDetailId && isEmpty(ObjUtil.deleteNullProp(formValExcludePostType))){
          this.formValueAllowUpdatePosition = true;
        } else {
          this.formValueAllowUpdatePosition = false;
        }
      })
  }

  buildForm() {
    this.form = this.fb.group({
      globalListDetailId: [],
      status: [],
      startTime: [],
      endTime: [],
      title: [],
    });

  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.store.dispatch(clearStateCategoryChildByCode())
  }


}

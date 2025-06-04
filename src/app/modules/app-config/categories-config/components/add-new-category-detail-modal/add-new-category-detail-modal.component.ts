import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseDestroyComponent } from '@core/components';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NotificationService } from '@core/services/notification.service';
import { ValidatorUtil } from '@core/utils/validator.util';
import { FormUtil } from '@core/utils/form.util';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  ItemCategory,
  ItemCategoryDetailList, SaveCategoryDetailValueItemRequest,
  SaveCategoryRequest
} from '@modules/app-config/categories-config/models';
import { CategoriesConfigServices } from '@modules/app-config/categories-config/state/service';
import { ObjUtil } from '@core/utils/obj.util';
import {
  NUMBER_REGEX,
  PHONE_REGEX_TO_ALLOW_INPUT,
  REGEX_USERNAME_ALLOW_INPUT,
  SPECIAL_CHARACTERS_REJECT
} from '@core/constants';

@Component({
  selector: 'app-add-new-category-detail-modal',
  templateUrl: './add-new-category-detail-modal.component.html',
})
export class AddNewCategoryDetailModalComponent extends BaseDestroyComponent implements OnInit {


  form: FormGroup;
  readonly modalData: {itemCategoryDetail: ItemCategoryDetailList, itemCategoryParent: ItemCategory} = inject(NZ_MODAL_DATA);
  isLoading = false;

  PHONE_REGEX_TO_ALLOW_INPUT = PHONE_REGEX_TO_ALLOW_INPUT;
  REGEX_USERNAME = REGEX_USERNAME_ALLOW_INPUT;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private notification: NotificationService,
    private categoriesConfigServices: CategoriesConfigServices,
  ) {
    super()
  }

  get itemCategoryDetail() {
    return this.modalData.itemCategoryDetail;
  }
  get itemCategoryParent() {
    return this.modalData.itemCategoryParent;
  }

  ngOnInit() {

    this.buildForm();

    if (this.itemCategoryDetail){
      this.getDetailCategory(this.itemCategoryDetail)
    }

  }


  getDetailCategory(item: ItemCategoryDetailList){
    this.patchValueEditUser(item);

    // đợi có api get detail thì dùng cái dưới, nếu ko có thì lấy item từ list để patch value
    // this.categoriesConfigServices.getDetailCategoryById(item.id)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (res: ItemCategory) => {
    //       this.patchValueEditUser(res);
    //     },
    //   })
  }

  patchValueEditUser(item: ItemCategoryDetailList){

    this.form.patchValue(item);
    this.form.get('code')?.disable();

  }



  submitForm(){
    FormUtil.validate(this.form);

    const formVal = this.form.getRawValue();

    const bodyRequest = {
      ...formVal,
      globalListId: this.itemCategoryParent.id,
      status: Number(formVal.status)
    }

    this.saveCategory(ObjUtil.deleteNullProp(bodyRequest))
  }

  saveCategory(data: SaveCategoryDetailValueItemRequest){
    this.isLoading = true;
    this.categoriesConfigServices.saveCategoryDetailItemValue(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.notification.open({
            type: 'success',
            content: (this.itemCategoryDetail ? 'Cập nhật thông tin giá trị danh mục thành công' : 'Tạo mới giá trị danh mục thành công')
          });
          this.modalRef.destroy(true);
        },
        error: ({error}) => {
          const errMsg = error?.message || (this.itemCategoryDetail ? 'Đã có lỗi khi cập nhật giá trị danh mục' : 'Đã có lỗi khi tạo mới giá trị danh mục');

          this.notification.open({
            type: 'error',
            content: errMsg
          });
          this.isLoading = false;
        },
      });
  }


  closeModal(){
    this.modalRef.destroy();
  }

  buildForm(){
    this.form = this.fb.group({
      id: [],
      globalListId: [],
      code: ['', [
        ValidatorUtil.required('Mã không được để trống'),
        ValidatorUtil.patternReject(SPECIAL_CHARACTERS_REJECT, 'Mã không cho phép nhập ký tự đặc biệt'),
        ValidatorUtil.maxLength(50, 'Mã không cho phép nhập quá 50 ký tự'),
      ]],
      name: ['', [
        ValidatorUtil.required('Tên không được để trống'),
        ValidatorUtil.maxLength(200, 'Tên không cho phép nhập quá 200 ký tự'),
      ]],
      value: [null, [
        ValidatorUtil.maxLength(9, 'Giá trị không cho phép nhập quá 9 ký tự'),
        ValidatorUtil.patternAllow(NUMBER_REGEX, 'Giá trị chỉ cho phép nhập số')
      ]],
      orderGlobalListDetail: [null, [
        ValidatorUtil.required('Thứ tự không được để trống'),
        ValidatorUtil.maxLength(9, 'Thứ tự không cho phép nhập quá 9 ký tự'),
        ValidatorUtil.patternAllow(NUMBER_REGEX, 'Thứ tự chỉ cho phép nhập số')
      ]],
      description: ['', ValidatorUtil.maxLength(500, 'Mô tả không cho phép nhập quá 500 ký tự')],
      status: [true],
    });
  }

}

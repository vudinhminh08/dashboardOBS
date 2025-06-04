import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseDestroyComponent } from '@core/components';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NotificationService } from '@core/services/notification.service';
import { ValidatorUtil } from '@core/utils/validator.util';
import { FormUtil } from '@core/utils/form.util';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ItemCategory, SaveCategoryRequest } from '@modules/app-config/categories-config/models';
import { CategoriesConfigServices } from '@modules/app-config/categories-config/state/service';
import { ObjUtil } from '@core/utils/obj.util';
import { REGEX_USERNAME_ALLOW_INPUT, SPECIAL_CHARACTERS_REJECT } from '@core/constants';

@Component({
  selector: 'app-add-new-categorries-config-modal',
  templateUrl: './add-new-categorries-config-modal.component.html',
})
export class AddNewCategorriesConfigModalComponent extends BaseDestroyComponent implements OnInit {


  form: FormGroup;
  readonly modalData: {itemCategory: ItemCategory} = inject(NZ_MODAL_DATA);
  isLoading = false;

  REGEX_USERNAME = REGEX_USERNAME_ALLOW_INPUT;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private notification: NotificationService,
    private categoriesConfigServices: CategoriesConfigServices,
  ) {
    super()
  }

  get itemCategory() {
    return this.modalData.itemCategory;
  }

  ngOnInit() {

    this.buildForm();

    if (this.itemCategory){
      this.getDetailCategory(this.itemCategory)
    }

  }


  getDetailCategory(item: ItemCategory){
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

  patchValueEditUser(item: ItemCategory){

    this.form.patchValue(item);
    this.form.get('code')?.disable();

  }



  submitForm(){
    FormUtil.validate(this.form);

    const formVal = this.form.getRawValue();

    const bodyRequest = {
      ...formVal,
      status: Number(formVal.status)
    }

    this.saveCategory(ObjUtil.deleteNullProp(bodyRequest))
  }

  saveCategory(data: SaveCategoryRequest){
    this.isLoading = true;
    this.categoriesConfigServices.saveCategoryItem(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.notification.open({
            type: 'success',
            content: (this.itemCategory ? 'Cập nhật thông tin danh mục thành công' : 'Tạo mới danh mục thành công')
          });
          this.modalRef.destroy(true);
        },
        error: ({error}) => {
          const errMsg = error?.message || (this.itemCategory ? 'Đã có lỗi khi cập nhật danh mục' : 'Đã có lỗi khi tạo mới danh mục');

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
      code: ['', [
        ValidatorUtil.required('Mã danh mục không được để trống'),
        ValidatorUtil.patternReject(SPECIAL_CHARACTERS_REJECT, 'Mã danh mục không cho phép nhập ký tự đặc biệt'),
        ValidatorUtil.maxLength(50, 'Mã danh mục không cho phép nhập quá 50 ký tự')
      ]],
      name: ['', [
        ValidatorUtil.required('Tên danh mục không được để trống'),
        ValidatorUtil.maxLength(200, 'Tên danh mục không cho phép nhập quá 200 ký tự')
      ]],
      description: ['', ValidatorUtil.maxLength(500, 'Mô tả không cho phép nhập quá 500 ký tự')],
      status: [true],
    });
  }
}

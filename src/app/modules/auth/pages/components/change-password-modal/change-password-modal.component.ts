import { Component, OnInit } from '@angular/core';
import { BaseDestroyComponent } from '@core/components';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NotificationService } from '@core/services/notification.service';
import { matchingValidator, notAllowMatchValidator, ValidatorUtil } from '@core/utils/validator.util';
import { FormUtil } from '@core/utils/form.util';
import { TokenStorageService } from '@modules/auth/service/token-storage.service';
import { AuthLoginService } from '@modules/auth/service/auth.service';
import { takeUntil } from 'rxjs/operators';
import { REGEX_VALIDATE_PASSWORD } from '@core/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
})
export class ChangePasswordModalComponent extends BaseDestroyComponent implements OnInit {


  form: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private notification: NotificationService,
    private tokenStorage: TokenStorageService,
    private authLoginService: AuthLoginService,
    private router: Router,
  ) {
    super()
  }
  ngOnInit() {
    this.buildForm();

    const user = this.tokenStorage.getUser();
    this.form.patchValue(user)

  }

  submitForm(){
    FormUtil.validate(this.form);
    const formVal = this.form.getRawValue();

    const body = {
      userName: formVal.userName,
      password: formVal.password,
      oldPassword: formVal.oldPassword,
    }

    this.authLoginService.changePassword(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          if (res == 'Success'){ // api chỉ trả về 1 TEXT "Success" khi thành công
            this.notification.open({
              type: 'success',
              content: "Thay đổi mật khẩu tài khoản thành công"
            });
            this.tokenStorage.signOut();
            this.router.navigate(['/auth/login']);
            this.modalRef.destroy();
          }

        },
        error: (error) => {
          const err = JSON.parse(error.error);
          this.notification.open({
            type: 'error',
            title: 'Thất bại',
            content: err?.message || "Đã có lỗi khi đổi mật khẩu"
          });

          if (error?.status == 401){
            this.modalRef.destroy();
          }
        }
      })

  }


  buildForm(){
    this.form = this.fb.group({
      userName: [{value: null, disabled: true}],
      fullName: [{value: null, disabled: true}],
      phoneNumber: [{value: null, disabled: true}],
      email: [{value: null, disabled: true}],
      oldPassword: ['', [ValidatorUtil.required('Mật khẩu cũ không được để trống')]],
      password: ['', [
        ValidatorUtil.required('Mật khẩu không được để trống'),
        ValidatorUtil.patternAllow(REGEX_VALIDATE_PASSWORD, 'Mật khẩu không được chứa kí tự có dấu và dấu cách'),
        ValidatorUtil.maxLength(20, 'Mật khẩu cho phép nhập 6 - 20 ký tự'),
        ValidatorUtil.minLength(6, 'Mật khẩu cho phép nhập 6 - 20 ký tự'),
      ]],
      confirmPassword: ['', ValidatorUtil.required('Xác nhận mật khẩu không được để trống')],
    }, {validators: [
        matchingValidator('password', 'confirmPassword'),
        notAllowMatchValidator('oldPassword', 'password', 'Mật khẩu mới không được trùng mật khẩu cũ')
      ]});
  }


  closeModal(){
    this.modalRef.destroy();
  }

}

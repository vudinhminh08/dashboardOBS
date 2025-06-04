import { Component, OnInit } from '@angular/core';
import { BaseDestroyComponent } from '@core/components';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { matchingValidator, ValidatorUtil } from '@core/utils/validator.util';
import { TokenStorageService } from '@modules/auth/service/token-storage.service';

@Component({
  selector: 'app-user-info-modal',
  templateUrl: './user-info-modal.component.html',
})
export class UserInfoModalComponent extends BaseDestroyComponent implements OnInit {


  form: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private tokenStorage: TokenStorageService,
  ) {
    super()
  }
  ngOnInit() {
    this.buildForm();

    const user = this.tokenStorage.getUser();
    this.form.patchValue(user)

  }


  buildForm(){
    this.form = this.fb.group({
      userName: [{value: null, disabled: true}],
      fullName: [{value: null, disabled: true}],
      phoneNumber: [{value: null, disabled: true}],
      email: [{value: null, disabled: true}],
      oldPassword: ['', ValidatorUtil.required()],
      password: ['', ValidatorUtil.required()],
      confirmPassword: ['', ValidatorUtil.required()],
    }, {validators: matchingValidator('password', 'confirmPassword')});
  }


  closeModal(){
    this.modalRef.destroy();
  }

}

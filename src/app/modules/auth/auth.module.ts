import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthRouting } from '@modules/auth/auth.routing';
import { LoginComponent } from '@modules/auth/pages/login/login.component';
import { UserInfoModalComponent } from '@modules/auth/pages/components/user-info-modal/user-info-modal.component';
import { AuthLoginService } from '@modules/auth/service/auth.service';
import { TokenStorageService } from '@modules/auth/service/token-storage.service';
import { AuthService } from '@core/services';
import {
  ChangePasswordModalComponent
} from '@modules/auth/pages/components/change-password-modal/change-password-modal.component';



const components = [
  LoginComponent,
  UserInfoModalComponent,
  ChangePasswordModalComponent,
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    AuthRouting,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthLoginService,
    AuthService,
  ]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthRouting } from '@modules/auth/auth.routing';
import { AuthLoginService } from '@modules/auth/service/auth.service';
import { AuthService } from '@core/services';
@NgModule({
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

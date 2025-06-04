import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigRouting } from '@modules/app-config/app-config-routing.routing';
import { CategoriesConfigModule } from '@modules/app-config/categories-config/categories-config.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AppConfigRouting,
    CategoriesConfigModule,
  ]
})
export class AppConfigModule { }

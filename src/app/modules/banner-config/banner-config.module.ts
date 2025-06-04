import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { BannerConfigFormComponent } from './components/banner-config-form/banner-config-form.component';
import { BannerConfigListComponent } from './pages/banner-config-list/banner-config-list.component';
import { BannerConfigStateModule } from './banner-config-state.module';
import { BannerConfigRoute } from './banner-config.routing';
import { ServiceConfigStateModule } from '@modules/service-configuration/service-config/service-config-state.module';



@NgModule({
  declarations: [BannerConfigFormComponent, BannerConfigListComponent],
  imports: [
    CommonModule,
    SharedModule,
    BannerConfigStateModule,
    BannerConfigRoute,
    ServiceConfigStateModule,

  ]
})
export class BannerConfigModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceConfigFormComponent } from './components/service-config-form/service-config-form.component';
import { ServiceConfigModalComponent } from './components/service-config-modal/service-config-modal.component';
import { ServiceConfigComponent } from './pages/service-config/service-config.component';
import { SharedModule } from '@shared/shared.module';
import { ServiceConfigStateModule } from './service-config-state.module';
import { ServiceConfigRoute } from './service-config.routing';
import {  ServiceConfigCreateFormComponent } from './components/service-config-create-form/service-config-create-form.component';
import { ServiceConfigCreateComponent } from './pages/service-config/service-config-create/service-config-create.component';
import { ServiceConfigUpdateFormComponent } from './components/service-config-update-form/service-config-update-form.component';
import { ConfigFeildStateModule } from '../config-field/config-field-state.module';




@NgModule({
  declarations: [
    ServiceConfigFormComponent,
    ServiceConfigModalComponent,
    ServiceConfigComponent,
    ServiceConfigCreateFormComponent,
    ServiceConfigUpdateFormComponent,
    ServiceConfigCreateComponent,
  ],
  imports: [
    ServiceConfigStateModule,
      CommonModule,
      SharedModule,
      ServiceConfigRoute,
      ConfigFeildStateModule,

  ]
})
export class ServiceConfigModule { }

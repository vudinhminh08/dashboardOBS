import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainServiceConfigurationStateModule } from './main-service-configuration-state.module';
import { SharedModule } from '@shared/shared.module';
import { MainServiceConfigurationComponent } from './pages/main-service-configuration/main-service-configuration.component';
import { MainServiceConfigurationFormComponent } from './components/main-service-configuration-form/main-service-configuration-form.component';
import { MainServiceConfigurationModalComponent } from './components/main-service-configuration-modal/main-service-configuration-modal.component';
import { MainServiceConfigurationRoute } from './main-service-configuration.routing';


@NgModule({
  imports: [
    MainServiceConfigurationStateModule,
      CommonModule,
      SharedModule,
      MainServiceConfigurationRoute,
  ],
  declarations: [MainServiceConfigurationComponent,
    MainServiceConfigurationFormComponent,
    MainServiceConfigurationModalComponent]
})
export class MainServiceConfigurationModule { }

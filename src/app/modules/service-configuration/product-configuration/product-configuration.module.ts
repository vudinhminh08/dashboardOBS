import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ProductConfigurationRoute } from './product-configuration.routing';
import { ProductConfigurationStateModule } from './product-configuration-state.module';
import { ProductConfigurationModalComponent } from './components/product-configuration-modal/product-configuration-modal.component';
import { ProductConfigurationFormComponent } from './components/product-configuration-form/product-configuration-form.component';
import { ProductConfigurationComponent } from './pages/product-configuration/product-configuration.component';



@NgModule({
  declarations: [ProductConfigurationModalComponent,
    ProductConfigurationFormComponent,
    ProductConfigurationComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductConfigurationRoute,
    ProductConfigurationStateModule
  ]
})
export class ProductConfigurationModule { }

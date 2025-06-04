import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesConfigComponent } from '@modules/app-config/categories-config/pages/categories-config.component';
import { AppConfigListComponent } from '@modules/app-config/categories-config/components/app-config-list/app-config-list.component';
import { AppConfigDetailsComponent } from '@modules/app-config/categories-config/components/app-config-details/app-config-details.component';
import { SharedModule } from '@shared/shared.module';
import { CategoriesConfigRouting } from '@modules/app-config/categories-config/categories-config-routing.routing';
import {
  CategoriesConfigStoreModule
} from '@modules/app-config/categories-config/state/categories-config-store.module';
import {
  AddNewCategoryDetailModalComponent
} from '@modules/app-config/categories-config/components/add-new-category-detail-modal/add-new-category-detail-modal.component';
import {
  AddNewCategorriesConfigModalComponent
} from '@modules/app-config/categories-config/components/add-new-categorries-config-modal/add-new-categorries-config-modal.component';



@NgModule({
  declarations: [
    CategoriesConfigComponent,
    AppConfigListComponent,
    AppConfigDetailsComponent,
    AddNewCategoryDetailModalComponent,
    AddNewCategorriesConfigModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoriesConfigRouting,
    CategoriesConfigStoreModule,
  ]
})
export class CategoriesConfigModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { NewsFormComponent } from '@modules/news-manager/components/news-form/news-form.component';
import { NewsManagerListComponent } from '@modules/news-manager/pages/news-manager-list/news-manager-list.component';
import { CreateNewsComponent } from '@modules/news-manager/pages/create-news/create-news.component';
import { NewsManagerRouting } from '@modules/news-manager/news-manager.routing';
import { NewsManagerStoreModule } from '@modules/news-manager/state/news-manager-store.module';
import { QuillEditorComponent } from 'ngx-quill';
import { CategoriesConfigServices } from '@modules/app-config/categories-config/state/service';
import {
  CategoriesConfigStoreModule
} from '@modules/app-config/categories-config/state/categories-config-store.module';
import {
  NewsManagerDetailComponent
} from '@modules/news-manager/pages/news-manager-detail/news-manager-detail.component';
import {
  NewsManagerDetailOnlyViewComponent
} from '@modules/news-manager/pages/news-manager-detail-only-view/news-manager-detail-only-view.component';


const components = [
  NewsManagerListComponent,
  CreateNewsComponent,
  NewsFormComponent,
  NewsManagerDetailComponent,
  NewsManagerDetailOnlyViewComponent,
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    SharedModule,
    NewsManagerRouting,
    NewsManagerStoreModule,
    CategoriesConfigStoreModule,
    QuillEditorComponent,
  ],
  providers: [
    CategoriesConfigServices
  ]
})
export class NewsManagerModule { }

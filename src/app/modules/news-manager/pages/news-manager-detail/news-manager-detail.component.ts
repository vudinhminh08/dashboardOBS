import { Component, OnInit } from '@angular/core';
import { BaseDestroyComponent } from '@core/components';
import { Store } from '@ngrx/store';
import { NotificationService } from '@core/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-news-manager-detail',
  templateUrl: './news-manager-detail.component.html',
})
export class NewsManagerDetailComponent extends BaseDestroyComponent implements OnInit{

  articleId: string;

  constructor(
    private router: Router,
    private store: Store,
    private notification: NotificationService,
    protected activedRoute: ActivatedRoute,
    private location: Location
  ) {
    super();
  }


  ngOnInit() {

    this.activedRoute.params.subscribe((params) => {
      this.articleId = params.articleId;
    });


  }


}

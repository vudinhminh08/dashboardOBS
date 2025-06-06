import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient } from '@angular/common/http';
import { BaseDestroyComponent } from '@core/components';

@Component({
  selector: 'app-main-service-configuration-form',
  templateUrl: './main-service-configuration-form.component.html',
  styleUrls: ['./main-service-configuration-form.component.scss'],
})
export class MainServiceConfigurationFormComponent extends BaseDestroyComponent implements OnInit {
  constructor(
    protected modal: NzModalService,
    private http: HttpClient
  ) {
    super();
  }

  sampleData: any[] = [];
  isLoading = false;

  async generateSampleData(): Promise<void> {
    this.isLoading = true;
    try {
      const response = await this.http
        .get<any[]>('http://localhost:3000/api/data')
        .toPromise();
      this.sampleData = response || [];
    } catch (err) {
      console.error('Failed to fetch sample data:', err);
    } finally {
      this.isLoading = false;
    }
  }

  async ngOnInit() {
    await this.generateSampleData();
    console.log('Sample data generated:', this.sampleData);
  }
}
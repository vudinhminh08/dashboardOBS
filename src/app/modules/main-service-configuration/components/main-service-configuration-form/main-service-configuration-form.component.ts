import { Component, OnInit, TrackByFunction } from '@angular/core';
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

  isModalVisible = false;
  modalColumns = [
    { key: 'code', title: 'Mã dịch vụ' },
    { key: 'name', title: 'Tên dịch vụ' },
    { key: 'description', title: 'Mô tả' },
    { key: 'createdBy', title: 'Người tạo' },
    { key: 'createdAt', title: 'Thời điểm tạo' },
    { key: 'status', title: 'Trạng thái' },
  ];

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

  trackByIndex: TrackByFunction<any> = (index: number, item: any) => {
    return item.id || index; // Sử dụng id duy nhất nếu có
  };

  openAddModal(): void {
    this.isModalVisible = true;
  }

  handleModalSend(data: any[]): void {
    // Handle the data sent from modal here
    this.isModalVisible = false;
  }

  handleModalClose(): void {
    this.isModalVisible = false;
  }
}
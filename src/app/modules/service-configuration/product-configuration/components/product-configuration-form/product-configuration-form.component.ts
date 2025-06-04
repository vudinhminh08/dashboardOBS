import { Component, OnInit } from '@angular/core';
import { ProductConfigurationModalComponent } from '../product-configuration-modal/product-configuration-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ColumnConfig, OptionModel } from '@core/models';

@Component({
  selector: 'app-product-configuration-form',
  templateUrl: './product-configuration-form.component.html',
  styleUrls: ['./product-configuration-form.component.scss']
})
export class ProductConfigurationFormComponent implements OnInit {
  constructor(private fb: FormBuilder, protected modal: NzModalService){}
  selectedKeys: string[] = [];
  isDisable: boolean = false
  columns: ColumnConfig[] = [
    {
      key: 'code',
      header: 'Mã lĩnh vực',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '90px',
    },
    {
      key: 'name',
      header: 'Tên lĩnh vực',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '90px',
    },
    {
      key: 'description',
      header: 'Mô tả',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '90px',
    },
    {
      key: 'status',
      header: 'Trạng thái',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '90px',
    },
    {
      key: 'actions',
      header: 'Thao tác',
      tdClass: 'text-center',
      pipe: 'template',
      nzWidth: '90px',
    }]
    data = [
      { name: 'Tony', code: 1, status: true, description: 'mo ta' },
      { name: 'Tony', code: 12, status: true, description: 'mo ta' },
    ];
    optionStatus: OptionModel<any>[] = [
      { label: 'Có hiệu lực', value: 1 },
      { label: 'Vô hiệu lực', value: 0 },
    ];
  form: FormGroup
  ngOnInit() {
    this.buildForm()
  }
buildForm(){
  this.form = this.fb.group({
    code: [null],
    name: [],
    status:[]
  })
}
  onSearch(){}



  onSelectKeysChange(keys: string[]){
    this.selectedKeys = keys
  }

openModalService(){
  const medicalTestModal = this.modal.create({
    nzContent: ProductConfigurationModalComponent,
    nzTitle: 'THÊM MỚI DỊCH VỤ',
    nzFooter: null,
    nzWidth: 1000,
    nzData: {
   
    },
    nzClassName: 'modal-medicine-adr'
  });
  medicalTestModal.afterClose.subscribe((res) => {
    if (res) {
   
    }
  });
}
  onDeleteItem(item: any){

  }

  onEditItem(item: any){
    const medicalTestModal = this.modal.create({
      nzContent: ProductConfigurationModalComponent,
      nzTitle: 'CHỈNH SỬA DỊCH VỤ',
      nzFooter: null,
      nzWidth: 1000,
      nzData: {
     data: item
      },
      nzClassName: 'modal-medicine-adr'
    });
    medicalTestModal.afterClose.subscribe((res) => {
      if (res) {
     
      }
    });
  }

}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-configuration-modal',
  templateUrl: './product-configuration-modal.component.html',
  styleUrls: ['./product-configuration-modal.component.scss']
})
export class ProductConfigurationModalComponent implements OnInit {
  constructor(private fb: FormBuilder,private modalRef: NzModalRef ) { }
form: FormGroup
loading$: Observable<boolean>;
data: any
ngOnInit() {
  this.buildForm()
  if(this.data){
    this.form.patchValue(this.data)
  }

  
}
buildForm(){
  this.form = this.fb.group({
    code: [null],
    name: [],
    status:[],
    description: [],
    priority: [],
    isActive: true
  })
}
save(){}
cancel(){
  this.modalRef.destroy();
}

onSwitchChange(value: boolean){
  this.form.controls['isActive'].patchValue(!value)
}

}


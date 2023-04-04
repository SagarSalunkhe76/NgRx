import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EMP } from '../Model/emp.model';
import { ApiService } from '../service/api.service';
import { DataTransferService } from '../service/data-transfer.service';
import { addEmp } from '../Store/Actions/Employee.action';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  @Output() cancelForm = new EventEmitter();
  @Input() editEmp: EMP;

  operationType: string = 'ADD';
  empEditId: number;

  emailRegx =
    /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dataTransfer: DataTransferService,
    private store: Store<EMP>
  ) {}

  empForm: FormGroup = this.formBuilder.group({
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
  });

  ngOnInit(): void {}

  ngOnChanges() {
    console.log('FORM VALUE this.editEmp', this.editEmp);
    if (this.editEmp) {
      this.operationType = 'UPDATE';
      this.empEditId = this.editEmp.id;
      this.empForm.controls.first_name.setValue(this.editEmp.first_name);
      this.empForm.controls.last_name.setValue(this.editEmp.last_name);
      this.empForm.controls.email.setValue(this.editEmp.email);
    }
  }

  submit() {
    if (!this.empForm.valid) {
      return;
    }
    console.log('FORM VALUE', this.empForm.value);
    if (this.operationType === 'ADD') {
      this.store.dispatch(addEmp(this.empForm.value));
      this.dataTransfer.send({ dataUpdated: true });
    } else {
      this.empForm.value['id'] = this.empEditId;
      this.apiService.editEmp(this.empForm.value).subscribe((resp) => {
        console.log('editEmp resp', resp);
        this.dataTransfer.update({ dataUpdated: true });
      });
    }
    this.clearForm();
  }

  clearForm() {
    this.empForm.get('email').reset();
    this.empForm.reset();
  }

  cancel() {
    console.log('cancel called');
    this.cancelForm.emit(false);
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { EMP } from '../Model/emp.model';
import { DataTransferService } from '../service/data-transfer.service';
import { select, Store } from '@ngrx/store';
import { delEmp, getEmp } from '../Store/Actions/Employee.action';
import { EmpState } from '../Store/Reducers/Employee.reducers';
import { empSelector } from '../Store/Selector/Employee.selector';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private dataTransfer: DataTransferService,
    private store: Store<EmpState>
  ) {}

  formStatus: boolean = false;
  editEmp: EMP;

  empList$ = this.store.pipe(select(empSelector));

  ngOnInit(): void {
    this.loadAllEmpDetails();
    console.log('empList$', this.empList$);
    this.dataTransfer.empInfo.subscribe((data) => {
      if (data.dataUpdated) {
        this.loadAllEmpDetails();
        this.formStatus = false;
      }
    });

    this.dataTransfer.empUpdateInfo.subscribe((data) => {
      if (data.dataUpdated) {
        this.loadAllEmpDetails();
        this.formStatus = false;
      }
    });
  }

  loadAllEmpDetails() {
    this.store.dispatch(getEmp());
    console.log('loadAllEmpDetails ');
  }

  delete(id) {
    console.log(id);
    this.store.dispatch(delEmp(id));
    this.loadAllEmpDetails();
    // this.apiService.deleteEmp(id).subscribe(A(resp: EMP) => {
    //   console.log('resp', resp);
    //   this.loadAllEmpDetails();
    // });
  }

  edit(emp) {
    console.log('edit emp', emp);
    this.formStatus = true;
    this.editEmp = emp;
  }

  addClick(flag) {
    this.formStatus = flag;
    this.editEmp = undefined;
  }
}

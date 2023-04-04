import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { EMPTY, EmptyError } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { EMP } from 'src/app/Model/emp.model';
import { ApiService } from 'src/app/service/api.service';
import {
  addEmp,
  addEmpSuccess,
  delEmp,
  delEmpSuccess,
  getEmp,
  getEmpSuccess,
} from '../Actions/Employee.action';

@Injectable()
export class EmployeeEffects {
  loadEmployee$ = createEffect(() =>
    this.action$.pipe(
      ofType(getEmp),
      exhaustMap(() =>
        this.api.getEmp().pipe(
          map((emp: any) => getEmpSuccess({ emp })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addEmployee$ = createEffect(() =>
    this.action$.pipe(
      ofType(addEmp),
      concatMap((newemp) =>
        this.api.addEmp(newemp).pipe(
          map((emp: any) => addEmpSuccess({ emp })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  delEmployee$ = createEffect(() =>
    this.action$.pipe(
      ofType(delEmp),
      mergeMap(({ empId }) =>
        this.api.deleteEmp(empId).pipe(
          tap((emp) => {
            console.log('>>>>>>', emp);
          }),
          map((emp: any) => delEmpSuccess({ emp })),

          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private action$: Actions, private api: ApiService) {}
}

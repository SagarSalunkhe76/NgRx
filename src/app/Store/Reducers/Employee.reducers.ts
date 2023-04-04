import { createReducer, on } from '@ngrx/store';
import { EMP } from 'src/app/Model/emp.model';
import {
  addEmpSuccess,
  delEmpSuccess,
  getEmp,
  getEmpSuccess,
} from '../Actions/Employee.action';

export interface EmpState {
  emp: ReadonlyArray<EMP>;
}

const initialState: ReadonlyArray<EMP> = [];

export const empReducer = createReducer(
  initialState,
  on(getEmpSuccess, (state, { emp }) => [...emp]),
  on(addEmpSuccess, (state, { emp }) => [...state, emp]),
  on(delEmpSuccess, (state, { emp }) => [...state])
);

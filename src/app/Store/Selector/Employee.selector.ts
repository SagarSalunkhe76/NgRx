import { createSelector } from '@ngrx/store';
import { EMP } from 'src/app/Model/emp.model';
import { EmpState } from '../Reducers/Employee.reducers';

export const empSelector = createSelector(
  (state: EmpState) => state.emp,
  (emp: ReadonlyArray<EMP>) => emp
);

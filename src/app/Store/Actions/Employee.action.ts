import { createAction, props } from '@ngrx/store';
import { EMP } from 'src/app/Model/emp.model';

export const getEmp = createAction('[EMP] GET EMP');
export const getEmpSuccess = createAction(
  '[EMP] GET EMP SUCCESS',
  props<{ emp: ReadonlyArray<EMP> }>()
);

export const addEmp = createAction('[EMP] ADD EMP', props<{ emp: EMP }>());
export const addEmpSuccess = createAction(
  '[EMP] ADD EMP SUCCESS',
  props<{ emp: EMP }>()
);

export const delEmp = createAction(
  '[EMP] DEL EMP',
  (empId: number) => ({ empId })
);
export const delEmpSuccess = createAction(
  '[EMP] DEL EMP SUCCESS',
  props<{ emp: EMP }>()
);

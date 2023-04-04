import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EMP } from '../Model/emp.model';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'http://localhost:3100/';

  constructor(private http: HttpClient) {}

  getEmp(): Observable<EMP> {
    return this.http.get<EMP>(this.baseUrl + 'employees').pipe(
      tap((success: any) => console.log('getEmp : API success !', success)),
      catchError((error): any => console.error('getEmp : API Failed !', error))
    );
  }

  addEmp(emp): Observable<EMP> {
    return this.http.post<EMP>(this.baseUrl + 'employees', emp).pipe(
      tap((success: any) => console.log('addEmp : API success !', success)),
      catchError((error): any => console.error('addEmp : API Failed !', error))
    );
  }

  deleteEmp(id) {
    console.log("deleteEmp =>",id);
    return this.http.delete(this.baseUrl + 'employees/' + id).pipe(
      tap((success: any) => console.log('deleteEmp : API success !', success)),
      catchError((error): any =>
        console.error('deleteEmp : API Failed !', error)
      )
    );
  }

  editEmp(update: EMP) {
    return this.http.put(this.baseUrl + 'employees/' + update.id, update).pipe(
      tap((success: any) => console.log('editEmp : API success !', success)),
      catchError((error): any => console.error('editEmp : API Failed !', error))
    );
  }
}

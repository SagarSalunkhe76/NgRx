import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  private empData$ = new BehaviorSubject<any>('');
  empInfo = this.empData$.asObservable();

  private empUpdateData$ = new BehaviorSubject<any>('');
  empUpdateInfo = this.empUpdateData$.asObservable();

  constructor() {}

  send(empData: any) {
    this.empData$.next(empData);
  }

  update(empUpdateData: any) {
    this.empUpdateData$.next(empUpdateData);
  }
}

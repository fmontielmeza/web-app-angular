import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private tutenUser: any;

  setTutenUser(tutenUser: any): void {
    if (tutenUser) {
      this.tutenUser = JSON.stringify(tutenUser);
      localStorage.setItem('tutenUser', this.tutenUser);
    }
  }

  getTutenUser(): any {
     this.tutenUser = localStorage.getItem('tutenUser');
     return this.tutenUser ? JSON.parse(this.tutenUser) : null;
  }
}

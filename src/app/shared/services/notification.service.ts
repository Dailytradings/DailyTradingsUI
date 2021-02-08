import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as swalFunctions from '../data/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public functions =  swalFunctions;
  constructor() { }

  confirmAlert(object, func) {
   this.functions.confirmAlert(object, func);
  }

  
  processNotification(object) {
    this.functions.processNotification(object);
   }
}



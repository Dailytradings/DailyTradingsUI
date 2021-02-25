import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AlertObject } from '../data/alertData';
import * as swalFunctions from '../data/notifications';
import { BroadcastingService } from './broadcasting.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public functions = swalFunctions;
  constructor(@Inject(PLATFORM_ID) private _platformId: Object,public router: Router, public http: HttpClient, public broadcastingService: BroadcastingService) { }

  confirmAlert(object, func) {
    this.functions.confirmAlert(object, func);
  }


  processNotification(object) {
    this.functions.processNotification(object);
  }

  processNotificationWithButton(object, func) {
    this.functions.processNotificationWithButton(object, func);
  }

  warnNotAllowed() {
    let authService = new AuthService(this._platformId, this.router, this.http, this ,this.broadcastingService); 
    let login = authService.isAuthenticated();
    let alertObject: AlertObject;

    if (login) {
      alertObject = { title: "You don't have a right to use that option.", confirmButtonText: 'Update Plan', cancelButtonDisable: true, icon: 'error' };
    } else {
      alertObject = { title: "You don't have a right to use that option.", confirmButtonText: 'Login', cancelButtonText: 'Register', icon: 'error',
      confirmButton: 'mr-5', cancelButton: 'ml-5' };
    }
    this.functions.processNotificationWithButton(alertObject, (result) => {
      if (result != null) {
        if (result) {
          if (login)
            this.router.navigate(['/pages/login']);
          else
            this.router.navigate(['/pages/login']);
        } else {
          this.router.navigate(['/pages/register']);
        }
      }
    });
  }
}



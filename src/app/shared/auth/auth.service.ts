import { Router } from '@angular/router';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertObject } from '../data/alertData';
import { NotificationService } from '../services/notification.service';
import { BroadcastingService } from '../services/broadcasting.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthService {

  public constructor(@Inject(PLATFORM_ID) private _platformId: Object,public router: Router, public http: HttpClient, public notificationService: NotificationService, public broadcastingService: BroadcastingService) {

  }

  

  getAllUsers() {
    return this.http.get(environment.baseUrl + "/users/GetAllUsers")
      .pipe(
        map((response: any) => this.checkResponse(response))
      );
  }

  getAllUserTypes() {
    return this.http.get(environment.baseUrl + "/users/GetAllUserTypes")
      .pipe(
        map((response: any) => this.checkResponse(response))
      );
  }

  getUserById(userId) {
    return this.http.get(environment.baseUrl + "/users/GetUserById/" + userId)
      .pipe(
        map((response: any) => this.checkResponse(response))
      );
  }

  getPages() {
    return this.http.get(environment.baseUrl + "/users/GetPages")
      .pipe(
        map((response: any) => this.checkResponse(response))
      );
  }

  checkProcessGuid(userId, processGuid: any) {
    return this.http.get(environment.baseUrl + "/users/CheckProcessGuid/" + userId + "/" + processGuid)
      .pipe(
        map((response: any) => this.checkResponse(response))
      );
  }

  signupUser(user: any) {
    return this.http.post(environment.baseUrl + "/users/Register", this.createRequest(user))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }
  activateUser(userId, userGuid) {
    return this.http.get(environment.baseUrl + "/users/Activation/" + userId + "/" + userGuid)
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }
  forgotPass(email: any) {
    console.log(email);
    return this.http.get(environment.baseUrl + "/users/ForgotPassword/" + email)
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }
  reUsername(user: any) {
    return this.http.post(environment.baseUrl + "/users/ReUsername", this.createRequest(user))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  reFullName(user: any) {
    return this.http.post(environment.baseUrl + "/users/ReFullName", this.createRequest(user))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  rePassword(user: any) {
    return this.http.post(environment.baseUrl + "/users/RePassword", this.createRequest(user))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  reMail(user: any) {
    return this.http.post(environment.baseUrl + "/users/ReMail", this.createRequest(user))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  signinUser(username: string, password: string) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/users/Login", { username: username, password: password })
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }


  reRankProfile(userId, userTypeId) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/users/ReRankProfile", this.createRequest({ id: userId, userTypeId: userTypeId }))
      .pipe(
        map((response: any) => this.checkResponse(response))
      );
  }

  updateCacheUser(newUser, authorizeCheckPage = "") {
    var user = this.getUser();
    if (user.user.id == newUser.id) {
      this.getPagePermission(newUser).subscribe(pageRes => {
        if (pageRes) {
          this.getPropPermission(newUser).subscribe(propRes => {
            if (propRes) {
              localStorage.setItem("user", JSON.stringify({ user: newUser, pagePermission: pageRes, propPermission: propRes }));
              let alertObject: AlertObject = { title: "İşlem Başarılı", icon: 'success' };
              this.notificationService.processNotification(alertObject);
              setTimeout(() => {
                this.isPageAuthorized(authorizeCheckPage);
              }, 3000);
            }
          });
        }
      });
    } else {
      let alertObject: AlertObject = { title: "İşlem Başarılı", icon: 'success' };
      this.notificationService.processNotification(alertObject);
    }
  }

  reExpireDate(userId, stringdate) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/users/ReExpireDate", this.createRequest({ id: userId, expireDateText: stringdate }))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  getPagePermission(user = null) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/users/GetPagePermission", this.createRequest(null, user))
      .pipe(
        map((response: any) => this.checkResponse(response))
      );
  }
  getPropPermission(user = null) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/users/GetPropertyPermission", this.createRequest(null, user))
      .pipe(
        map((response: any) => this.checkResponse(response))
      );
  }

  logout() {
    localStorage.removeItem("user");
    let alertObject: AlertObject = { title: 'İşlem Başarılı.', icon: 'success' };
    this.notificationService.processNotification(alertObject);
    this.router.navigate(['']);
    this.broadcastingService.emitLogOut();
  }

  isAuthenticatedGuard(keyword = null) {
    var user = this.getUser();
    if (user != undefined) {
      if (keyword != null) {
        var data = user.pagePermission.find(x => x.permissionName == keyword);
        console.log('data', data);
        if (data == undefined)
          this.warning();
        return false;
      }
      return true;
    } else {
      this.warning();
      return false;
    }
  }


  isAuthenticated(keyword = null) {
    var user = this.getUser();
    if (user != undefined) {
      if (keyword != null) {
        var data = user.pagePermission.find(x => x.permissionName == keyword);
        console.log('data', data);
        if (data == undefined)
          return false;
      }
      return true;
    } else {
      return false;
    }
  }

  warning() {
    let alertObject: AlertObject = { title: "You don't have a right to enter that page.", confirmButtonText: 'Login', cancelButtonText: 'Register', icon: 'error', confirmButton: 'mr-5', cancelButton: 'ml-5' };
    this.notificationService.processNotificationWithButton(alertObject, (result) => {
        if(result != null) {
          if(result) {
            this.router.navigate(['/pages/login']);
          } else {
            this.router.navigate(['/pages/register']);
          }
        }
    });
    this.router.navigate(['']);
  }

  isPageAuthorized(keyword) {
   if(isPlatformBrowser(this._platformId)) {
    let user = this.getUser();
    if (user != undefined) {
      console.log('permissions : ', user.pagePermission);
      let isForbidden = (user.pagePermission.find(x => x.permissionName == keyword) == null)
      if (isForbidden) {
        this.warning();
        return false;
      }
    }
    return true;
   }
  }

  isSawAuthorized(keyword) {
    var user = this.getUser();
    if (user != undefined) {
      if (keyword != null) {
        if (user.propPermission.find(x => x.permissionName == keyword) == null)
          return false;
      }
      return true;
    } else
      return false;
  }

  isCreateAuthorized(keyword) {
    var user = this.getUser();
    if (user != undefined) {
      if (keyword != null) {
        if (user.propPermission.find(x => x.permissionName == keyword) == null)
          return false;
      }
      return true;
    } else
      return false;
  }

  isEditAuthorized(keyword) {
    var user = this.getUser();
    if (user != undefined) {
      if (keyword != null) {
        if (user.propPermission.find(x => x.permissionName == keyword) == null)
          return false;
      }
      return true;
    } else
      return false;
  }

  isDeleteAuthorized(keyword) {
    var user = this.getUser();
    if (user != undefined) {
      if (keyword != null) {
        if (user.propPermission.find(x => x.permissionName == keyword) == null)
          return false;
      }
      return true;
    } else
      return false;
  }

  getUser(): any {
    let data = JSON.parse(localStorage.getItem("user"));
    if (data != undefined)
      return data;
  }


  // kullanımı : {headers: this.getHeader()}
  getHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getUser().token}`
    });
  }

  checkResponse(response, alertEnabled = false): any {
    if (response.success) {
      if (alertEnabled) {
        let alertObject: AlertObject = { title: response.message, icon: 'success' };
        this.notificationService.processNotification(alertObject);
      }
      return response.data;
    }
    else {
      if (alertEnabled) {
        let alertObject: AlertObject = { title: response.message, icon: 'error' };
        this.notificationService.processNotification(alertObject);
      }
      console.error(response.message);
      return null;
    }
  }

  createRequest(data = null, user = null): any {
    if (user == null) {
      let userData = this.getUser();
      if (userData != null)
        user = userData.user;
    }
    let requestObject = { data: data, user: user };
    return requestObject;
  }

}

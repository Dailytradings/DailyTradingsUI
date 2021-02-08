import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { environment } from '../../../environments/environment';
import { AlertObject } from '../data/alertData';
import { NotificationService } from '../services/notification.service';
import { AuthService } from 'app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private baseHubConnection: signalR.HubConnection
  private thenableBaseHub: Promise<void>

  constructor( public notificationService: NotificationService, private authService: AuthService) { 
    this.configureHubConnections();
  }


  public configureHubConnections() {
    this.baseHubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.baseUrl + '/basehub')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  public startBaseHubConnection = () => {
    Object.defineProperty(WebSocket, 'OPEN', { value: 1, }); 
    this.thenableBaseHub = this.baseHubConnection.start();
    this.thenableBaseHub
      .then(() => {
        if(this.authService.isAuthenticated()) {
          this.Login(this.authService.getUser().user.id);
          console.log('Started connection Base')
        }
      })
      .catch(err => console.log('Error while establishing connection Base :('));
  }


  public Login = (data) => {
    this.thenableBaseHub.then(() => {
      this.baseHubConnection.invoke('login', this.createRequest(data))
        .catch(err => console.error(err));
    });
  }
  public LoginListener = () => {
    this.thenableBaseHub.then(() => {
      this.baseHubConnection.on('login', (data) => {
        data = this.checkResponse(data, true);
        console.log(data);
      });
    });
  }

  
  public EarningsOfferListener = () => {
    this.thenableBaseHub.then(() => {
      this.baseHubConnection.on('earningsoffer', (data) => {
        data = this.checkResponse(data, true);
        console.log(data);
      });
    });
  }
  public RealTimeOfferListener = () => {
    this.thenableBaseHub.then(() => {
      this.baseHubConnection.on('realtimeoffer', (data) => {
        data = this.checkResponse(data, true);
        console.log(data);
      });
    });
  }
  public ActivityNewsListener = () => {
    this.thenableBaseHub.then(() => {
      this.baseHubConnection.on('activityNews', (data) => {
        data = this.checkResponse(data, true);
        console.log(data);
      });
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
    if (user == null)
      user = this.authService.getUser();
    let requestObject = { data: data, user: user };
    return requestObject;
  }

}

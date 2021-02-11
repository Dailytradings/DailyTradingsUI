import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';

@Component({
  selector: 'app-user-block',
  templateUrl: './user-block.component.html',
  styleUrls: ['./user-block.component.scss']
})
export class UserBlockComponent implements OnInit {

  userData;
  user;
  constructor(@Inject(PLATFORM_ID) private _platformId: Object,private router: Router, private authService: AuthService, private broadcastingService: BroadcastingService, private cdRef: ChangeDetectorRef) {
  }

  checkLogging() {
    this.userData = this.authService.getUser();
    if (this.userData)
      this.user = this.userData.user;
    else
      this.user = undefined;
    this.cdRef.detectChanges();
  }

  ngOnInit() { 
    if(isPlatformBrowser(this._platformId)) {
      this.checkLogging();
      this.broadcastingService.logOutObservable.subscribe(() => this.checkLogging());
      }
  }

  logOut() {
    this.authService.logout();
  }

  logIn() {
    this.router.navigate(['/pages/login']);
  }

}

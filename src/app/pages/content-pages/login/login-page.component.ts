import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';
import { SignalRService } from 'app/shared/services/signalr.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  loginFormSubmitted = false;
  isLoginFailed = false;

  user: any;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  });

  constructor(@Inject(PLATFORM_ID) private _platformId: Object, private router: Router,
    private authService: AuthService,
    private signalRService: SignalRService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private broadcastingService: BroadcastingService) {
    if (isPlatformBrowser(this._platformId)) {
      localStorage.removeItem("user");
    }
  }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });

    this.authService.signinUser(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((user) => {
        if (user) {
          this.authService.getPagePermission(user)
            .subscribe((pageRes) => {
              if (pageRes) {
                this.authService.getPropPermission(user)
                  .subscribe((propRes) => {
                    this.spinner.hide();
                    if (propRes) {
                      localStorage.setItem("user", JSON.stringify({ user: user, pagePermission: pageRes, propPermission: propRes }));
                      this.signalRService.Login(user.id);
                      this.router.navigate(['']);
                      this.broadcastingService.emitLogIn();
                    }
                  });
              }
            });
        }
      },
        (err) => {
          this.isLoginFailed = true;
          this.spinner.hide();
          console.error('error: ' + err)
        }
      );
  }
}

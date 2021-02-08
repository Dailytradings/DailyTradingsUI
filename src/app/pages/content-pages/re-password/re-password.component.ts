import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { MustMatch } from 'app/shared/directives/must-match.validator';
import { AlertObject } from '../../../shared/data/alertData';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-re-password',
  templateUrl: './re-password.component.html',
  styleUrls: ['./re-password.component.scss']
})
export class RePasswordComponent implements OnInit {

  rePasswordFormSubmitted = false;
  rePasswordForm: FormGroup;
  userId;

  get rpf() {
    return this.rePasswordForm.controls;
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.rePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    this.route.params.subscribe(params => {
      if (params['id'] && params['id'].length > 0 && params['id2'] && params['id2'].length > 0) {
        this.authService.checkProcessGuid(params['id'],params['id2'])
          .subscribe(res => {
            if (!res) {
              this.router.navigate(['/pages/login']);
              let alertObject: AlertObject = { title: 'İstek Zaman Aşımına Uğradı.', icon: 'error' };
              this.notificationService.processNotification(alertObject);
            } else {
              this.userId = res;
            }
          });
      } else {
        let alertObject: AlertObject = { title: 'İstek Zaman Aşımına Uğradı.', icon: 'error' };
        this.notificationService.processNotification(alertObject);
      }
    });
  }

  onSubmit() {
    this.rePasswordFormSubmitted = true;
    if (this.rePasswordForm.invalid) {
      return;
    }
    var user = { id: this.userId, password: this.rePasswordForm.value.password };
    this.authService.rePassword(user).subscribe(res => {
      if (res)
        this.router.navigate(['/pages/login']);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { AlertObject } from '../../../shared/data/alertData';
import { NotificationService } from '../../../shared/services/notification.service';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] && params['id'].length > 0 && params['id2'] && params['id2'].length > 0) {
        this.authService.activateUser(params['id'],params['id2']).subscribe(res => {
            this.router.navigate(['/pages/login']);
        });
      } else {
        let alertObject: AlertObject = { title: 'İstek Zaman Aşımına Uğradı.', icon: 'error' };
        this.notificationService.processNotification(alertObject);
      }
    });
  }

}

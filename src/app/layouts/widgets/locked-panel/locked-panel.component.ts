import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';

@Component({
  selector: 'app-locked-panel',
  templateUrl: './locked-panel.component.html',
  styleUrls: ['./locked-panel.component.scss']
})
export class LockedPanelComponent implements OnInit {

  @Input() dataSize;
  @Input() allowedToSee;
  loggedUser;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.isAuthenticated();
  }

}

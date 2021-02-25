import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';

@Component({
  selector: 'app-locked-panel',
  templateUrl: './locked-panel.component.html',
  styleUrls: ['./locked-panel.component.scss']
})
export class LockedPanelComponent implements OnInit {

  @Input() dataSize;
  @Input() allowedToSee;
  @Input() relative;
  loggedUser;

  constructor(@Inject(PLATFORM_ID) private _platformId: Object, private authService: AuthService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.loggedUser = this.authService.isAuthenticated();
      this.cdRef.detectChanges();
    }
  }

}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { ContentService } from './../../shared/services/content.service';

@Component({
  selector: 'app-earnings-page',
  templateUrl: './earnings-page.component.html',
  styleUrls: ['./earnings-page.component.scss']
})
export class EarningsPageComponent implements OnInit {
  constructor(private contentService: ContentService, private cdRef: ChangeDetectorRef, private authService: AuthService) {
    authService.isPageAuthorized("HotStockOpportunities");
  }

  ngOnInit() {
  }


}

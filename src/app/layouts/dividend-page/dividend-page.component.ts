import { Component, OnInit, } from '@angular/core';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-dividend-page',
  templateUrl: './dividend-page.component.html',
  styleUrls: ['./dividend-page.component.scss']
})
export class DividendPageComponent implements OnInit {

   constructor(private authService: AuthService) {
     authService.isPageAuthorized("Dividends");
   }
   ngOnInit() {
   }

}

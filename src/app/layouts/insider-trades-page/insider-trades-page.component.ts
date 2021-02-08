import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';

@Component({
  selector: 'app-insider-trades-page',
  templateUrl: './insider-trades-page.component.html',
  styleUrls: ['./insider-trades-page.component.scss']
})
export class InsiderTradesPageComponent implements OnInit {

 

 constructor(private authService: AuthService) {
   authService.isPageAuthorized("InsiderTradesOpportunities");
 }

 ngOnInit() {
 }

}
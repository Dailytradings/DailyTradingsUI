import { Component, OnInit } from '@angular/core';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';

@Component({
  selector: 'app-credit-card-add',
  templateUrl: './credit-card-add.component.html',
  styleUrls: ['./credit-card-add.component.scss']
})
export class CreditCardAddComponent implements OnInit {

  constructor(private broadcastingService: BroadcastingService) { }

  ngOnInit(): void {
  }

  listCards() {
    this.broadcastingService.emitCreditCard('credit-card-update');
  }
}

import { Component, OnInit } from '@angular/core';
import { BroadcastingService } from '../../../../shared/services/broadcasting.service'
@Component({
  selector: 'app-credit-card-update',
  templateUrl: './credit-card-update.component.html',
  styleUrls: ['./credit-card-update.component.scss']
})
export class CreditCardUpdateComponent implements OnInit {

  constructor(private broadcastingService: BroadcastingService) { }

  ngOnInit(): void {
  }


  addCard() {
    this.broadcastingService.emitCreditCard('credit-card-add');
  }
}

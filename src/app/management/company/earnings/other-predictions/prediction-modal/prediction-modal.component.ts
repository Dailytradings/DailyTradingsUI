import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SymbolService } from 'app/shared/services/symbol.service';

@Component({
  selector: 'app-prediction-modal',
  templateUrl: './prediction-modal.component.html',
  styleUrls: ['./prediction-modal.component.scss']
})
export class PredictionModalComponent {

  closeResult = '';
  activePanel = false;
  activeEps = false;
  activeRevenue = false;
  @ViewChild('content') content: NgTemplateOutlet;
  @Input() selectedPrediction: any;
  constructor(private modalService: NgbModal, private symbolService: SymbolService) { }

  public open() {
    this.activePanel = false;
    this.activeEps = false;
    this.activeRevenue = false;
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'Save') {
        console.log(this.selectedPrediction);
        if (this.selectedPrediction.prediction.consensusEPS || this.selectedPrediction.prediction.consensusRevenue) {
          let predictionData = {site: this.selectedPrediction.site, prediction: {Id:this.selectedPrediction.prediction.id ,SymbolId:this.selectedPrediction.prediction.earnings.symbol.id ,EarningsId:this.selectedPrediction.prediction.earnings.id ,ConsensusEPS:this.selectedPrediction.prediction.consensusEPS, ConsensusRevenue:this.selectedPrediction.prediction.consensusRevenue,UserId:'4bdc123a-f0a0-486e-9dca-754c58065ad5' }};
          this.symbolService.saveOtherPredictionData(predictionData).subscribe();
          this.selectedPrediction.site.isActive = false;
        }
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SymbolService } from 'app/shared/services/symbol.service';
import { PredictionModalComponent } from './prediction-modal/prediction-modal.component';

@Component({
  selector: 'app-other-predictions',
  templateUrl: './other-predictions.component.html',
  styleUrls: ['./other-predictions.component.scss']
})
export class OtherPredictionsComponent implements OnInit {

  @Input() nextEarnings: any;
  @Input() symbol: any;
  siteList: any;
  otherPredictions: any;
  selectedPrediction: any = { consensusEPS: 0.25, consensusRevenue: 51256 };
  modalObject: any;
  @ViewChild('modal') modal: PredictionModalComponent;
  constructor(private symbolService: SymbolService) { }

  ngOnInit(): void {
    this.symbolService.getSiteList().subscribe(x => {
      if (x) {
        x.forEach(element => {
          element.url = element.url + element.subUrl + this.symbol.ticker;
        });

        this.symbolService.getOtherPredictionsList(this.nextEarnings.id).subscribe(y => {
          let siteListWithPredictionValues = [];

          y.forEach(predictionElement => {
            x.forEach(siteElement => {

              if (predictionElement.site.id === siteElement.id) {
                siteElement.isActive = false;
                let siteElementWithPredictionValue = { site: siteElement, prediction: predictionElement };
                siteListWithPredictionValues.push(siteElementWithPredictionValue);
              }
            });
          });

          let siteExist;
          let siteData;
          x.forEach(siteElement => {
            siteExist = false;
            siteData = siteElement;
            siteListWithPredictionValues.forEach(element => {
              if (element.site.id === siteElement.id) {
                siteExist = true;
              }
            });
            if (!siteExist)
              siteListWithPredictionValues.push({ site: siteData, prediction: {earning: this.nextEarnings} })
          });
          this.siteList = siteListWithPredictionValues;
        });
      }
    });
  }


  timer;
  delay = 200;
  prevent = false;
  ClickCard(selectedSite) {
    this.modalObject = selectedSite;
    this.timer = setTimeout(() => {
      if (!this.prevent) {
        if (selectedSite.site.isActive) {
          this.modal.open();
        }
      }
      this.prevent = false;
    }, this.delay);
  }

  SetCardActive(selectedSite) {
    clearTimeout(this.timer);
    this.prevent = true;
    selectedSite.site.isActive = true;
  }


}

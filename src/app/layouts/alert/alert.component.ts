import { Component, OnInit } from '@angular/core';
import { AlertObject } from 'app/shared/data/alertData';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';
import { ContentService } from 'app/shared/services/content.service';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  selectedSymbol: any = { companyName: '' };

  selectedAlertTypeId = "null";
  alertTypeList;
  alertValue;
  valueText;
  numericValueEnabled;
  textValueEnabled;
  isRepeatable = false;
  isNotifyOneDayAgo = false;
  notifyOneDayAgoEnabled;

  constructor(private contentService: ContentService,
    private broadcastingService: BroadcastingService,
    private notificationService: NotificationService) {
    this.getAlertList();
  }

  ngOnInit(): void {
    this.broadcastingService.symbolObservable.subscribe(symbol => {
      this.selectedSymbol = symbol;
    })
  }

  selectSymbol() {
    this.broadcastingService.emitSearch(true);
  }

  getAlertList() {
    this.contentService.getAlertTypes().subscribe(x => {
      if (x)
        this.alertTypeList = x;
    });
  }


  AddAlert() {
    if (this.selectedSymbol && this.selectedAlertTypeId != "null" && (this.alertValue || (!this.numericValueEnabled && !this.textValueEnabled))) {

      var data = { symbolId: this.selectedSymbol.id, alertTypeId: this.selectedAlertTypeId, alertValue: this.alertValue, isNotifyOneDayAgo: this.isNotifyOneDayAgo, isRepeatable: this.isRepeatable };
      this.contentService.addAlert(data).subscribe(res => {
        if (res) {
          this.selectedSymbol = { companyName: '' };
          this.alertValue = '';
          this.selectedAlertTypeId = "null";
          this.valueText = null;
          this.numericValueEnabled = false;
          this.textValueEnabled = false;
          this.notifyOneDayAgoEnabled = false;
          this.broadcastingService.emitRefrehAlertList(true);
        }
      });
    } else {
      let alertObject: AlertObject = { title: 'Lütfen Alanları Doldurun.', icon: 'error' };
      this.notificationService.processNotification(alertObject);
    }
  }


  onAlertTypeChange() {
    let data = this.alertTypeList.filter(x => x.id === this.selectedAlertTypeId)[0];
    if (data != undefined)
      data = data.typeName;

    this.numericValueEnabled = false;
    this.textValueEnabled = false;
    this.valueText = null;
    this.notifyOneDayAgoEnabled = false;

    switch (data) {
      case "RealTime":
        this.numericValueEnabled = true;
        this.valueText = 'RealTime Change';
        break;
      case "Earnings":
        this.notifyOneDayAgoEnabled = true;
        break;
      case "Dividends":
        this.notifyOneDayAgoEnabled = true;
        break;
    }
  }
}

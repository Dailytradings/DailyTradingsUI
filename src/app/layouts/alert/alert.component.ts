import { Component, OnInit } from '@angular/core';
import { AlertObject } from 'app/shared/data/alertData';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';
import { ContentService } from 'app/shared/services/content.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  selectedSymbol: any = { id: null, companyName: '' };
  reminderData;

  selectedAlertTypeId = "null";
  alertTypeList;
  alertValue;

  selectedReminderTypeId = "null";
  reminderTypeList;
  reminderValue;

  valueText;

  descriptionEnable;
  descriptionText;

  numericValueEnabled;
  textValueEnabled;
  isRepeatable = false;
  isNotifyOneDayAgo = false;
  notifyOneDayAgoEnabled;

  constructor(private contentService: ContentService,
    private broadcastingService: BroadcastingService,
    private notificationService: NotificationService) {
    this.getAlertTypeList();
    this.getReminderData();
  }

  ngOnInit(): void {
    this.broadcastingService.symbolObservable.subscribe(symbol => {
      this.selectedSymbol = symbol;
    })
  }

  selectSymbol() {
    this.broadcastingService.emitSearch(true);
  }

  getReminderData() {
    this.contentService.getReminderData().subscribe(res => {
      if(res)
      this.reminderData = res;
    });
  }

  getRd(val) {
    return this.reminderData.find(x=> x.alertType === val);
  }
  reminderDataContains(val) {
    return this.reminderData.find(x=> x.alertType === val) != null;
  }

  updateReminder(data, val) {
    switch (val) {
      case 'earningsOn':
      case 'earningsOff':
      case 'dividendOn':
      case 'dividendOff':
        data.isActive = !data.isActive;
        this.contentService.changeReminderActivity(data).subscribe(res => {
          if(res) {
            this.getReminderData();
          }
        });
        break;
      case 'dividendRemove':  
      case 'earningsRemove':
        this.contentService.RemoveAlert(data).subscribe(res => {
          if(res) {
            this.getReminderData();
          }
        });
          break;

    }

  }

  getAlertTypeList() {
    this.contentService.getAlertTypes().subscribe(x => {
      if (x)
        this.alertTypeList = x;
    });

    this.contentService.getReminderTypes().subscribe(x => {
      if (x)
        this.reminderTypeList = x;
    });
  }


  AddAlert() {
    if (this.selectedAlertTypeId != "null" && (this.alertValue || (!this.numericValueEnabled && !this.textValueEnabled))) {
      var data = { symbolId: this.selectedSymbol.id, alertTypeId: this.selectedAlertTypeId, alertValue: this.alertValue, isNotifyOneDayAgo: this.isNotifyOneDayAgo, isRepeatable: this.isRepeatable };
      this.contentService.addAlert(data).subscribe(res => {
        if (res) {
          this.selectedSymbol = { id: null, companyName: '' };
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

  AddReminder() {
    if (this.selectedReminderTypeId != "null" && (this.reminderValue || (!this.numericValueEnabled && !this.textValueEnabled))) {
      var data = { symbolId: this.selectedSymbol.id, alertTypeId: this.selectedReminderTypeId, alertValue: this.reminderValue, isNotifyOneDayAgo: this.isNotifyOneDayAgo, isRepeatable: this.isRepeatable };
      this.contentService.addAlert(data).subscribe(res => {
        if (res) {
          this.selectedSymbol = { id: null, companyName: '' };
          this.reminderValue = '';
          this.selectedReminderTypeId = "null";
          this.valueText = null;
          this.numericValueEnabled = false;
          this.textValueEnabled = false;
          this.notifyOneDayAgoEnabled = false;
          this.getReminderData();
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

    this.resetForm();

    switch (data) {
      case "Earnings":
        this.notifyOneDayAgoEnabled = true;
        this.alertValue = null;
        break;
      case "Dividends":
        this.notifyOneDayAgoEnabled = true;
        break;
    }
  }

  onReminderTypeChange() {
    let data = this.reminderTypeList.filter(x => x.id === this.selectedReminderTypeId)[0];
    if (data != undefined)
      data = data.typeName;

    this.resetForm();

    switch (data) {
      case "Dividend":
        this.numericValueEnabled = true;
        this.valueText = 'Dividend Yield';
        this.descriptionEnable = true;
        this.descriptionText = "We will Inform you 1 Day Before";
        this.isNotifyOneDayAgo = true;
        this.isRepeatable = true;
        break;
      case "Earnings Opportunities":
        this.descriptionEnable = true;
        this.descriptionText = "We will Inform you 1 Day Before";
        this.isNotifyOneDayAgo = true;
        this.isRepeatable = true;
        this.reminderValue = null;
        break;
    }
  }


  selectedEdit;
  selectEdit(edit) {
    this.resetForm();
    this.selectedEdit = edit;
  }

  resetForm() {
    this.numericValueEnabled = false;
    this.textValueEnabled = false;
    this.valueText = null;
    this.notifyOneDayAgoEnabled = false;
    this.descriptionEnable = false;
    this.descriptionText = null;
  }


  updateUrl(image) {
    image.logoUrl = environment.notFoundLogoUrl;
    return true;
  }
}

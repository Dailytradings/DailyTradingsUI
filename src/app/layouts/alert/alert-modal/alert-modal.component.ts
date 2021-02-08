import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableBodyRowComponent } from '@swimlane/ngx-datatable';
import { AlertObject } from 'app/shared/data/alertData';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';
import { ContentService } from 'app/shared/services/content.service';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  closeResult = '';
  @ViewChild('content') content: NgTemplateOutlet;

  @Input() selectedSymbol;
  selectedAlertTypeId = "null";
  alertTypeList;
  alertValue;
  valueText;
  numericValueEnabled;
  textValueEnabled;
  notifyOneDayAgoEnabled;
  isRepeatable = false;
  isNotifyOneDayAgo = false;


  constructor(private modalService: NgbModal, private contentService: ContentService, private broadcastingService: BroadcastingService, private notificationService: NotificationService) {
    contentService.getAlertTypes().subscribe(x => {
      if (x)
        this.alertTypeList = x;
    });
    console.log(this.selectedSymbol);
  }

  ngOnInit() {

  }

  public open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'Save') {
        if (this.selectedSymbol && this.selectedAlertTypeId != "null" && (this.alertValue || (!this.numericValueEnabled && !this.textValueEnabled))) {
          var data = { symbolId: this.selectedSymbol.symbolId, alertTypeId: this.selectedAlertTypeId, alertValue: this.alertValue, isNotifyOneDayAgo: this.isNotifyOneDayAgo, isRepeatable: this.isRepeatable };
          this.contentService.addAlert(data).subscribe(res => {
            if (res)
              this.broadcastingService.emitRefrehAlertList(true);
          });
        } else {
          let alertObject: AlertObject = { title: 'Lütfen Alanları Doldurun.', icon: 'error' };
          this.notificationService.processNotification(alertObject);
        }
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.alertValue = '';
      this.selectedAlertTypeId = "null";
      this.valueText = null;
      this.numericValueEnabled = false;
      this.textValueEnabled = false;
      this.notifyOneDayAgoEnabled = false;
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

  onAlertTypeChange() {
    let data = this.alertTypeList.filter(x => x.id === this.selectedAlertTypeId)[0];
    if (data != undefined)
      data = data.typeName;
    console.log(data);
    switch (data) {
      case "RealTime":
        this.numericValueEnabled = true;
        this.valueText = 'RealTime Change';
        break;
      case "Earnings":
        this.numericValueEnabled =false;
        this.textValueEnabled =false;
        this.valueText = null;
        this.notifyOneDayAgoEnabled = true;
        break;
      case "Dividends":
        this.textValueEnabled =false;
        this.valueText = null;
        this.notifyOneDayAgoEnabled = true;
        break;
      default:
        this.numericValueEnabled = false;
        this.textValueEnabled = false;
        this.valueText = null;
        this.notifyOneDayAgoEnabled = false;
        break;
    }
  }

}

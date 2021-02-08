import { NgTemplateOutlet } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentService } from 'app/shared/services/content.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-alert-list-modal',
  templateUrl: './alert-list-modal.component.html',
  styleUrls: ['./alert-list-modal.component.scss']
})
export class AlertListModalComponent implements OnInit {

  closeResult = '';
  @ViewChild('content') content: NgTemplateOutlet;


  constructor(private modalService: NgbModal, private contentService: ContentService, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {  }

  

  public open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', size:'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'Save') {

      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  close() {
    this.modalService.dismissAll();
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


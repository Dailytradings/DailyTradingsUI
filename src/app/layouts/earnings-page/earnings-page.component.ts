import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { AuthService } from 'app/shared/auth/auth.service';
import { DatatableData } from 'app/Template/data-tables/data/datatables.data';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentService } from './../../shared/services/content.service'

@Component({
  selector: 'app-earnings-page',
  templateUrl: './earnings-page.component.html',
  styleUrls: ['./earnings-page.component.scss']
})
export class EarningsPageComponent implements OnInit {
  constructor(private contentService: ContentService, private cdRef: ChangeDetectorRef, private authService: AuthService) {
    authService.isPageAuthorized("HotStockOpportunities");
  }

  ngOnInit() {
  }


}

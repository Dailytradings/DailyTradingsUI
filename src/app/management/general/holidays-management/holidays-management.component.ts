import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ContentService } from 'app/shared/services/content.service';
import { NotificationService } from 'app/shared/services/notification.service';
import * as moment from 'moment';
import { AuthService } from '../../../shared/auth/auth.service';
import { BroadcastingService } from '../../../shared/services/broadcasting.service';

@Component({
  selector: 'app-holidays-management',
  templateUrl: './holidays-management.component.html',
  styleUrls: ['./holidays-management.component.scss']
})
export class HolidaysManagementComponent implements OnInit {

  symbol: any;
  effectTypeList;
  regionList
  selectedHoliday;
  selectedEdit;
  holidayNameFormSubmitted = false;
  holidayNameForm: FormGroup;

  newFormSubmitted = false;
  newForm: FormGroup;

  today: Date = new Date();
  keyDateForNewDataHolidayDate;
  keyDateForHolidayDate = { day: this.today.getDate(), month: this.today.getUTCMonth() + 1, year: this.today.getUTCFullYear() }

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private contentService: ContentService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
    if (isPlatformBrowser(this._platformId)) {
      authService.isPageAuthorized("Management");
      this.contentService.getAllHolidayEffectTypes().subscribe(res => {
        if (res) {
          this.effectTypeList = res;
        }
      });
      this.contentService.getAllRegions().subscribe(res => {
        if (res) {
          this.regionList = res;
        }
      });
    }
  }

  ngOnInit(): void {
    this.getAllHolidays();
    this.newForm = this.formBuilder.group({
      title: ["", [Validators.required]]
    });


    this.holidayNameForm = this.formBuilder.group({
      title: ["", [Validators.required]],
    });

    // content header
    this.contentHeader = {
      headerTitle: 'Datatables',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '#'
          },
          {
            name: 'Forms & Tables',
            isLink: true,
            link: ''
          },
          {
            name: 'Datatables',
            isLink: false
          }
        ]
      }
    };
  }

  getAllHolidays() {
    this.contentService.getHolidaysForTimeline().subscribe(res => {
      console.log(res);
      if (res)
        this.rows = res;
      this.tempData = this.rows;
      this.cdRef.detectChanges();
    });
  }

  get nf() {
    return this.newForm.controls;
  }
  get hnf() {
    return this.holidayNameForm.controls;
  }


  public contentHeader: object;

  // row data
  public rows;

  public ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  public expanded: any = {};

  public editing = {};

  public chkBoxSelected = [];
  public SelectionType = SelectionType;

  // server side row data
  public serverSideRowData;

  // private
  private tempData = [];
  /**
   * filterUpdate
   *
   * @param code
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * filterUpdate
   *
   * @param code
   */
  filterAnnounce(event) {
    const val = event.toLowerCase();
    const temp = this.tempData.filter(function (d) {
      if (val === "all")
        return true;
      return d.holidayStatus.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }



  /**
   * Constructor
   *
   * @param {HttpClient} http
   */

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------


  SelectHoliday(holiday) {
    if (this.selectedHoliday == undefined || this.selectedHoliday.id != holiday.id) {
      this.selectedHoliday = holiday;
      let date = moment(this.selectedHoliday.date).toDate();
      this.keyDateForHolidayDate = { day: date.getDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear() };
      this.selectedEdit = undefined;
      this.resetForms();
    }
  }

  removeSelectedHoliday() {
    this.selectedHoliday = undefined;
    this.selectedEdit = undefined;
    this.resetForms();
  }
  resetForms() {
    this.newForm.reset();
    this.holidayNameForm.reset();
  }

  selectEdit(editType) {
    this.selectedEdit = editType;
    if (this.selectedEdit == "new" && this.effectTypeList.length > 0 && this.regionList.length > 0)
      this.selectedHoliday = { effectTypeId: this.effectTypeList[0], regionId: this.regionList[0] };
  }


  changeUser($event) {
    this.authService.getUserById($event.target.value).subscribe(res => {
      if (res)
        this.selectedHoliday = res;
      this.cdRef.detectChanges();
    });
  }

  onSubmit() {
    switch (this.selectedEdit) {
      case 'new':
        this.newFormSubmitted = true;
        if (this.newForm.invalid) {
          return;
        }
        let newdatestring = this.keyDateForHolidayDate.day + '-' + this.keyDateForHolidayDate.month + '-' + this.keyDateForHolidayDate.year;
        let newItem = {
          title: this.newForm.value.title, dateText: newdatestring, effectTypeId: this.selectedHoliday.effectTypeId, regionId: this.selectedHoliday.regionId
        };
        this.contentService.newHoliday(newItem).subscribe(res => {
          if (res) {
            this.selectedEdit = undefined;
            this.resetForms();
            this.getAllHolidays();
          }
        });
        break;
      case 'name':
        this.holidayNameFormSubmitted = true;
        if (this.holidayNameForm.invalid) {
          return;
        }
        let holidayNameItem = { id: this.selectedHoliday.id, title: this.holidayNameForm.value.title };
        this.contentService.reHolidayName(holidayNameItem).subscribe(res => {
          if (res) {
            this.selectedEdit = undefined;
            this.resetForms();
            this.getAllHolidays();
          }
        });
        break;
      case 'date':
        let datestring = this.keyDateForHolidayDate.day + '-' + this.keyDateForHolidayDate.month + '-' + this.keyDateForHolidayDate.year;
        let holidayDateItem = { id: this.selectedHoliday.id, dateText: datestring };
        this.contentService.reHolidayDate(holidayDateItem).subscribe(res => {
          if (res) {
            {
              this.selectedEdit = undefined;
              this.resetForms();
              this.getAllHolidays();
            }
          }
        });
        break;
        case 'effect':
          let effectItem = { id: this.selectedHoliday.id, effectTypeId: this.selectedHoliday.effectTypeId };
          this.contentService.reHolidayEffect(effectItem).subscribe(res => {
            if (res) {
              this.selectedEdit = undefined;
              this.resetForms();
              this.getAllHolidays();
            }
          });
          break;
          case 'region':
            let regionItem = { id: this.selectedHoliday.id, regionId: this.selectedHoliday.regionId };
            this.contentService.reHolidayRegion(regionItem).subscribe(res => {
              if (res) {
                this.selectedEdit = undefined;
                this.resetForms();
                this.getAllHolidays();
              }
            });
            break;
    }
  }
}

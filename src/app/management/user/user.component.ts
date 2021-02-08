import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { AuthService } from 'app/shared/auth/auth.service';
import { MustMatch } from 'app/shared/directives/must-match.validator';
import { environment } from 'environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userTypeList;
  selectedUser;
  selectedEdit;

  today: Date = new Date();
  keyDateForExpireDate = { day: this.today.getDate(), month: this.today.getUTCMonth() + 1, year: this.today.getUTCFullYear() }

  reUsernameFormSubmitted = false;
  reUsernameForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });
  reFullNameFormSubmitted = false;
  reFullNameForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
  });
  rePasswordFormSubmitted = false;
  rePasswordForm: FormGroup;
  reEmailFormSubmitted = false;
  reEmailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder) {
    authService.isPageAuthorized("Management");
    this.authService.getAllUserTypes().subscribe(res => {
      if (res) {
        this.userTypeList = res;
        this.getAllUsers();
      }
    });
  }

  getAllUsers() {
    this.authService.getAllUsers().subscribe(res => {
      if (res)
        this.rows = res;
      this.cdRef.detectChanges();
    });
  }

get ruf() {
  return this.reUsernameForm.controls;
}


get rfnf() {
  return this.reFullNameForm.controls;
}
  get rpf() {
    return this.rePasswordForm.controls;
  }

  get ref() {
    return this.reEmailForm.controls;
  }


  ngOnInit(): void {
    this.rePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
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
      return d.username.toLowerCase().indexOf(val) !== -1 || !val;
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
      return d.earningsStatus.toLowerCase().indexOf(val) !== -1 || !val;
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


  getRedirectUrl(ticker) {
    return environment.baseFrontendUrl + '/stock/overview/' + ticker;
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------


  selectUser(user) {
    if (this.selectedUser == undefined || this.selectedUser.id != user.id) {
      this.selectedUser = user;
      let date = moment(this.selectedUser.expireDate).toDate();
      this.keyDateForExpireDate = { day: date.getDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear() };
      this.selectedEdit = undefined;
      this.resetForms();
    }
  }

  removeSelectedUser() {
    this.selectedUser = undefined;
    this.selectedEdit = undefined;
    this.resetForms();
  }
  resetForms() {
    this.reEmailForm.reset();
    this.rePasswordForm.reset();
    this.rePasswordFormSubmitted = false;
    this.reEmailFormSubmitted = false;
  }

  selectEdit(editType) {
    this.selectedEdit = editType;
  }


  changeUser($event) {
    this.authService.getUserById($event.target.value).subscribe(res => {
      if (res)
        this.selectedUser = res;
      this.cdRef.detectChanges();
    });
  }


  onSubmit() {
    switch (this.selectedEdit) {
      case 'username':
        this.reUsernameFormSubmitted = true;
        if (this.reUsernameForm.invalid) {
          return;
        }
        let reUsernameItem = { id: this.selectedUser.id, username: this.reUsernameForm.value.username };
        this.authService.reUsername(reUsernameItem).subscribe(res => {
          if (res) {
            this.selectedEdit = undefined;
            this.resetForms();
            this.getAllUsers();
          }
        });
        break;
        case 'fullName':
          this.reFullNameFormSubmitted = true;
          if (this.reFullNameForm.invalid) {
            return;
          }
          let reFullNameItem = { id: this.selectedUser.id, fullName: this.reFullNameForm.value.fullName };
          this.authService.reFullName(reFullNameItem).subscribe(res => {
            if (res) {
              this.selectedEdit = undefined;
              this.resetForms();
              this.getAllUsers();
            }
          });
          break;
      case 'password':
        this.rePasswordFormSubmitted = true;
        if (this.rePasswordForm.invalid) {
          return;
        }
        let rePassItem = { id: this.selectedUser.id, password: this.rePasswordForm.value.password };
        this.authService.rePassword(rePassItem).subscribe(res => {
          if (res) {
            this.selectedEdit = undefined;
            this.resetForms();
          }
        });
        break;
      case 'email':
        this.reEmailFormSubmitted = true;
        if (this.reEmailForm.invalid) {
          return;
        }
        let reMailItem = { id: this.selectedUser.id, email: this.reEmailForm.value.email };
        this.authService.reMail(reMailItem).subscribe(res => {
          if (res) {
            this.selectedEdit = undefined;
            this.resetForms();
            this.getAllUsers();
          }
        });
        break;
        case 'plan':
          this.authService.reRankProfile(this.selectedUser.id, this.selectedUser.userTypeId).subscribe(res => {
            if (res) {
              {
                this.authService.updateCacheUser(this.selectedUser, "Management");
                this.selectedEdit = undefined;
                this.resetForms();
                this.getAllUsers();
              }
            }
          });
          break;
          case 'date':
          let datestring = this.keyDateForExpireDate.day + '-' +this.keyDateForExpireDate.month + '-' +this.keyDateForExpireDate.year;
            this.authService.reExpireDate(this.selectedUser.id, datestring).subscribe(res => {
              if (res) {
                {
                  this.selectedEdit = undefined;
                  this.resetForms();
                  this.getAllUsers();
                }
              }
             });
            break;

    }
  }

}

import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ContentService } from 'app/shared/services/content.service';
import { barChartSingle, barChartmulti, pieChartSingle, pieChartmulti, lineChartSingle, lineChartMulti, areaChartSingle, areaChartMulti } from '../../../shared/data/ngxChart';
import * as chartsData from '../../../shared/configs/ngx-charts.config';

@Component({
  selector: 'app-previous-earnings-effects-list',
  templateUrl: './previous-earnings-effects-list.component.html',
  styleUrls: ['./previous-earnings-effects-list.component.scss']
})
export class PreviousEarningsEffectsListComponent implements OnInit {

  @Input() symbol;


  constructor(private contentService: ContentService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllEarnings();
    
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

  lineChartMulti = lineChartMulti;
   // line, area
   areaChartAutoScale = chartsData.areaChartAutoScale;
   areaChartLineInterpolation = chartsData.areaChartLineInterpolation;

   //Line Charts

   lineChartView: any[] = chartsData.lineChartView;

   // options
   lineChartShowXAxis = chartsData.lineChartShowXAxis;
   lineChartShowYAxis = chartsData.lineChartShowYAxis;
   lineChartGradient = chartsData.lineChartGradient;
   lineChartShowLegend = chartsData.lineChartShowLegend;
   lineChartShowXAxisLabel = chartsData.lineChartShowXAxisLabel;
   showGridLines = chartsData.showGridLines;
   lineChartXAxisLabel = chartsData.lineChartXAxisLabel;
   lineChartShowYAxisLabel = chartsData.lineChartShowYAxisLabel;
   lineChartYAxisLabel = chartsData.lineChartYAxisLabel;

   lineChartColorScheme = chartsData.lineChartColorScheme;

   // line, area
   lineChartAutoScale = chartsData.lineChartAutoScale;
   lineChartLineInterpolation = chartsData.lineChartLineInterpolation;




  getAllEarnings() {
    this.contentService.getPreviousEarningsEffectList(this.symbol.id).subscribe(res => {
      if (res)
        this.rows = res;
        this.tempData = this.rows;
      this.cdRef.detectChanges();
    });
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
      return d.earningsDateText.toLowerCase().indexOf(val) !== -1 || !val;
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
   * rowDetailsToggleExpand
   *
   * @param row
   */
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }


  /**
   * Constructor
   *
   * @param {HttpClient} http
   */



}

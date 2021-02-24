import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { AlertObject } from '../data/alertData';
import { NotificationService } from './notification.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
};
@Injectable({
  providedIn: 'root'
})

export class ContentService {

  constructor(private http: HttpClient, private notificationService: NotificationService, private authService: AuthService) { }

  getBanner() {
    return this.http.get(environment.baseUrl + "/content/GetBanner").pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  getHotStockOpportunities(date = "", timeRange = "Date", dataCount = 250) {
    let url = environment.baseUrl + "/content/GetHotStockOpportunities/" + timeRange + "/" + dataCount + "/" + date ;
    console.log(url);
    return this.http.get(url).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  getUpcomingEarningsList(dataCount = 5) {
    return this.http.get(environment.baseUrl + "/content/GetUpcomingEarningsList" + "/" + dataCount).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getDividendsWithDate(date = "", timeRange = "NextSevenDays", dataCount = 250) {
    return this.http.get(environment.baseUrl + "/content/GetDividendsWithDate/" + timeRange  + "/" + dataCount+ "/" + date).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  getPreviousEarningsWithOtherPredictions(symbolId) {
    return this.http.get(environment.baseUrl + "/content/GetPreviousEarningsWithOtherPredictions/" + symbolId).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  getPreviousEarningsEffectList(symbolId) {
    return this.http.get(environment.baseUrl + "/content/GetPreviousEarningsEffectList/" + symbolId).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  getPreviousDividendEffectList(symbolId) {
    return this.http.get(environment.baseUrl + "/content/GetPreviousDividendEffectList/" + symbolId).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  
  getEarningsActivityNews(count) {
    return this.http.get(environment.baseUrl + "/content/GetEarningsActivityNews/"+ count).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getDividendActivityNews(count) {
    return this.http.get(environment.baseUrl + "/content/GetDividendActivityNews/"+ count).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  
  getMainPanelActivityNews(count) {
    return this.http.get(environment.baseUrl + "/content/GetMainPanelActivityNews/"+ count).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  
  getOurEstimatesActivityNews(count) {
    return this.http.get(environment.baseUrl + "/content/GetOurEstimatesActivityNews/"+ count).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getMostReliableCompetitorList() {
    return this.http.get(environment.baseUrl + "/content/GetMostReliableCompetitorList").pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  
  getAnalystRatingsWithDate(date = "", timeRange = "NextSevenDays", dataCount = 250) {
    return this.http.get(environment.baseUrl + "/content/GetAnalystRatingsWithDate/" + timeRange  + "/" + dataCount+ "/" + date).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getObserverOpportunities(time) {
    return this.http.get(environment.baseUrl + "/content/GetObserverOpportunities/" + time).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getInsiderTrades(timeRange = "LastThreeDays", dataCount= 250) {
    console.log(timeRange);
    return this.http.get(environment.baseUrl + "/content/GetInsiderTrades/" + timeRange + "/" + dataCount).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getPremarketAnalysis() {
    return this.http.get(environment.baseUrl + "/content/GetPreMarketAnalysis").pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  addToWatchList(data) {
    return this.http.post(environment.baseUrl + "/content/AddToWatchList", this.createRequest(data), httpOptions).pipe(
      map((response: any) => this.checkResponse(response, true))
    );
  }

  removeFromWatchList(data) {
    return this.http.post(environment.baseUrl + "/content/RemoveFromWatchList", this.createRequest(data), httpOptions).pipe(
      map((response: any) => this.checkResponse(response, true))
    );
  }

  getAlertTypes() {
    return this.http.get(environment.baseUrl + "/content/GetAlertTypeList").pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getAllRegions() {
    return this.http.get(environment.baseUrl + "/content/GetRegionList").pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getAllHolidayEffectTypes() {
    return this.http.get(environment.baseUrl + "/content/GetHolidayEffectTypeList").pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getHolidaysForTimeline() {
    return this.http.get(environment.baseUrl + "/content/GetHolidaysForTimeline").pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  newHoliday(holiday) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/content/NewHoliday", this.createRequest(holiday))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  reHolidayName(holiday) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/content/ReHolidayName", this.createRequest(holiday))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  reHolidayDate(holiday) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/content/ReHolidayDate", this.createRequest(holiday))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  reHolidayEffect(holiday) {
    return this.http.post(environment.baseUrl + "/content/ReHolidayEffect", this.createRequest(holiday))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  reHolidayRegion(holiday) {
    return this.http.post(environment.baseUrl + "/content/ReHolidayRegion", this.createRequest(holiday))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  addAlert(data) {
    return this.http.post(environment.baseUrl + "/content/AddAlert", this.createRequest(data)).pipe(
      map((response: any) => this.checkResponse(response, true))
    );
  }

  RemoveAlert(data) {
    return this.http.post(environment.baseUrl + "/content/RemoveAlert", this.createRequest(data), httpOptions).pipe(
      map((response: any) => this.checkResponse(response, true))
    );
  }


  getSymbolOverview(id: number | string) {
    return this.http.post(environment.baseUrl + "/content/GetSymbolOverview", this.createRequest(id)).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getWatchListSymbols() {
    return this.http.post(environment.baseUrl + "/content/GetWatchListSymbols", this.createRequest(null)).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getWatchList() {
    return this.http.post(environment.baseUrl + "/content/GetWatchList", this.createRequest(null)).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getAlertList() {
    return this.http.post(environment.baseUrl + "/content/GetAlertList", this.createRequest(null)).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getSymbolOpportunities(data) {
    return this.http.post(environment.baseUrl + "/content/GetSymbolOpportunities", this.createRequest(data)).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getWatchListOpportunities() {
    return this.http.post(environment.baseUrl + "/content/GetWatchListOpportunities", this.createRequest(null)).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  checkResponse(response, alertEnabled = false): any {
    if (response.success) {
      if (alertEnabled) {
        let alertObject: AlertObject = { title: response.message, icon: 'success' };
        this.notificationService.processNotification(alertObject);
      }
      return response.data;
    }
    else {
      if (alertEnabled) {
        let alertObject: AlertObject = { title: response.message, icon: 'error' };
        this.notificationService.processNotification(alertObject);
      }
      console.error(response.message);
      return null;
    }
  }

  
  createRequest(data = null, user = null): any {
    if (user == null) {
      let userData = this.authService.getUser();
      if (userData != null)
        user = userData.user;
    }
    let requestObject = { data: data, user: user };
    return requestObject;
  }
  
}

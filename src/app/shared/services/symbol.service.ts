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
export class SymbolService {

  constructor(private http: HttpClient, private authService: AuthService, private notificationService: NotificationService) { }

  getSymbolList() {
    return this.http.get(environment.baseUrl + "/symbol/GetSymbolList").pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getSymbol(id: number | string) {
    return this.http.get(environment.baseUrl + "/symbol/GetSymbol/" + id).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getSymbolSearch(symbol: number | string) {
    return this.http.get(environment.baseUrl + "/symbol/GetSymbolSearch/" + symbol).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getADR(companyId, exchangeId) {
    return this.http.get(environment.baseUrl + "/symbol/GetADR/" + companyId + "/" + exchangeId).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getKeyStats(id) {
    return this.http.get(environment.baseUrl + "/symbol/GetKeyStats/" + id).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getIncome(id) {
    return this.http.get(environment.baseUrl + "/symbol/GetIncome/" + id).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  getEarningsList(id) {
    return this.http.get(environment.baseUrl + "/symbol/GetEarningsListBySymbolId/" + id).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  getNextEarnings(id) {
    return this.http.get(environment.baseUrl + "/symbol/GetNextEarningsBySymbolId/" + id).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getEarnings(id) {
    return this.http.get(environment.baseUrl + "/symbol/GetEarningsById/" + id).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getDividendList(id) {
    return this.http.get(environment.baseUrl + "/symbol/GetDividendListBySymbolId/" + id).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getNextDividend(id) {
    return this.http.get(environment.baseUrl + "/symbol/GetNextDividendBySymbolId/" + id).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getExchangeList() {
    return this.http.get(environment.baseUrl + "/symbol/getExchanges").pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  
  getCompetitors(id) {
    return this.http.get(environment.baseUrl + "/symbol/GetCompetitors/" + id).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  getCompanyExchanges(id) {
    return this.http.get(environment.baseUrl + "/symbol/GetCompanyExchanges/" + id).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  getSiteList() {
    return this.http.get(environment.baseUrl + "/symbol/GetSiteList").pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  getOtherPredictionsList(id) {
    return this.http.get(environment.baseUrl + "/symbol/GetOtherPredictionsList/" + id).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  saveOtherPredictionData(data) {
    return this.http.post(environment.baseUrl + "/symbol/SaveOtherPredictionData", data, httpOptions).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  getPeerComparison(symbolId, earningsId) {
    return this.http.get(environment.baseUrl + "/symbol/GetCompetitorComparison/" + symbolId + "/" + earningsId).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  getEarningsHistoricalAnalysis(ticker, date) {
    return this.http.get(environment.baseUrl + "/symbol/CalculateChangeInFourDayRange/" + ticker + "/" + date).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  getObservableSymbolList() {
    return this.http.get(environment.baseUrl + "/symbol/GetObservableSymbolList").pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getRealTimeData(id) {
    return this.http.get(environment.baseUrl + "/symbol/GetRealTimeData/" + id).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }



  updateCompetitors(competitorList) {
    return this.http.post(environment.baseUrl + "/symbol/UpdateCompetitors", this.createRequest(competitorList)).pipe(
      map((response: any) => this.checkResponse(response, true))
    );
  }
  addCompetitors(competitorList) {
    return this.http.post(environment.baseUrl + "/symbol/AddCompetitors", this.createRequest(competitorList)).pipe(
      map((response: any) => this.checkResponse(response, true))
    );
  }

  removeCompetitor(id) {
    //  return this.http.post(environment.baseUrl + "/symbol/RemoveCompetitor", this.createRequest(id)).pipe(
    //     map((response: any) => this.checkResponse(response, true))
    //   );
    return this.http.post(environment.baseUrl + "/symbol/RemoveCompetitor", this.createRequest(id)).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  newEarnings(earnings) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/symbol/NewEarnings", this.createRequest(earnings))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  reEps(eps) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/symbol/ReEps", this.createRequest(eps))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }
  reForecastEps(eps) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/symbol/ReForecastEps", this.createRequest(eps))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  reRevenue(revenue) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/symbol/ReRevenue", this.createRequest(revenue))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }
  reForecastRevenue(revenue) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/symbol/ReForecastRevenue", this.createRequest(revenue))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  reEarningsDate(earnings) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/symbol/ReEarningsDate", this.createRequest(earnings))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }
  setNextEarnings(earnings) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/symbol/SetNextEarningsDate", this.createRequest(earnings))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  getAllFrequencyTypeList() {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.get(environment.baseUrl + "/symbol/GetAllFrequencyTypes")
      .pipe(
        map((response: any) => this.checkResponse(response))
      );
  }

  newDividend(dividend) {
      //your code for checking credentials and getting tokens for for signing in user
      return this.http.post(environment.baseUrl + "/symbol/NewDividend", this.createRequest(dividend))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  reDividend(dividend) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/symbol/ReDividend", this.createRequest(dividend))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  reYield(yieldData) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/symbol/ReYield", this.createRequest(yieldData))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }
 
  reDividendDate(dividend) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/symbol/ReDividendDate", this.createRequest(dividend))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }
  rePaymentDate(dividend) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/symbol/RePaymentDate", this.createRequest(dividend))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }
  reFrequencyType(dividend) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/symbol/ReFrequency", this.createRequest(dividend))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }
  setNextExDividendDate(dividend) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/symbol/SetNextExDividendDate", this.createRequest(dividend))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  getOtherPredictionsWithEarningsList(symbolId) {
    return this.http.get(environment.baseUrl + "/symbol/GetOtherPredictionsWithEarningsList/" + symbolId).pipe(
      map((response: any) => this.checkResponse(response))
    );
  }

  getOtherPredictionSiteList() {
    return this.http.get(environment.baseUrl + "/symbol/GetOtherPredictionSiteList").pipe(
      map((response: any) => this.checkResponse(response))
    );
  }
  
  rePrediction(prediction) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/symbol/RePrediction", this.createRequest(prediction))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
      );
  }

  reWeight(competitor) {
    //your code for checking credentials and getting tokens for for signing in user
    return this.http.post(environment.baseUrl + "/symbol/ReWeight", this.createRequest(competitor))
      .pipe(
        map((response: any) => this.checkResponse(response, true))
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
  createRequest(data): any {
    let requestObject = { data: data, user: this.authService.getUser().user };
    return requestObject;
  }

}

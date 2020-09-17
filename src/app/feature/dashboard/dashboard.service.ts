import { CountryDailyTimeline } from './../../core/ctry-daily-timeline.model';
import { CountryTotalTimeline } from 'src/app/core/ctry-total-timeline.model';
import { Injectable } from '@angular/core';
import { Covid19Data } from 'src/app/core/covid19Data.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private covid19Summary: Covid19Data;
  private countryTotalTLdata: CountryTotalTimeline[];
  private countryDailyTLdata: CountryDailyTimeline[];

  public _refreshPage = new Subject<void>();

  get refreshPage() {
    return this._refreshPage;
  }
  
  constructor() { }

  setCovid19Summary(covid19Data: Covid19Data) {
    console.log("in setting value inside dashboard service")
    this.covid19Summary = covid19Data;
  }

  getCovid19Summary():Covid19Data {
    return this.covid19Summary;
  }

  setCountryTotalTimeline(CountryTotalTimeline: CountryTotalTimeline[]) {
    this.countryTotalTLdata = CountryTotalTimeline;
  }
  getCountryTotalTimeline(): CountryTotalTimeline[] {
    return this.countryTotalTLdata;
  }

  setCountryDailyTimeline(CountryDailyTimeline: CountryDailyTimeline[]) {
    this.countryDailyTLdata = CountryDailyTimeline;
  }
  getCountryDailyTimeline(): CountryDailyTimeline[] {
    return this.countryDailyTLdata;
  }
}

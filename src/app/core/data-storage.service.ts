import { CountryDailyTimeline } from './ctry-daily-timeline.model';
import { CountryTotalTimeline } from './ctry-total-timeline.model';
import { Covid19Data } from './covid19Data.model';
import { OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { DashboardService } from '../feature/dashboard/dashboard.service';
import { Observable } from 'rxjs';
import { CountryCodeDetail } from '../feature/dashboard/graph-section/graph-section.component';


@Injectable({
    providedIn: 'root'
})

export class DataStorageService implements OnInit {
    private countryCode: string = 'IN';

    constructor(private http: HttpClient, private dashboardService: DashboardService) { }

    ngOnInit() {
    }
  

    covid19Summary(): Observable<Covid19Data> {
        return this.http.get<Covid19Data>("https://api.covid19api.com/summary")
            .pipe(
                tap(res => {
                    this.dashboardService.setCovid19Summary(res)
                })
            );
    }
    CountryTotalTimeline(): Observable<CountryTotalTimeline[]> {
        return this.http.get<CountryTotalTimeline[]>("https://api.coronatracker.com/v3/analytics/trend/country?countryCode=" + this.countryCode + "&startDate=2020-03-01&endDate=2020-06-29")
            .pipe(
                tap(res => {
                    this.dashboardService.setCountryTotalTimeline(res)
                })
            );
    }
    CountryDailyTimeline(): Observable<CountryDailyTimeline[]> {
        return this.http.get<CountryDailyTimeline[]>("https://api.coronatracker.com/v3/analytics/newcases/country?countryCode=" + this.countryCode + "&startDate=2020-04-01&endDate=2020-06-29")
            .pipe(
                tap(res => {
                    this.dashboardService.setCountryDailyTimeline(res)
                })
            );
    }

    SelectionCountryCode(codeDetails: CountryCodeDetail) {
        this.countryCode = codeDetails.countryCode;
        this.CountryTotalTimeline().subscribe();
        this.CountryDailyTimeline().subscribe();
    }

}
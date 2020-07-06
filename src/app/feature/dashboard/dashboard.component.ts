import { DashboardService } from './dashboard.service';
import { DataStorageService } from 'src/app/core/data-storage.service';
import { CountryPosition } from './../../core/ctry-position.model';
import { CountryDailyTimeline } from './../../core/ctry-daily-timeline.model';
import { CountryTotalTimeline } from './../../core/ctry-total-timeline.model';
import { Covid19Data } from 'src/app/core/covid19Data.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, timer, forkJoin, Subject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ThemeService } from 'src/app/core/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isDarkTheme: Observable<boolean>;

  covid19APIdata: Covid19Data;
  TotalTimelineData: CountryTotalTimeline;
  DailyTimelineData: CountryDailyTimeline;
  CountryPositionData: CountryPosition;
  currentDateTime: string = '';

  subscription: Subscription;
  statusText: any;

  constructor(
    private route: ActivatedRoute,
    private DataStorageService: DataStorageService,
    private dashboardService: DashboardService,
    private themeService: ThemeService) {  }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
    
    this.covid19APIdata = this.route.snapshot.data.Covid19SummaryDataResolver;
    this.TotalTimelineData = this.route.snapshot.data.TotalTimelineResolver;
    this.DailyTimelineData = this.route.snapshot.data.DailyTimelineResolver;
    this.getDateTime();

    this.subscription = timer(0, (1000 * 60) * 60).pipe(
      switchMap(() => forkJoin(
        this.DataStorageService.covid19Summary(),
        this.DataStorageService.CountryTotalTimeline(),
        this.DataStorageService.CountryDailyTimeline()
      )
      )
    ).subscribe(result => {
      this.dashboardService._refreshPage.next();
      this.getDateTime();
      this.statusText = result
    });
  }
  getDateTime() {
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.currentDateTime = date + ' ' + time + ' GMT +0503(India Standard Time)';
  }

}

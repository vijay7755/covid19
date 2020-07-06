import { DataStorageService } from 'src/app/core/data-storage.service';
import { DashboardService } from './../dashboard.service';
import { CountriesData } from './../../../core/covid19Data.model';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Covid19Data } from 'src/app/core/covid19Data.model';
import { CountryTotalTimeline } from 'src/app/core/ctry-total-timeline.model';
import { CountryDailyTimeline } from 'src/app/core/ctry-daily-timeline.model';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/core/theme.service';

export interface CountryCodeDetail {
  country: string,
  countryCode: string
}

@Component({
  selector: 'app-graph-section',
  templateUrl: './graph-section.component.html',
  styleUrls: ['./graph-section.component.scss']
})
export class GraphSectionComponent implements OnInit {
  isDarkTheme: Observable<boolean>;
  chart = [];
  private covidData: Covid19Data;
  private totalTimelineData: CountryTotalTimeline[];
  private dailyTimelineData: CountryDailyTimeline[];
  GlobalRecovered: number;
  GlobalDeath: number;
  countryData: CountriesData[];
  active: string = 'actual';
  selectedCountry: CountryCodeDetail = { country: '', countryCode: '' };
  confrimedCases: number[] = [];
  deathCases: number[] = [];
  recoveredCases: number[] = [];
  updatedOn: string[] = [];
  countryLists: CountryCodeDetail[] = [];
  selecteChartTitle: string = 'India';


  constructor(
    private dashboardService: DashboardService,
    private DataStorageService: DataStorageService,
    private themeService: ThemeService) { }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.dashboardService.refreshPage.subscribe(() => {
      this.getValues();
    })
    this.getValues();
  }

  private getValues() {
    this.covidData = this.dashboardService.getCovid19Summary();
    this.GlobalRecovered = this.covidData.Global.TotalRecovered;
    this.GlobalDeath = this.covidData.Global.TotalDeaths;
    this.countryData = this.covidData.Countries;

    this.countryData.forEach(element => {
      let countryOBJ: CountryCodeDetail = { country: '', countryCode: '' };
      countryOBJ.country = element.Country;
      countryOBJ.countryCode = element.CountryCode;
      this.countryLists.push(countryOBJ);
    });

    this.TimeLineData();
  }

  TimeLineData() {
    this.totalTimelineData = this.dashboardService.getCountryTotalTimeline();
    this.dailyTimelineData = this.dashboardService.getCountryDailyTimeline();

    this.ChartParamsAssigner(this.active);
      this.chartMethod();
  }
  getGraphTabCss(state: string) {
    if(this.active === state) {
      return 'active-tab'
    }
    else{
      return 'tab'
    }
      
  }

  ChartParamsAssigner(active: string) {
    this.active = active;
    this.confrimedCases = [];
    this.deathCases = [];
    this.recoveredCases = [];
    this.updatedOn = [];
    switch (active) {
      case 'actual':
        {
          this.totalTimelineData.forEach(element => {
            this.confrimedCases.push(element.total_confirmed);
            this.deathCases.push(element.total_deaths);
            this.recoveredCases.push(element.total_recovered);
            this.updatedOn.push(element.last_updated.toString().slice(2, 10));
          });
            this.chartMethod();
          break;
        }
      case 'daily':
        {
          this.dailyTimelineData.forEach(element => {
            this.confrimedCases.push(element.new_infections);
            this.deathCases.push(element.new_deaths);
            this.recoveredCases.push(element.new_recovered);
            this.updatedOn.push(element.last_updated.toString().slice(2, 10));
          });
            this.chartMethod();
          break;
        }
    }
  }


  chartMethod() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.updatedOn,
        datasets: [
          {
            label: 'Total Confrimed',
            data: this.confrimedCases,
            backgroundColor: 'rgba(58, 100, 238, 0.2)',
            borderColor: 'rgb(58, 100, 238)',
            fill: true
          },
          {
            label: 'Total Death',
            data: this.deathCases,
            backgroundColor: 'rgba(236, 72, 72, 0.8)',
            borderColor: 'rgb(236, 72, 72)',
            fill: true
          },
          {
            label: 'Total Recovered',
            data: this.recoveredCases,
            backgroundColor: 'rgba(26, 170, 26, 0.6)',
            borderColor: 'rgb(26, 170, 26)',
            fill: true
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: this.selecteChartTitle + " Timeline Graph"
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Cases Count',
              stacked: false
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Date',
              stacked: false
            }
          }]
        }
      }
    });
  }

  countrySelector(selection: CountryCodeDetail) {
    this.selectedCountry = selection;
    this.selecteChartTitle = selection.country;
    this.DataStorageService.SelectionCountryCode(this.selectedCountry);

    this.TimeLineData();
  }

}

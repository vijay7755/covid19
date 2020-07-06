import { ThemeService } from './../../../core/theme.service';
import { CountriesData } from './../../../core/covid19Data.model';
import { DashboardService } from './../dashboard.service';
import { Component, OnInit, Input } from '@angular/core';
import { Covid19Data } from 'src/app/core/covid19Data.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-total-confrimed',
  templateUrl: './total-confrimed.component.html',
  styleUrls: ['./total-confrimed.component.scss']
})
export class TotalConfrimedComponent implements OnInit {
  isDarkTheme: Observable<boolean>;

  private covidData: Covid19Data;
  totalConfrimed: number;
  countryData: CountriesData[];


  constructor(private dashboardService: DashboardService, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.dashboardService.refreshPage.subscribe(() => {
      this.getValues();
    })
    this.getValues();
  }
  private getValues() {
    this.covidData = this.dashboardService.getCovid19Summary();
    this.totalConfrimed = this.covidData.Global.TotalConfirmed;
    this.countryData = this.covidData.Countries;
  }

}

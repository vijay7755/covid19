import { DashboardService } from './../dashboard.service';
import { Component, OnInit, NgZone  } from '@angular/core';
import { Covid19Data } from 'src/app/core/covid19Data.model';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/core/theme.service';

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);
// Themes end

export interface chartData  {
  id: string,
  name: string,
  value: number,
  color: string
}

@Component({
  selector: 'app-world-map-chart',
  templateUrl: './world-map-chart.component.html',
  styleUrls: ['./world-map-chart.component.scss']
})
export class WorldMapChartComponent implements OnInit {
  isDarkTheme: Observable<boolean>;
  active = 'TotalConfirmed';
  Records: any;
  count: number;
  private covidData: Covid19Data;
  ConfrimedCases: number;
  private TotalConfirmed: chartData[] = [];
  private TotalDeaths: chartData[] = [];
  private TotalRecovered: chartData[] = [];
  private activeChartData: chartData[] = [];

  constructor(private dashboardService: DashboardService, private zone: NgZone, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.dashboardService.refreshPage.subscribe(() => {
      this.getValues();
    })
    this.getValues();
  }

  private getValues() {
    this.covidData = this.dashboardService.getCovid19Summary();
    this.count = this.covidData.Global[this.active];

    this.covidData.Countries.forEach(element => {
      let chartDataOBJ:chartData = {  id: '', name: '', value: 0, color: ''};
      chartDataOBJ.id = element.CountryCode;
      chartDataOBJ.name = element.Country;
      chartDataOBJ.value = element.TotalConfirmed;
      chartDataOBJ.color = "rgb(0,0,255)";
      this.TotalConfirmed.push(chartDataOBJ);
    });
    this.covidData.Countries.forEach(element => {
      let chartDataOBJ:chartData = {  id: '', name: '', value: 0, color: ''};
      chartDataOBJ.id = element.CountryCode;
      chartDataOBJ.name = element.Country;
      chartDataOBJ.value = element.TotalDeaths;
      chartDataOBJ.color = "rgb(255,0,0)";
      this.TotalDeaths.push(chartDataOBJ);
    });
    this.covidData.Countries.forEach(element => {
      let chartDataOBJ:chartData = {  id: '', name: '', value: 0, color: ''};
      chartDataOBJ.id = element.CountryCode;
      chartDataOBJ.name = element.Country;
      chartDataOBJ.value = element.TotalRecovered;
      chartDataOBJ.color = "rgb(27, 145, 56)";
      this.TotalRecovered.push(chartDataOBJ);
    });
    this.activeChartData = this.TotalConfirmed;
    this.AfterView();
  }

  onClick(cases) {
    this.activeChartData = [];
    this.active = cases;
    this.count = this.covidData.Global[this.active];
    switch (this.active) {
      case 'TotalConfirmed':
        this.activeChartData = this.TotalConfirmed;
        break;
      case 'TotalRecovered':
        this.activeChartData = this.TotalRecovered;
        break;
      case 'TotalDeaths':
        this.activeChartData = this.TotalDeaths;
        break;
      default:
        this.activeChartData = this.TotalConfirmed;
    }
    this.AfterView();
  }

  AfterView() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4maps.MapChart);

      // let title = chart.titles.create();
      // title.text = "[bold font-size: 20]Population of the World in 2011[/]\nsource: Gapminder";
      // title.textAlign = "middle";
      
      chart.geodata = am4geodata_worldLow;

      chart.projection = new am4maps.projections.Miller();
 
      let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.exclude = ["AQ"];
      polygonSeries.useGeodata = true;
      polygonSeries.nonScalingStroke = true;
      polygonSeries.strokeWidth = 0.5;
      polygonSeries.calculateVisualCenter = true;
      
      let imageSeries = chart.series.push(new am4maps.MapImageSeries());
      imageSeries.data = this.activeChartData;
      imageSeries.dataFields.value = "value";
      
      let imageTemplate = imageSeries.mapImages.template;
      imageTemplate.nonScaling = true
      
      let circle = imageTemplate.createChild(am4core.Circle);
      circle.fillOpacity = 0.5;
      circle.propertyFields.fill = "color";
      circle.tooltipText = "{name}: [bold]{value}[/]";
      
      
      imageSeries.heatRules.push({
        "target": circle,
        "property": "radius",
        "min": 4,
        "max": 30,
        "dataField": "value"
      })
      
      imageTemplate.adapter.add("latitude", function(latitude, target) {
        let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext['id']);
        if(polygon){
          return polygon.visualLatitude;
         }
         return latitude;
      })
      
      imageTemplate.adapter.add("longitude", function(longitude, target) {
        let polygon = polygonSeries.getPolygonById(target.dataItem.dataContext['id']);
        if(polygon){
          return polygon.visualLongitude;
         }
         return longitude;
      })   
    });
  }

}

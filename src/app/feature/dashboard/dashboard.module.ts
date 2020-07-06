import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TotalConfrimedComponent } from './total-confrimed/total-confrimed.component';
import { WorldMapChartComponent } from './world-map-chart/world-map-chart.component';
import { GraphSectionComponent } from './graph-section/graph-section.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TotalConfrimedComponent,
    WorldMapChartComponent,
    GraphSectionComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }

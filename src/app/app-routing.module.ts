import { DailyTimelineResolverService } from './core/dailyTimeline-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Covid19SummaryResolverService } from './core/covidSummary-resolver.service';
import { TotalTimelineResolverService } from './core/totalTimeline-resolver.service';



const routes: Routes = [
  {path: '', redirectTo:'/', pathMatch: 'full'},
  { path: '', loadChildren: () => import('./feature/landing-page/landing-page.module').then(m => m.LandingPageModule) },
  { path: 'dashboard',
   loadChildren: () => import('./feature/dashboard/dashboard.module').then(m => m.DashboardModule),
   resolve:{
    Covid19SummaryDataResolver:   Covid19SummaryResolverService,
    TotalTimelineResolver: TotalTimelineResolverService,
    DailyTimelineResolver: DailyTimelineResolverService
    } 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

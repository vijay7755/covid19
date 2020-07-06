import { DataStorageService } from 'src/app/core/data-storage.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryDailyTimeline } from './ctry-daily-timeline.model';

@Injectable({
    providedIn: 'root'
})

export class DailyTimelineResolverService implements Resolve<CountryDailyTimeline[]> {

    constructor(private dataStorageService: DataStorageService) { 
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<CountryDailyTimeline[]>|Promise<CountryDailyTimeline[]>|CountryDailyTimeline[] {
        return this.dataStorageService.CountryDailyTimeline();

    }
}
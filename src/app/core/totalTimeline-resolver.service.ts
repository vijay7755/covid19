import { DataStorageService } from 'src/app/core/data-storage.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Covid19Data } from './covid19Data.model';
import { Observable } from 'rxjs';
import { CountryTotalTimeline } from './ctry-total-timeline.model';

@Injectable({
    providedIn: 'root'
})

export class TotalTimelineResolverService implements Resolve<CountryTotalTimeline[]> {

    constructor(private dataStorageService: DataStorageService) { 
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<CountryTotalTimeline[]>|Promise<CountryTotalTimeline[]>|CountryTotalTimeline[] {
        return this.dataStorageService.CountryTotalTimeline();

    }
}
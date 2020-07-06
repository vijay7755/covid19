import { DataStorageService } from 'src/app/core/data-storage.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Covid19Data } from './covid19Data.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class Covid19SummaryResolverService implements Resolve<Covid19Data> {

    constructor(private dataStorageService: DataStorageService) { 
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Covid19Data>|Promise<Covid19Data>|Covid19Data {
        return this.dataStorageService.covid19Summary();

    }
}

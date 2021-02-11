import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from './core/theme.service';
// import { FormControl, Validators } from '@angular/forms';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDarkTheme: Observable<boolean>;
  isLoading = false;

  constructor(private themeService: ThemeService, private router: Router) {
    router.events.subscribe((routerEvent: RouterEvent) => {
      this.checkRouterEvent(routerEvent);
    });
   }
   
checkRouterEvent(routerEvent: RouterEvent): void {
  if (routerEvent instanceof NavigationStart) {
    this.isLoading = true;
  }

  if (routerEvent instanceof NavigationEnd ||
    routerEvent instanceof NavigationCancel ||
    routerEvent instanceof NavigationError) {
    this.isLoading = false;
  }
   }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
}

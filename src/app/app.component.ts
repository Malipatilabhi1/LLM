import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Jarvis - GenAI Platform';
  sideBarOpen: boolean = true;
  showSidenav: boolean = false; // Add this line

  constructor(private router: Router, private service: CommonService, private headerService: CommonService) {
    this.headerService.getToggleSidenavObservable().subscribe((value) => {
      this.toggleSidenav();
    });
  }

  shouldDisplaySidenav(): boolean {
    const currentRoute = this.router.url;
    return currentRoute !== '/landing';
  }

  get isSidenavOpen(): boolean {
    return this.service.getShowSidenav();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  toggleSidenav() {
    const currentSidenavState = this.service.getShowSidenav();
    this.service.setShowSidenav(!currentSidenavState);
  }
}

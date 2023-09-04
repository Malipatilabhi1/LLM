import { Component, Input } from '@angular/core';
import { NavigationEnd, Router,Event } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  @Input() sidenavVisible: boolean = true;
  dataIngestionSubpagesVisible = false;
finetuneSubpagesVisible = false;
evaluationSubpagesVisible = false;

toggleDataIngestionSubpages() {
  this.dataIngestionSubpagesVisible = !this.dataIngestionSubpagesVisible;
  // Reset the activeRoute when closing the dropdown
  if (!this.dataIngestionSubpagesVisible) {
    this.activeRoute = '';
  }
}

toggleFinetuneSubpages() {
  this.finetuneSubpagesVisible = !this.finetuneSubpagesVisible;
  // Reset the activeRoute when closing the dropdown
  if (!this.finetuneSubpagesVisible) {
    this.activeRoute = '';
  }
}

toggleEvaluationSubpages() {
  this.evaluationSubpagesVisible = !this.evaluationSubpagesVisible;
  // Reset the activeRoute when closing the dropdown
  if (!this.evaluationSubpagesVisible) {
    this.activeRoute = '';
  }
}

activeRoute: string = '';

constructor(private router: Router) {
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.setActiveRoute(event.urlAfterRedirects);
    }
  });
}

setActiveRoute(url: string) {
  if (url.startsWith('/dataIngestion')) {
    this.activeRoute = url; // Set the activeRoute to the full URL of the selected subpage
  } else if (url.startsWith('/modelZoo')) {
    this.activeRoute = url;
  } else if (url.startsWith('/finetune')) {
    this.activeRoute = url;
  } else if (url.startsWith('/evaluation')) {
    this.activeRoute = url;
  } else if (url.startsWith('/moderation')) {
    this.activeRoute = url;
  } else if (url.startsWith('/pipeline')) {
    this.activeRoute = url;
  } else if (url.startsWith('/deployment')) {
    this.activeRoute = url;
  } else {
    this.activeRoute = '';
  }
  console.log(this.activeRoute);
}





  
}

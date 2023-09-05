import { Component, Input } from '@angular/core';
import { NavigationEnd, Router,Event } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
//   @Input() sidenavVisible: boolean = true;
//   dataIngestionSubpagesVisible = false;
selectedOption: string = '';
finetuneSubpagesVisible = false;
evaluationSubpagesVisible = false;
@Input() sidenavVisible: boolean = true;
dataIngestionSubpagesVisible = false;
activeRoute: string = '';
selectedDataIngestionOption: string = ''; 

// toggleDataIngestionSubpages() {
//   this.dataIngestionSubpagesVisible = !this.dataIngestionSubpagesVisible;
//   // Reset the activeRoute when closing the dropdown
//   if (!this.dataIngestionSubpagesVisible) {
//     this.activeRoute = '';
//   }
  
// }

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

constructor(private router: Router,private service:CommonService) {
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.setActiveRoute(event.urlAfterRedirects);
    }
  });
}

// setActiveRoute(url: string) {
//   if (url.startsWith('/dataIngestion')) {
//     this.activeRoute = url;
//   } else if (url.startsWith('/modelZoo')) {
//     this.activeRoute = url;
//   } else if (url.startsWith('/finetune')) {
//     this.activeRoute = url;
//   } else if (url.startsWith('/evaluation')) {
//     this.activeRoute = url;
//   } else if (url.startsWith('/moderation')) {
//     this.activeRoute = url;
//   } else if (url.startsWith('/pipeline')) {
//     this.activeRoute = url;
//   } else if (url.startsWith('/deployment')) {
//     this.activeRoute = url;
//   } else {
//     this.activeRoute = '';
//   }
//   console.log(this.activeRoute);
// }




toggleDataIngestionSubpages() {
    this.dataIngestionSubpagesVisible = !this.dataIngestionSubpagesVisible;
    
    // Reset the selected Data Ingestion option when closing the dropdown
    if (!this.dataIngestionSubpagesVisible) {
        this.selectedDataIngestionOption = '';
    }
}

selectDataIngestionOption(option: string) {
    // Set the selected Data Ingestion option when it's clicked
    this.selectedDataIngestionOption = option;
}
selectOption(option: string) {
  // Set the selected option when it's clicked
  this.selectedOption = option;

  if(option=='/dataIngestion/rawdata' ||option=='/dataIngestion/labelled-data'){
    this.service.toggleShowFolders(true);
    this.service.toggleShowDataList(false);
    this.service.toggleShowDataList1(false);
  }
}

// Modify setActiveRoute to consider the selected Data Ingestion option
setActiveRoute(url: string) {
    // ... (other conditions)

    if (url === this.selectedOption) {
        this.activeRoute = url;
    }else  {
      this.activeRoute = '';
    }
    console.log(this.activeRoute);
}
  
}

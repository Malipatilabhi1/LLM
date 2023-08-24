import { Component } from '@angular/core';
import { NavigationEnd, Router,Event } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  constructor(private router: Router) {
    this.currentRoute = "";
   }
   currentRoute: string;
   dataIngestion:boolean=false;
   Finetuning:boolean=false;
   isArrowUp: boolean = false;

  toggleArrow() {
    this.isArrowUp = !this.isArrowUp;
  }

   selectedOption:string='';
   selectOption(option:string){
      this.selectedOption =option;
  }

  getEndPoint() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        console.log(this.currentRoute);
        if ( this.currentRoute === "/") {
          this.dataIngestion=true;
          this.Finetuning=false;
        }
        else if(this.currentRoute === "/finetune"){
          this.dataIngestion=false;
          this.Finetuning=true;
        }
      }
    });
  }
}

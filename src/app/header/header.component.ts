import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  clear(){
    
    localStorage.clear();
  }
  constructor(private headerService: CommonService) { }

  toggleSidenavInHeader() {
    // Implement your logic here
    console.log('Toggle sidenav from header component');
    this.headerService.toggleSidenav();
  }
}

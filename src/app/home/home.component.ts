import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isSidenavOpen: boolean = false; 

  constructor(private service: CommonService) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  start() {
    this.isSidenavOpen = true; 
  }

}

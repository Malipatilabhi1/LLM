import { Component } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-task-based',
  templateUrl: './task-based.component.html',
  styleUrls: ['./task-based.component.css']
})
export class TaskBasedComponent {

  isSidenavOpen: boolean = false;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.commonService.isOpen$.subscribe((isOpen) => {
      console.log(isOpen);
      this.isSidenavOpen = isOpen;
    });
  }


}


import { Component } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-model-zoo-details',
  templateUrl: './model-zoo-details.component.html',
  styleUrls: ['./model-zoo-details.component.css']
})
export class ModelZooDetailsComponent {

  constructor(private commonService:CommonService){

  }
  Model:any=[];
  Models:any=[];
  selectedModel: any; 
  compareMode: boolean = false;
  ngOnInit(){
    debugger;
    this.Model=this.commonService.model;
    this.Models=this.commonService.models;
  }

  compareModel(model: any) {
    this.selectedModel = model;
    this.compareMode = true;
  }
}


import { Component } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-model-zoo',
  templateUrl: './model-zoo.component.html',
  styleUrls: ['./model-zoo.component.css']
})
export class ModelZooComponent {

  constructor(private commonService:CommonService){

  }

  Models:any=[
    {name:'Llama 1',description:'This is a example Llama model description.This is a example Llama model description This is a example Llama model description This is a example Llama model description This is a example Llama model description This is a example Llama model description'},
    {name:'GPT-4',description:'This is a example GPT-4 description...'},
    {name:'Palm 2',description:' This is example Palm 2 description...'},
    {name:'GPT-3.5',description:'This is a example GPT-3.5 description..'},
  ];

  passData(model:any,i:number){
    model.index = 'Model '+i;
    this.commonService.modelData(model);
    this.commonService.models=this.Models;
  }

}


import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-model-zoo',
  templateUrl: './model-zoo.component.html',
  styleUrls: ['./model-zoo.component.css']
})
export class ModelZooComponent {

  constructor(private commonService:CommonService,private http:HttpClient){

  }
  ngOnInit(){
 this. getModels();
  }

  Models:any=[
    // {name:'Llama 1',description:'This is a example Llama model description.This is a example Llama model description This is a example Llama model description This is a example Llama model description This is a example Llama model description This is a example Llama model description'},
    // {name:'GPT-4',description:'This is a example GPT-4 description...'},
    // {name:'Palm 2',description:' This is example Palm 2 description...'},
    // {name:'GPT-3.5',description:'This is a example GPT-3.5 description..'},
  ];

  passData(model:any,i:number){
    model.index = 'Model '+i;
    this.commonService.modelData(model);
    this.commonService.models=this.Models;
  }

  getModels(){
    this.http.get('http://13.234.148.242:3000/modelZoo/').subscribe({
      next:response => { 
        this.Models=response;
       console.log(response);
      },
      error:error => {
        console.error( error);
   } });

  }

}

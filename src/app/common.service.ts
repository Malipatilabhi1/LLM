import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  uploadedData: any[] = [];
  models:any=[];
  model:any=[];

  modelData(model:any){
    this.model=model;
  }
  uploadedFile(){
    
  }
}

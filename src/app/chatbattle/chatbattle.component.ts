import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbattle',
  templateUrl: './chatbattle.component.html',
  styleUrls: ['./chatbattle.component.css']
})
export class ChatbattleComponent {

  loading = false;
  inputText: string = ''; 
  ModelsData:any=[];

  constructor(private http:HttpClient){

  }

  sendData() {
    this.ModelsData=[];
    this.loading = true;
    let prompt=this.inputText;
    this.http.post('http://13.232.6.134:8005/generate', {prompt}).subscribe(
      response => {
        this.ModelsData=response;
        console.log(this.ModelsData.model_A_response);
        this.loading = false;
      },
      error => {
        console.error('Error sending data:', error);
        this.loading = false;
      }
    );
  }
}

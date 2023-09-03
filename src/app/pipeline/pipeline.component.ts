import { Component } from '@angular/core';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent {
  embedded:boolean=false;
  chatbot:boolean=false;
  flow:boolean=false;
  h2o:boolean=false;
  home:boolean=true;
  selectedCard: string | null = '';

  EmbeddedData:any=[
    {name:'JKTech',desc:'Lorem ipsum dolor sit amet consectetur:Dolor maecenas'},
    {name:'ML',desc:'Lorem ipsum dolor sit amet consectetur:Dolor maecenas'},
    {name:'MR Data Embedding',desc:'Lorem ipsum dolor sit amet consectetur:Dolor maecenas'},
    {name:'Embedding4',desc:'Lorem ipsum dolor sit amet consectetur:Dolor maecenas'},
    {name:'Embedding5',desc:'Lorem ipsum dolor sit amet consectetur:Dolor maecenas'},
    {name:'Embedding6',desc:'Lorem ipsum dolor sit amet consectetur:Dolor maecenas'},
  ]
  clicked(value:any){
    this.selectedCard=value;
    if(value=='card1'){
      this.flow=true;
      this.embedded=false;
      this.chatbot=false;
      this.home=false;
    }else if(value=='card2'){
      this.embedded=true;
      this.chatbot=false;
      this.home=false;
      this.flow=false;
    }if(value=='card3'){
      this.embedded=true;
      this.chatbot=false;
      this.home=false;
      this.flow=false;
    }else if(value=='card4'){
      this.embedded=false;
      this.chatbot=true;
      this.home=false;
      this.flow=false;
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fine-tuning',
  templateUrl: './fine-tuning.component.html',
  styleUrls: ['./fine-tuning.component.css']
})
export class FineTuningComponent {
  disabled = false;
  filePath:any = 'assets/files/JKT_full_data.txt';
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;

  max1=2048;
  step1=128;
  thumbLabel = false;
  rValue = 128;
  rValue1 = 5;
  rValue2 = 5;
  rValue3 = 0;

  lValue = 0;
  lValue1 = 0;
  lValue2 = 0;
  lValue3 = 0;
  LearningRate:any='2e-5';
  weight_decay:any= 0.01;
  strategy:any='value1';
  selectedOption: string = '';
  // showTabs:boolean=true;
  showTraining1:boolean=true;
  showTraining2:boolean=false;
  displayedColumns: string[] = ['checkbox','Source'];
  dataSource = [
    {checked:'false',Source:'Raw Data 1'},
    {checked:'false',Source:'Raw Data 2'},
    {checked:'false',Source:'Raw Data 3'},
    {checked:'false',Source:'Raw Data 4'},
    {checked:'false',Source:'Raw Data 5'},
  ];

  dataSource1 = [
    {checked:'false',Source:'Labelled Data 1'},
    {checked:'false',Source:'Labelled Data 2'},
    {checked:'false',Source:'Labelled Data 3'},
    {checked:'false',Source:'Labelled Data 4'},
    {checked:'false',Source:'Labelled Data 5'},
  ];

  onOptionSelected(): void {
    const selectedOptionLowercase = this.selectedOption.toLowerCase(); 
    if (selectedOptionLowercase.startsWith('jk')) {
      this.readTextFile();
    } else {
      this.content = '';
    }
  }
  
  
  // trainRawData(){
  //   this.showTabs=false;
  //   this.showTraining1=true;
  //   this.showTraining2=false;
  // }
  // trainLabelledData(){
  //   this.showTabs=false;
  //   this.showTraining1=false;
  //   this.showTraining2=true;
  // }
  ngOnInit(){
    this.getFolders();
  }
  Folders:any=[];
  dummy:any=[];
  getFolders(){
    this.http.get('http://13.234.148.242:3000/folders').subscribe(
      response => {     
         this.dummy=response;
        this.Folders=this.dummy.folders; 
      },
      error => {
        console.error( error);
      });
  }

  Back(){
    // this.showTabs=true;
    this.showTraining1=false;
    this.showTraining2=false;
  }
  constructor(private http:HttpClient){

  }
content:any='';
  readTextFile() {
    return this.http.get(this.filePath, { responseType: 'text' }).subscribe(
      (content) => {
        this.content=content;
        console.log(this.content);
      },
      (error) => {
        console.error('Error reading the file:', error);
      }
    );
  }
  
  
}

//JKT_data.txt  ==> dropdown  ==>inside data in textarea
//
// "block_size": 128,

// "dataset_name": "/home/saurabh/Projects/Jarvis-Assets/DomainAdoptation/jk_wiki.txt",

// "model_checkpoint": "tiiuae/falcon-7b",           ==> base mode

// "output_dir": "falcon-output",

// "evaluation_strategy": "epoch",

// "epochs" : 5,

// "learning_rate": 2e-5,

// "weight_decay": 0.01,

// "batch_size": 5
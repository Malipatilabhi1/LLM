import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent {
  chatBattle:boolean=false;
  benchmark:boolean=true;
  chatbot:boolean=false;
  selectedCard: string | null = 'Benchmarks';

  models:any=[
    {name:'upstage/Llama-2-70b-instruct-v2',average:72.95,arc:71.08,mmlu:70.58,tQA:62.25},
    {name:'upstage/Llama-2-70b-instruct',average:72.29,arc:70.9,mmlu:69.8,tQA:60.97},
    {name:'stabilityai/StableBeluga2',average:71.42,arc:71.08,mmlu:68.79,tQA:59.44},
    {name:'augtoma/qCammel-70-x',average:70.97,arc:68.37,mmlu:70.18,tQA:57.47},
    {name:'TheBloke/llama-2-70b-Guanaco-QLoRA-fp16',average:70.63,arc:68.26,mmlu:70.23,tQA:55.69},
    {name:'upstage/llama-65b-instruct',average:69.94,arc:68.86,mmlu:64.77,tQA:59.7},
  ]
  displayedColumns: string[] = ['model', 'average', 'ARC', 'MMLU','TruthfullQA'];
  dataSource=[];

  @ViewChild(MatSort) sort!: MatSort;
  constructor() {
    // Create 100 users
    // const users = Array.from({length: 3}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(this.Models);
  }
  Messages:any=['Got it!','Hello?',`I'm here!`]
  Evaluate(){
    this.dataSource=this.models;
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  selectFunction(value:any){
    this.selectedCard = value;
    if(value=='Benchmarks'){
      this.chatBattle=false;
      this.benchmark=true;
      this.chatbot=false;
    }else if(value=='chatBattle'){
      this.chatBattle=true;
      this.benchmark=false;
      this.chatbot=false;
    }else if(value=='chatbot'){
      this.chatBattle=false;
      this.benchmark=false;
      this.chatbot=true;
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }


/** Builds and returns a new User. */
// function createNewUser(id: number): Model {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

  // return {
  //   name: name,
    // average: Math.round(Math.random() * 5).toString(),
    // fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  // };
}

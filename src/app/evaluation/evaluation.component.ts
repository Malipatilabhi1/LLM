import { HttpClient } from '@angular/common/http';
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
  
  loading1 = false;
  modelsList:any=[];
  selectedModel: string = 'val1'; 
  selectedBenchmark: string = 'val1'; 
  ngOnInit(){
    this.getModels();
  }

  models:any=[
    {name:'upstage/Llama-2-70b-instruct-v2',timestamp:'8/22/2023, 09:43:02 PM',average:72.95,arc:71.08,mmlu:70.58,tQA:62.25},
    {name:'upstage/Llama-2-70b-instruct',timestamp:'8/22/2023, 09:43:02 PM',average:72.29,arc:70.9,mmlu:69.8,tQA:60.97},
    {name:'stabilityai/StableBeluga2',timestamp:'8/22/2023, 09:43:02 PM',average:71.42,arc:71.08,mmlu:68.79,tQA:59.44},
    {name:'augtoma/qCammel-70-x',timestamp:'8/22/2023, 09:43:02 PM',average:70.97,arc:68.37,mmlu:70.18,tQA:57.47},
    {name:'TheBloke/llama-2-70b-Guanaco-QLoRA-fp16',timestamp:'8/22/2023, 09:43:02 PM',average:70.63,arc:68.26,mmlu:70.23,tQA:55.69},
    {name:'upstage/llama-65b-instruct',timestamp:'8/22/2023, 09:43:02 PM',average:69.94,arc:68.86,mmlu:64.77,tQA:59.7},
  ]
  displayedColumns: string[] = ['model','Timestamp', 'average', 'ARC', 'MMLU','TruthfullQA'];

  // options = ['ARC', 'MMLU', 'HellSwag', 'TruthfullQA'];
  options: { name: string; description: string; selected: boolean }[] = [
    { name: 'ARC', description: `AI2's Science-based multiple-choice questions from grade 3 to grade 9`, selected: false },
    { name: 'MMLU', description: 'Evaluates knowledge in 57 subjects, spanning STEM to humanities', selected: false },
    { name: 'HellaSwag', description: 'Tests challenging commonsense NLI questions for AI models', selected: false },
    { name: 'TruthfullQA', description: 'Measures truthfulness in answering questions across 38 categories', selected: false },
    
  ];
  dataSource=[
    { name: '', average: '', arc: '', mmlu: '', tQA: ''},
  ];

  @ViewChild(MatSort) sort!: MatSort;
  constructor(private http: HttpClient) {}
  
  benchMarkResponse:any='';

  assignValue(data:any){
    const selectedModel = this.selectedModel;
    const selectedBenchmark = this.selectedBenchmark;

    this.dataSource=[
      { name: '', average: '', arc: '-', mmlu: '-', tQA: '-'},
    ];
    this.dataSource[0].name = selectedModel;
    this.dataSource[0].average = data["Ceval-valid-advanced_mathematics"];
    if(selectedBenchmark=='ARC'){
      this.dataSource[0].arc = data["Ceval-valid-art_studies"];
    }else if(selectedBenchmark=='MMLU'){
      this.dataSource[0].mmlu = data["Ceval-valid-art_studies"];
    }else if(selectedBenchmark=='TruthfullQA'){
      this.dataSource[0].tQA = data["Ceval-valid-art_studies"];
    }
    
  }

  getModels(){
    this.http.get('http://13.234.148.242:3000/modelZoo/').subscribe({
      next:response => { 
        this.modelsList=response;
       console.log(response);
      },
      error:error => {
        console.error( error);
   } });

  }
  Evaluate(){
    this.benchMarkResponse='';
    this.loading1 = true;
    if (this.selectedModel) {
      const timestamp = new Date().toLocaleString(); 
      setTimeout(() => {
        // this.models.forEach((item: any) => {
        //   item.timestamp = timestamp;
        // });
        if(this.selectedModel !='val1'){
          this.models[0].name = this.selectedModel;
          this.models[0].timestamp=timestamp;
        }else{
          this.models[0].name = 'upstage/Llama-2-70b-instruct-v2';
        }
        
        this.loading1 = false;
        this.dataSource = this.models;
      }, 1000); 
    }

    
  

    // let pretrained='EleutherAI/gpt-neo-1.3B';
    // let tasks = 'Ceval-valid-art_studies,Ceval-valid-advanced_mathematics';

    // this.http.post('http://13.232.6.134:8005/get_benchmark_stats',{pretrained,tasks} ).subscribe(
    //   response => { 
    //     console.log(response);
    //     this.assignValue(response);
    //     this.loading1 = false;
    //   },
    //   error => {
    //     console.error('Error sending data:', error);
    //     this.loading1 = false;
    //   }
    // );
  }
  handleCheckboxChange(option: any) {
    option.selected = !option.selected; 
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
  }

  selectedOption = 'Select Benchmark';
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isDropdownOpen = false;
  }
  
}

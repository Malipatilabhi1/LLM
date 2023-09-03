import { Component, HostListener } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Rule {
  Rule_ID: string;
  Rule_Name: string;
  Description: string;
  path: string;
}
interface RuleCategory {
  [key: string]: Rule[];
}

interface ApiResponse {
  [key: string]: Rule[];
}
@Component({
  selector: 'app-moderation',
  templateUrl: './moderation.component.html',
  styleUrls: ['./moderation.component.css']
})
export class ModerationComponent {
  selectedFile: File | null = null;
  selectedFolder:any='';
  selectedModel:any='option1';
  showLanding:boolean=true;
  showSelect:boolean=false;
  showCustom:boolean=false;
  subTitle:any='';
  dataSource='';
  selectedItems: any[] = [];
  textareaValue:any='';
  loading = false;
  fileName:any='';

  constructor(private http: HttpClient) {
    
  }
  ngOnInit(){
    this.loadSelectRules(); 
  }
  eventEmitter = new EventEmitter<string>();

categoryDataSources: { [categoryName: string]: MatTableDataSource<Rule> } = {};
displayedColumns: string[] = ['checkbox', 'Rules', 'Desc'];
SelectRules: RuleCategory = {}; // Initialize as empty object
paginationSettings: { [categoryName: string]: { pageIndex: number, pageSize: number } } = {};
 
//   const jsonString = `{"Topical":
//   [{"Rule_ID":"T1","Rule_Name":"Profanity Guardrails","Description":"Constraints to keep the conversation out of Profanity and focused on a subject.","path":"https://drive.google.com/file/d/15D90ccGYDaioeYzbd20JMWK2zSwoxw4K/view?usp=sharing"},
//   {"Rule_ID":"T2","Rule_Name":"Politics Guardrails","Description":"Constraints to keep the conversation out of Politics Query and focused on a subject.","path":"https://drive.google.com/file/d/1VXZy-OTxZgTh0X8Nl0sBjMp7qaA7FODX/view?usp=sharing"}],
//   "Safety":
//   [{"Rule_ID":"S1","Rule_Name":"Hallucination","Description":"Guardrails for ensuring that the AI-generated content remains reliable, factual, and aligned with the intended purpose of the application.","path":"https://drive.google.com/file/d/1gENw6SX8zvFQFChF5aHSOMZUCh8ijY6m/view?usp=sharing"},
//   {"Rule_ID":"S2","Rule_Name":"Fact Checking","Description":"Guardrails to ensure that the information generated by a large language model (LLM) is accurate and reliable.","path":"https://drive.google.com/file/d/1gENw6SX8zvFQFChF5aHSOMZUCh8ijY6m/view?usp=sharing"}],
//   "Security":
//   [{"Rule_ID":"SE1","Rule_Name":"Jail-Break Attempt","Description":"Jail-break attempt guardrails are measures to prevent language models from being exploited or manipulated in ways that could compromise security, ethics, or the intended usage of the system.","path":"https://drive.google.com/file/d/1RPKHhJsQy-D_6SE6IfvR1IWldgRk2LcK/view?usp=sharing"}
//   ]}`; 
//   const parsedJson = JSON.parse(jsonString) as RuleCategory;
//   this.SelectRules = parsedJson;
// }
categoryNames: string[] = [];

// loadSelectRules() {
//   const jsonString = `{"Topical":
//   [{"Rule_ID":"T1","Rule_Name":"Profanity Guardrails","Description":"Constraints to keep the conversation out of Profanity and focused on a subject.","path":"https://drive.google.com/file/d/15D90ccGYDaioeYzbd20JMWK2zSwoxw4K/view?usp=sharing"},
//   {"Rule_ID":"T2","Rule_Name":"Politics Guardrails","Description":"Constraints to keep the conversation out of Politics Query and focused on a subject.","path":"https://drive.google.com/file/d/1VXZy-OTxZgTh0X8Nl0sBjMp7qaA7FODX/view?usp=sharing"}],
//   "Safety":
//   [{"Rule_ID":"S1","Rule_Name":"Hallucination","Description":"Guardrails for ensuring that the AI-generated content remains reliable, factual, and aligned with the intended purpose of the application.","path":"https://drive.google.com/file/d/1gENw6SX8zvFQFChF5aHSOMZUCh8ijY6m/view?usp=sharing"},
//   {"Rule_ID":"S2","Rule_Name":"Fact Checking","Description":"Guardrails to ensure that the information generated by a large language model (LLM) is accurate and reliable.","path":"https://drive.google.com/file/d/1gENw6SX8zvFQFChF5aHSOMZUCh8ijY6m/view?usp=sharing"}],
//   "Security":
//   [{"Rule_ID":"SE1","Rule_Name":"Jail-Break Attempt","Description":"Jail-break attempt guardrails are measures to prevent language models from being exploited or manipulated in ways that could compromise security, ethics, or the intended usage of the system.","path":"https://drive.google.com/file/d/1RPKHhJsQy-D_6SE6IfvR1IWldgRk2LcK/view?usp=sharing"}
//   ]}`; 
//   const parsedJson = JSON.parse(jsonString) as RuleCategory;
//   this.SelectRules = parsedJson;
//   this.categoryNames = Object.keys(parsedJson);
// }

initializeCategoryDataSources() {
  for (const categoryName in this.SelectRules) {
    if (this.SelectRules.hasOwnProperty(categoryName)) {
      const dataSource = new MatTableDataSource<Rule>(this.SelectRules[categoryName]);
      this.categoryDataSources[categoryName] = dataSource;
      this.setPage(categoryName, 0, 5);
    }
  }
}

setPage(categoryName: string, pageIndex: number, pageSize: number) {
  this.paginationSettings[categoryName] = { pageIndex, pageSize };

  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  this.categoryDataSources[categoryName].data = this.SelectRules[categoryName].slice(startIndex, endIndex);
}

// toggleSelection(item: any) {
//   const index = this.selectedItems.findIndex(selectedItem => selectedItem.rule === item.rule); 
//   if (index === -1) {
//     const newItem = { ...item, status: 'N/A' }; 
//     this.selectedItems.push(newItem);
//     console.log(this.selectedItems);
//   } else {
//     this.selectedItems.splice(index, 1);
//   }
// }
toggleSelection(item: any) {
  const index = this.selectedItems.findIndex(selectedItem => selectedItem.Rule_Name === item.Rule_Name);
  if (index === -1) {
    const newItem = { ...item, status: 'N/A' };
    this.selectedItems.push(newItem);
  } else {
    this.selectedItems.splice(index, 1);
  }
}
deleteRule(ruleToDelete: any) {
  const index = this.selectedItems.findIndex(rule => rule.Rule_Name === ruleToDelete.Rule_Name);
  if (index !== -1) {
    this.selectedItems.splice(index, 1); 
  }
}


applyRule(){
  this.showSelect=false;
  this.showLanding=true;
}

  Back(){
    this.showLanding=true;
    this.showSelect=false;
  }
  selectRule(){
    
  }
  ButtonTriggerFor(value:any){
    if(value=='selectRule'){
      this.showLanding=false;
      this.showSelect=true;
      this.subTitle='Select Rule';
    }else if(value=='customRule'){
      this.subTitle='Custom Rule';
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.selectedItems.push({ Rule_Name: 'Profanity Guardrails', status: 'N/A' });
    this.selectedItems.push({ Rule_Name: 'Politics Guardrails', status: 'N/A' });
  }
  

  withLLM:any='';
  withoutLLM:any='';
  moderateResponse:any='';

  Moderate(){
    this.loading=true;
    let prompt=this.textareaValue;
    this.http.post<ApiResponse>('http://13.232.6.134:8005/moderate',{prompt}).subscribe(
      (response) => {
        debugger
        this.loading=false;
        this.moderateResponse=response;
        this.withLLM=this.moderateResponse.With_Mod;
        this.withoutLLM=this.moderateResponse.Without_Mod;
      },
      (error) => {
        this.loading=false;
        console.error('Error sending data:', error);
      }
    );
  }
  
  loadSelectRules() {
    this.http.get<ApiResponse>('http://13.232.6.134:8005/select_rules').subscribe(
      (response) => {
        this.SelectRules = response;
        this.categoryNames = Object.keys(response); 
        console.log(this.SelectRules);
        this.initializeCategoryDataSources(); 
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
  }

  saveRuleBook(){
    let name=this.fileName;
    let data={

      "Topical": ["/home/ubuntu/abhijit/GenAI_Platform/colangs/Topical/co_profanity.txt"],
  
      "Safety" : ["/home/ubuntu/abhijit/GenAI_Platform/colangs/Safety/co_hallucination.txt"],
  
      "Security" : ["/home/ubuntu/abhijit/GenAI_Platform/colangs/Security/co_jailbreak.txt"],
  
      "Misc":[]
  
  }
    
    this.http.post('http://13.232.6.134:8005/save_rule_book',data,{responseType:'blob'}).subscribe(
      (blob: Blob)=> {
        const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = "MyFile.co"; 
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          console.log("downloaded");
        }, error => {
          console.error('Error downloading file:', error);
      });
  }
  
  
  
  // 
  updateFilteredData(){
    // if(this.selectedModel=='option1'){
    //   this.Rules=[];
    // }else {
    //   this.Rules=[{rule:'Rule 1',status:'Pass'}
    // ,{rule:'Rule 2',status:'Pass'},{rule:'Rule 3',status:'Pass'},{rule:'Rule 4',status:'Pass'}];
    // }
    
  }
}


import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CommonService } from '../common.service';
import { MatTableDataSource } from '@angular/material/table';
import { Data, UploadedData, dataConfig } from '../app.constant';
import { MatStepper } from '@angular/material/stepper';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent {
  @ViewChild(MatStepper) stepper!: MatStepper;
  folderName: string = '';
  labelledFile:string='';
  labelledDesc:string='';
  showFolders:boolean=true;
  showDataList:boolean=false;
  showCreate:boolean=false;
  showPrompt:boolean=false;
  selectedFolder:any='show';
  selectedFolder1:any='';
  filteredRawData: string[] = [];
  displayedColumns: string[] = ['File Name', 'File Type', 'Date','Description','Actions'];
  dataSource:any=[];
  Folders:any=[];
  RawData:any=[];
  selectAllChecked:boolean=false;
  loading:boolean=false;

  Task:any=['Q&A','Summarizing','Custom']
  isEditable = true;

  selectedOption: string = 'option1'; 
  seedsExample:any='';
  prompt:any='';
  rows:number=11;
  onOptionSelected(newValue: string) {
    this.selectedOption = newValue; 
    if(newValue=='Custom'){
      this.showPrompt=true;
      this.rows=6;
    }else{
      this.showPrompt=false;
      this.rows=11;
    }

    if(newValue=='Q&A'){
      this.seedsExample= 
      `Question:" What is the function of red blood cells?"
Answer: "Red blood cells carry oxygen from the lungs to the body's tissues."

Question:" What is the main symptom of gastroesophageal reflux disease (GERD)?"
Answer: "The main symptom of GERD is chronic heartburn."

Question": Which hormone regulates blood sugar levels?"
Answer: "Insulin regulates blood sugar levels."

Question: "What is the common treatment for bacterial infections?"
Answer: "Antibiotics are commonly used to treat bacterial infections."

Question: "Which hormone regulates blood sugar levels? "
Answer: "Insulin regulates blood sugar levels."`
    }else if(newValue=='Summarizing'){
      this.seedsExample=
    `Text:
Hypertension, also known as high blood pressure,is a common medical condition.It occurs when the force of blood against the artery walls is consistently too high.If left untreated, hypertension can lead to serious health complications such as heart disease and stroke.
Summary :
Hypertension, or high blood pressure, poses risks like heart disease and stroke if untreated due to elevated arterial pressure.

Text:
Diabetes is a metabolic disorder characterized by high blood sugar levels. It occurs either due to insufficient insulin production or ineffective use of insulin by the body.Management includes dietary changes, medication, and regular monitoring of blood glucose levels.
Summary:
Diabetes, a metabolic disorder with high blood sugar, requires management involving dietary changes, medication, and blood glucose monitoring.

Text:
Cancer is a complex group of diseases involving abnormal cell growth. It can occur in various body parts and has different forms, including carcinomas and sarcomas.Early detection and treatment are crucial for improved outcomes.
Summary:
Cancer, a group of diseases with abnormal cell growth, varies in types like carcinomas and sarcomas, stressing early detection and treatment.`
    }else if(newValue=='Custom'){
      this.prompt=`Define your task
Ex:"Translate the following English sentences into French"`
      this.seedsExample=`Define the format:
Input: How your input data looks like...
Output: How your ouput should look like for the given input ...
Ex:
   1.EN : "Hello, how are you?" 
      FR : "Bonjour, comment ça va ?"
   2.EN : "I love to read books."
      FR : "J'adore lire des livres."
   3.EN : "Can you help me with this?"
      FR : "Pouvez-vous m'aider avec cela ?"
   4.EN : "Today is a beautiful day."
      FR : "Aujourd'hui est une belle journée."
   5.EN : "What's your favorite color?"
      FR  :"Quelle est ta couleur préférée ?`
    }
    
  }
  
  FolderClicked(folderName:any){
    this.showFolders=false;
    this.showDataList=false;
    this.showCreate=true;
    this.selectedFolder1=folderName; 
}
// toggleSelectAll() {
//   this.selectAllChecked = !this.selectAllChecked;
//   // Loop through RawData and set the selected property for each item
//   this.RawData.forEach((data: any) => {
//     data.selected = this.selectAllChecked;
//   });
// }


updateFilteredData() {
  if (this.selectedFolder.toLowerCase().startsWith('jk')) {
    const storedData = localStorage.getItem('dataSource');
    if (storedData) {
      const data = JSON.parse(storedData);
      this.RawData = data.map((item: any) => ({
        name: item.name,
        selected: false, 
      }));
      console.log(this.RawData);
    } else {
      this.RawData = [];
    }    
  } else {
    this.RawData = [];
    this.selectAllChecked = false; 
  }
}

toggleSelectAll() {
  this.RawData.forEach((item: any) => {
    item.selected = this.selectAllChecked;
  });
}


goToNextStep() {
  this.stepper.next(); 
}
// 'File Name', 'File Type', 'Date','Description','Actions'
labelledData:any=[];
saveData(){
  let filename=this.labelledFile;
  let desc=this.labelledDesc;
  let date=new Date().toLocaleString();
  let type='csv';
  let data=this.questions;
  this.labelledData=[{filename,type,date,desc,data}];
  this.dataSource=this.labelledData;

  this.showDataList=true;
  this.showFolders=false;
  this.showCreate=false;
  this.showPrompt=false;
}
Back(){
  this.showFolders=true;
  this.showDataList=false;
  this.showCreate=false;
  this.showPrompt=false;
}

seedExamples(value:any){
    if(value=='Q&A'){

    }else if(value=='Summarizing'){

    }else if(value=='Custom'){

    }
}



  
  constructor(private http:HttpClient,private service:CommonService){}

  ngOnInit(){
    this.getFolders();
    this.getRawdataFolders();

    this.service.showFolders$.subscribe((showFolders) => {
      this.showFolders = showFolders;
    });

    this.service.showDataList$.subscribe((showDataList) => {
      this.showDataList = showDataList;
    });

    this.service.showDataList$.subscribe((showDataList) => {
      this.showCreate = showDataList;
    });

  }

  dummy:any;
  getFolders(){
    this.http.get('http://13.234.148.242:3000/folders-labelled').subscribe(
      response => {     
         this.dummy=response;
        this.Folders=this.dummy.folders; 
      },
      error => {
        console.error( error);
      });
  }

  deleteFolders(folderName:any) {
    this.http.delete(`http://13.234.148.242:3000/delete-folder/${folderName}`).subscribe({
      next:response => { 
        console.log(response);
      },
      error:error => {
        console.error( error);
   } });
  }

  createFolder() {
    this.http.post(`http://13.234.148.242:3000/create-folder-labelled/${this.folderName}`,{}).subscribe({
      next:response => { 
       
      },
      error:error => {
        console.error( error);
   } });

    if (this.folderName.trim() !== '') { 
      this.Folders.push(this.folderName); 
      this.folderName = ''; 
      console.log('Folders:', this.Folders);
    }
  }

  downloadFile(){
    let filename='JKT_data.txt'
    this.http.get(`http://13.234.148.242:3000/download/${filename}`).subscribe(
      response => {     
         console.log(response);
      },
      error => {
        console.error( error);
      });
  }

  rawdataFolders:any=[];
  dummy1:any=[];
  getRawdataFolders(){
    this.http.get('http://13.234.148.242:3000/folders').subscribe(
      response => {
         this.dummy1=response;
        this.rawdataFolders=this.dummy1.folders; 
      },
      error => {
        console.error( error);
      });
  }

  downloadFiles() {
    const fileUrl = 'assets/files/JK_data_Q&A.csv';

    this.http.get(fileUrl, { responseType: 'blob' }).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'JK_data_Q&A.csv';
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  generatedQuestions:any='';
  LoadQuestion(){
    this.loading=true;
    setTimeout(() => {
      this.generatedQuestions=this.questions; 
      this.loading=false;
    }, 1000);
  }



 questions:any= `
"Question": "What is JK Tech's Digital Transformation Philosophy?",
"Answer": "JK Tech's Digital Transformation Philosophy is to protect, optimize and transform customer's technology landscape to support business growth and operational efficiencies where it matters."
   
"Question": "What is JK Tech's Digital Transformation Framework?",
"Answer": "JK Tech's Digital Transformation (DT) framework is focused towards aligning the digital solutions for enterprise goals and realizing ROI sooner. They help customers define their Digital Strategy, work with end-users for defining UX and User Acquisition process and deliver continuously (CI/CD)."
   
"Question": "What is JK Tech's Digital Centre of Excellence?",
"Answer": "JK Tech's dedicated digital centre of excellence is equipped with highly experienced strategists and technologists in their respective technology areas covering Mobile Architects, Web Architects, Senior UX Developers, Angular developers, AI/Automation enthusiasts, and analytics experts."
  
"Question": "What does JK Tech offer in terms of Digital Transformation Strategy?",
"Answer": "As one of the leading Digital Transformation companies, JK Tech helps businesses define their road map to success step by step and architect the right solutions and frameworks for sustainable innovation and superior experience."
    
"Question": "What is digital transformation?",
"Answer": "Digital Transformation is the process of employing digital solutions to create or modify business processes to meet changing business and market requirements. This involves leveraging technology to enable businesses to achieve growth through enhancing customer experience. The term is not only restricted to technology but delves deeper into formulating a strategy to propel organizations into the digital vanguard."
   
"Question": "How does JK Tech help in customer experience?",
"Answer": "JK Tech helps in redesigning customer experience in various stages of customer journey like acquisition, engagement & retention and brings in customer analytics to gauge their perceptions and preferences."
   
"Question": "What are JK Tech's Business Analytics solutions?",
"Answer": "JK Tech Business Analytics solutions combine world-class business and technology patterns with market-disrupting innovation to provide a different mindset and increased flexibility for digital transformation."
   
"Question": "What is Intelligent Automation?",
"Answer": "Intelligent Automation refers to the use of automation technologies, such as robotic process automation (RPA), artificial intelligence (AI), and machine learning (ML), to automate and optimize business processes. JK Tech's Intelligent Automation Centre of Excellence offers a suite of tools, services, and expertise to help organizations standardize, stabilize, accelerate, and expand their automation capabilities."
   
"Question": "What are the benefits of JK Tech's Cloud Solutions?",
"Answer": "JK Tech's Cloud Solutions help organizations experience an intelligent infrastructure that complements their enterprise and generates new avenues of revenue stream through disruptive cloud patterns and benefits."
   
"Question": "What is Digitization?",
"Answer": "Digitization is converting data and information into a digital form. This conversion into a digital format means that the information can be used by a computer system. This allows extracting information or data that can be processed and analyzed. This means that it also involves the automation of manual and paper-based processes."
   
"Question": "What is Digitalization?",
"Answer": "Digitalization is employing technologies and digitized data to improve business operations. Digitalization cannot occur without digitization as it embraces the ability of digital technology to capture and assess data to make better business decisions and enable new business models."
   
"Question": "What is Digital Transformation?",
"Answer": "Digital Transformation is the holistic implementation of technology across various processes involved in business to ensure fundamental changes. This results in increased efficiency, and improved business agility and thus ensures the satisfaction of employees, customers, and stakeholders. Digital Transformation involves a strategic approach that relies on the integration of digitized data and digitalized applications."
   
"Question": "Why is Digital Transformation important for an organization?",
"Answer": "Digital Transformation is important for an organization because it allows them to adapt to the changing market dynamics and improve their competitiveness. It enables organizations to streamline and digitalize their operations, resulting in increased efficiency, improved business agility, and better customer experience. Digital Transformation also enables organizations to leverage data and technology to make better business decisions and explore new business models."
   
"Question": "What are the key benefits of adopting Digital Transformation for businesses?",
"Answer": "Increased operational efficiency and increased productivity." `
  
}

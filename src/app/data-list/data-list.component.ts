
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CommonService } from '../common.service';
import { MatTableDataSource } from '@angular/material/table';
import { Data, UploadedData, dataConfig } from '../app.constant';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent {
  @ViewChild(MatStepper) stepper!: MatStepper;
  folderName: string = '';
  showFolders:boolean=true;
  showDataList:boolean=false;
  showCreate:boolean=false;
  showPrompt:boolean=false;
  selectedFolder:any='';
  displayedColumns: string[] = ['File Name', 'File Type', 'Date','Description','Actions'];
  dataSource:any=[];
  Folders:any=['Marketing','Sales','Operations','Finance and Accounting','Human Resources'];
  RawData:any=['Raw Dataset 1','Raw Dataset 2','Raw Dataset 3','Raw Dataset 4','Raw Dataset 5'];

  Task:any=['Q&A','Summarizing','Custom']
  isEditable = true;

  selectedOption: string = 'option1'; 

  onOptionSelected(newValue: string) {
    this.selectedOption = newValue; 
    if(newValue=='Custom'){
      this.showPrompt=true;
    }
    
  }
  createFolder() {
    if (this.folderName.trim() !== '') { 
      this.Folders.push(this.folderName); 
      this.folderName = ''; 
      console.log('Folders:', this.Folders);
    }
  }
  FolderClicked(folderName:any){
    this.showFolders=false;
    this.showDataList=false;
    this.showCreate=true;
    this.selectedFolder=folderName;
    if(folderName=='new'){
      this.dataSource='';
    }
    else{
      // this.dataSource=this.Data;
    }
}
goToNextStep() {
  this.stepper.next(); // Move to the next step of the mat-stepper
}
saveData(){
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




  // Data=dataConfig;
  // selectedData:any=[];
  // dataSelected:boolean=false;
  // displayedColumns: string[] = ['File Name', 'File Type', 'Date','Status','Actions'];
  // dataSource:any=[];
  // model:any;
  constructor(private commonService:CommonService,private changeDetectorRef: ChangeDetectorRef){
     
  }
//   sendData(name:string){
//     this.model=name;
//   }

//   processData() {
//     this.selectedData = this.Data.filter(data => data.selected);
//     this.dataSelected=true;
//     console.log(this.selectedData);
//  }
//  formattedDate(){
//   const currentDate = new Date();
//   const day = currentDate.getDate();
//   const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
//   const year = currentDate.getFullYear();
//    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
//   }
//  uploadData(data: Data, input: string) { 
//   const date=this.formattedDate();
//    const uploadedItem:UploadedData={...data, inputUrl: input,Date:date}
//    this.commonService.uploadedData.push(uploadedItem);
//    this.dataSource=[];
//    console.log(this.dataSource);
//    this.dataSource=this.commonService.uploadedData; 
   
//  }
//  Ingest(){
//   this.changeDetectorRef.detectChanges();
  
//  }
}

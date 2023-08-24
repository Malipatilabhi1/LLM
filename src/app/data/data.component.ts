import { Component } from '@angular/core';
import { Data, UploadedData, dataConfig } from '../app.constant';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { ModalContentComponent } from '../modal-content/modal-content.component';
declare var $: any;


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  SourceData=dataConfig;
  folderName: string = '';
  displayedColumns: string[] = ['File Name', 'Source', 'File Type', 'Date','Status','Actions'];
  dataSource:any=[];
  showFolders:boolean=true;
  showDataList:boolean=false;
  selectedFolder:any='';
  selectedOption: string = 'option1'; 
  constructor(private router: Router,) {}

  Folders:any=['Marketing','Sales','Operations','Finance and Accounting','Human Resources'];

  Data:any=[{name:'https://drive.google.com/drive/folders',source:'Drive',type:'pdf',date:'08/08/2023 | 11:15',status:'completed',},
            {name:'https://drive.google.com/drive/folders.png',source:'Drive',type:'png',date:'08/08/2023 | 11:15',status:'In-progress',}]

  createFolder() {
    if (this.folderName.trim() !== '') { 
      this.Folders.push(this.folderName); 
      this.folderName = ''; 
      console.log('Folders:', this.Folders);
    }
  }
  FolderClicked(folderName:any){
      this.showFolders=false;
      this.showDataList=true;
      this.selectedFolder=folderName;
      if(folderName=='new'){
        this.dataSource='';
      }
      else{
        this.dataSource=this.Data;
      }
  }
  Back(){
    this.showFolders=true;
      this.showDataList=false;
  }
  

  

  // processData() {
  //    this.selectedData = this.Data.filter(data => data.selected);
  // }
    
  // hasSelectedItems(): boolean {
  //   return this.Data.some(data => data.selected);
  // }

  // formattedDate(){
  // const currentDate = new Date();
  // const day = currentDate.getDate();
  // const month = currentDate.getMonth() + 1; 
  // const year = currentDate.getFullYear();
  //  return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  // }
  // uploadedData: UploadedData[] = []; 
  // uploadData(data: Data, input: string) { 
  //  const date=this.formattedDate();
  //   const uploadedItem:UploadedData={...data, inputUrl: input,Date:date}
  //   this.commonService.uploadedData.push(uploadedItem);
  // }

  
}

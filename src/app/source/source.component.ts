import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {
  @Input() data: any;
  selectedFile: File | null = null;
  selectedFiles: File[] = []; 
  additionalInputs: string[] = []; 
  InputFile:string='';

  showWeb:boolean=false;
  showLocal:boolean=false;

  constructor(
    private dialog: MatDialog,
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public dialogData: any, 
    public dialogRef: MatDialogRef<SourceComponent>
  ) {}

  ngOnInit() {
    if(this.dialogData.name=='URL/Web'){
      this.showWeb=true;
      this.showLocal=false;
    }else if(this.dialogData.name=='Local Storage'){
      this.showWeb=false;
      this.showLocal=true;
    }
  }

  addInputField() {
    this.additionalInputs.push('');
  }
  saveSource() {
    console.log(this.selectedFiles);
   
      // const folderName='Sales';
    
      // const formData = new FormData();
      // for (const file of this.selectedFiles) {
      //   formData.append('files', file);
      // }
      // formData.append('folderName', folderName);
    
  //   this.http.post(`http://13.234.148.242:3000/upload/${folderName}`,formData).subscribe({
  //     next:response => { 
  //      console.log(response);
  //     },
  //     error:error => {
  //       console.error( error);
  //  } });
  }
  saveSource1(){
    localStorage.removeItem('fileName');
     localStorage.setItem('fileName', this.InputFile);
     this.dialog.closeAll(); 
  }
  
  onFileSelected(event: any) {
    
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    } else {
      this.selectedFiles = [];
    }
  }

  
}

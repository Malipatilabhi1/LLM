import { Component, ElementRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { SourceComponent } from '../source/source.component';
import { HttpClient } from '@angular/common/http';

declare var $: any;


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  // SourceData=dataConfig;
  folderName: string = '';
  displayedColumns: string[] = ['File Name', 'Source', 'File Type', 'Date','Status','Actions'];
  dataSource:any=[];
  showFolders:boolean=true;
  showDataList:boolean=false;
  selectedFolder:any='';
  selectedOption: string = 'option1'; 
  constructor(private dialog: MatDialog,private http:HttpClient) {
    // this.dataSource= localStorage.getItem('dataSource');
  }

  localFile:any='';
  ngOnInit(){
    this.getFolders();
    const storedData = localStorage.getItem('dataSource');
    if (storedData) {
      this.dataSource = JSON.parse(storedData);
    } else {
      this.dataSource = [];
    }
    
  }

  Folders:any=[];

  Data:any=[
    // {name:'https://drive.google.com/drive/folders',source:'Drive',type:'pdf',date:'08/08/2023 | 11:15',status:'completed',},
    //         {name:'https://drive.google.com/drive/folders.png',source:'Drive',type:'png',date:'08/08/2023 | 11:15',status:'In-progress',}
          ]
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

  deleteFolders(folderName:any) {
    this.http.delete(`http://13.234.148.242:3000/delete-folder/${folderName}`).subscribe({
      next:response => { 
        console.log(response);
        this.getFolders();
      },
      error:error => {
        console.error( error);
   } });
  }

  createFolder() {
    this.http.post(`http://13.234.148.242:3000/create-folder/${this.folderName}`,{}).subscribe({
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
  
  FolderClicked(folderName:any){
      this.showFolders=false;
      this.showDataList=true;
      this.selectedFolder=folderName;
  }
  Back(){
    this.showFolders=true;
      this.showDataList=false;
  }
  
  showDropdown = false;
  SourceData:any = [
    { name: 'URL/Web', icon: 'assets/images/web.png' },
    { name: 'Local Storage', icon: 'assets/images/local-drive.png' },
    { name: 'Google Drive', icon: 'assets/images/google-drive.png' },
    { name: 'AWS S3', icon: 'assets/images/aws.png' },
    { name: 'Share Point', icon: 'assets/images/sharepoint.png' },
    { name: 'Database', icon: 'assets/images/database.png' },
  ];
  selectedSource: any; 

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  
  openModal(data: any) {
    this.selectedSource = data;
    this.dialog.open(SourceComponent, {
      width: '450px', 
      data: data
    });
  }
  // saveSource() {
  //   this.dialog.closeAll(); 
  // }

 

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
  content:any='';
  viewData(name:any){
    const selectedItem = this.dataSource.find((item:any) => item.name === name);
    this.content='';
    if (selectedItem) {
      this.content = selectedItem.content;
    } else {
      console.log(`Item with name ${name} not found in dataSource`);
    }
  }




  selectedFile: File | null = null;
  selectedFiles: File[] = []; 
  additionalInputs: string[] = []; 
  InputFile:string='';
  showWeb:boolean=false;
  showLocal:boolean=false;

  addInputField() {
    this.additionalInputs.push('');
  }
  
  showProgress:boolean=false;
  Progress:number=0;

  saveSource1() {
    localStorage.clear();
  
    let progress = 1;
    let status = 'In-progress';
    const name = this.InputFile;
    const items = [
      'https://jktech.com/Company',
      'https://jktech.com//Industry',
      'https://jktech.com/Services',
      'https://jktech.com/Success-Stories',
      'https://jktech.com/contact-us'
    ];
  
    if (this.InputFile == 'https://jktech.com/') {
      const newData = { name: 'https://jktech.com/Company', source: '', type: '', date: '', status, progress, content: '' };
      const newData2 = { name: 'https://jktech.com/Industry', source: '', type: '', date: '', status, progress, content: '' };
      const newData3 = { name: 'https://jktech.com/Services', source: '', type: '', date: '', status, progress, content: '' };
      const newData4 = { name: 'https://jktech.com/Success-Stories', source: '', type: '', date: '', status, progress, content: '' };
      const newData5 = { name: 'https://jktech.com/contact-us', source: '', type: '', date: '', status, progress, content: '' };
      this.dataSource = [newData, newData2, newData3, newData4, newData5];
    } else {
      const newData = { name, source: '', type: '', date: '', status, progress, content: '' };
      this.dataSource = [newData];
    }
    this.showProgress = true;
  
    const delayBetweenItems = 1000;
  
    const processItem = (index:any) => {
      const progressInterval = setInterval(() => {
        if (this.dataSource[index].progress < 100) {
          this.dataSource[index].progress += 1;
        } else {
          this.dataSource[index].status = 'Completed';
          clearInterval(progressInterval);
  
          // Store the completed item's data in localStorage or dataSource
          // Here, I'm storing it in localStorage
          localStorage.setItem(`dataSource_${index}`, JSON.stringify(this.dataSource[index]));
          this.dataSource[index]=this.dataSource[index];
  
          // Check if all items are completed to stop the overall progress
          if (this.dataSource.every((data:any) => data.status === 'Completed')) {
            this.showProgress = false;
  
            // Once all items are completed, you can update dataSource with rawData
            this.dataSource = this.rawData.map((item:any) => ({
              name: item.name,
              source: item.source,
              type: item.type,
              date: new Date().toLocaleString(),
              status: 'Completed',
              progress: 100,
              content: item.content,
            }));
  
            // You can also store this updated dataSource in localStorage if needed
            localStorage.setItem('dataSource', JSON.stringify(this.dataSource));
          } else {
            // Proceed to the next item
            processItem(index + 1);
          }
        }
      }, 30);
    };
    processItem(0); // Start processing the first item
  }
  
  
 
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    } else {
      this.selectedFiles = [];
    }
  }

  
  sourceSelected(name:any){
    this.selectedSource=name;
    if(name=='URL/Web'){
      this.showWeb=true;
      this.showLocal=false;
    }else if(name=='Local Storage'){
      this.showWeb=false;
      this.showLocal=true;
    }
  }
  
  
rawData:any=[
        {
            "type": "html",
            "source":"Web",
            "name": "https://jktech.com/Company",
            "folder_name": "jkt_data_web",
            "content": "JK Tech is a leading global provider of Digital and Business Consulting services, committed to delivering exceptional experiences to our clients, people, and the environment. With our deep industry expertise in Retail & CPG, Healthcare, and Insurance, we offer a comprehensive range of solutions that are tailored to meet the unique challenges of our client's businesses. Our niche offerings in Modernization, Hyperautomation, and Data Transformation enable us to deliver innovative and customized solutions that help our clients stay ahead of the competition. At JK Tech, we are dedicated to helping our clients navigate their digital transformation journey and achieve their long-term business goals.As an organization, people are our precious assets, and we value and admire our employees. We endeavor to foster a transparent, diverse, inclusive, and friendly environment and culture that is driven by Collaboration, Respect,Attitude & Passion.Our Purpose Committed to a Superior Experience We are committed to a superior experience in everything we do as an organization, be it for our clients, employees, or the community at large. Over the years, we have retained most of our clients for over a decade through our belief in continuous improvement. ",
            "metadata":  "/home/oem/Desktop/Data_int_and_ing/jkt_data_web/company.txt"           
        },
        {
            "type": "html",
            "source":"Web",
            "name": "https://jktech.com//Industry",
            "folder_name": "jkt_data_web",
            "content": "Unlocking the Power of Data through Hyperautomation End-to-end transformation of businesses by discovering new possibilities and utilizing the potential of Big Data.JK Tech provides niche IT service solutions focused on industries including Retail & CPG, Healthcare & Life Sciences, and Insurance. Our solution leverages the power of Hyperautomation, Data Analytics, AI/ML, and Cloud services to provide a superior Customer Experience. Designed to meet our client 2019s needs, JK Tech's team combines experience, a strategic approach, and leverages partner ecosystem to provide innovative cutting-edge solutions. JK Tech is your one-stop solution provider for transforming your business into a data-driven enterprise.Industries Healthcare & Life Sciences Retail & CPG Insurance Core Digital Transformation Offerings: The Future is Digital JK Tech 2019s Digital Transformation solution unlocks the true potential of your Business.Hyperautomation Data Transformation Modernization Reimagine the Future of the Healthcare & Life Sciences Ecosystem with Us Reshaping an affordable and accessible Healthcare Ecosystem with our Hyperautomation & Data Transformation enabled solutions.The Healthcare landscape has evolved significantly with technological advancement and changing patient requirements. These factors are pushing the existing care delivery models and thus Healthcare & Life Sciences companies constantly face the challenge of transforming for the future, or else face the risk of being left behind. According to a recent report by The American Hospital Association, more than half of U.S. ",
            "metadata": "/home/oem/Desktop/Data_int_and_ing/jkt_data_web/industry.txt"
                    
                
        },
        {
            "type": "html",
            "source":"Web",
            "name": "https://jktech.com/Services",
            "folder_name": "jkt_data_web",
            "content": "DIGITAL TRANSFORMATION SERVICES Does your enterprise struggle to deliver a flawless digital experience that connects and resonates with your customers, employees and visitors. We will help you navigate your digital transformation journey and unlock extraordinary experiences with a range of offerings.Learn More Digital Transformation Banner OUR DIGITAL TRANSFORMATION PHILOSOPHY JK Tech 2019s Digital Transformation Philosophy is to protect, optimize and transform customer 2019s technology landscape to support business growth and operational efficiencies where it matters. DIGITAL TRANSFORMATION FRAMEWORK Our Digital Transformation (DT) framework is focussed towards aligning the digital solutions for enterprise goals and realizing ROI sooner. We help customers define their Digital Strategy , work with end-users for defining UX and User Acquisition process and deliver continuously (CI/CD).",
            "metadata": "/home/oem/Desktop/Data_int_and_ing/jkt_data_web/services.txt"
                    
                
        },
        {
            "type": "html",
            "source":"Web",
            "name": "https://jktech.com/Success-Stories",
            "folder_name": "jkt_data_web",
            "content":"OUR SUCCESS STORIES Accelerating operational efficiency and agility through innovative Data, Analytics, and Hyperautomation for Healthcare & Life Sciences, Retail & CPG, and Insurance businesses.Digitally Transformation multiple business functions to reduce manual efforts, provide productivity boost, and reduce client costs.Modernizing the Purchase Order and Approval system to streamline procurement resulting in the financial stability of the business Enabling Digital Transformation by addressing the major operational challenges faced by the client Enabling Business Transformation by eliminating stock mismatch reconciliation, increasing stock accuracy, and reducing financial risk.JK Tech helps an industrial manufacturer optimize operations and increase revenue with QAD EE Implementation Streamlining & Automating Manual Efforts for a Seamless HITRUST Certification and Re-certification Process Improving Process Time and Integration Through Bulk Update Automation Automating Financial Reporting by Leveraging Qlik Sense OpeLearn Edge PEGA PRPC Integration Helps Reduce Claim Administration Costs and Claim Processing Time Designing a Windows Service to Remove the Dependency on SonicMQ SAP Complete WM: Automation and AIS Integration Increases the Efficiency of Consignment Loading by 80% Empowering Patient-centricity with Enhanced Electronic Medical Records (EMR) Application AS400 TO QAD 2016 EE Re-implementation Direct Purchasing System Integrating Microsoft Azure 2019s Cloud Capabilities & Progress Legacy Application for an Effective Vendor Management Process QAD ERP  ",
            "metadata": "/home/oem/Desktop/Data_int_and_ing/jkt_data_web/success_story.txt"
                    
               
        },
        {
            "type": "html",
            "source":"Web",
            "name": "https://jktech.com/contact-us",
            "folder_name": "jkt_data_web",
            "content": "We are Here To Help! Reach Out To Us Anytime Get in touch with us for your specific queries HQF3, Sector3,Noida 2013 201301, India PHONE+911204606300 MAIL:marketing@jktech.com USA New York JK Tech US Inc. 608, Fifth Avenue, Suite 401, New York, NY 10020 USA Phone:+1-212-586-4066 Email:marketing@jktech.com Fax:+1-212-586-4067 New Jersey JK Tech US Inc. Court Plaza North, 25 Main Street, Suite 207, Hackensack, New Jersey, 07601, USA Phone:+1-732-529-2751 Email:marketing@jktech.com Fax:+1-732-529-2753 UK London JK Tech UK LTD. 107-111 Fleet Street, London, EC4A 2AB, United Kingdom Phone:+44 (0) 20 8528 1021 Email:marketing@jktech.com Fax: Netherlands The Hague JK Tech Europe B.V. World Trade Center, The Hague Business Center, Prinses Margrietplantsoen 33, 2595 AM The Hague, The Netherlands Phone:+31 (0)70 304 3665 Email:marketing@jktech.com Fax: Sri Lanka Colombo JK Tech Orion City, No. 752, Dr Danister De Silva Mawatha, Colombo 00900, Sri Lanka Phone:+94 112 686003 Email:marketing@jktech.com Fax: India Bangalore JK Tech 1465, 13th Cross Rd, 19th Main, HSR Layout, Sector 1, Bengaluru, Karnataka - 560102 Phone:0120-4606300 Email:marketing@jktech.com Fax: Delhi (Registered Office) JK Tech A-2, Shopping Complex, Masjid Moth, G.K. II, New Delhi, India 110048 Phone:011 29222864 Phone:011 29222865 Email:marketing@jktech.com Fax:011 29228048",
            "metadata": "/home/oem/Desktop/Data_int_and_ing/jkt_data_web/contactus.txt"
                    
        }
    ]



}





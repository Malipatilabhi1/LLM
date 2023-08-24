import { Component, HostListener } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { EventEmitter } from '@angular/core';

interface RuleCategory {
  name: string;
  rules: { rule: string; desc: string }[];
}
interface Rule {
  rule: string;
  desc: string;
}

@Component({
  selector: 'app-moderation',
  templateUrl: './moderation.component.html',
  styleUrls: ['./moderation.component.css']
})
export class ModerationComponent {
  selectedFolder:any='';
  showLanding:boolean=true;
  showSelect:boolean=false;
  showCustom:boolean=false;
  dataSource='';
  categoryPanels: MatExpansionPanel[] = [];

  eventEmitter = new EventEmitter<string>();

  // @HostListener('click')
  // clickHandler() {
  //   this.eventEmitter.emit('click', this.categoryPanels[0].categoryName);
  // }

  // ngOnInit() {
  //   this.categoryPanels.forEach((categoryPanel) => {
  //     categoryPanel.click.subscribe(() => {
  //       this.eventEmitter.emit('click', categoryPanel.categoryName);
  //     });
  //   });
  // }

  // displayedColumns: string[] = ['checkbox', 'Rules', 'Desc'];
  Rules:any=[{rule:'Rule 1',status:'Pass'}
    ,{rule:'Rule 2',status:'Pass'},{rule:'Rule 3',status:'Pass'},{rule:'Rule 4',status:'Pass'}];


displayedColumns: string[] = ['checkbox', 'Rules', 'Desc']; 
SelectRules:any=[
{name:'Topical',rules:[
  {rule:'Querying a Knowledge base',desc:'A user query is the question that the end user asks o...'},
  {rule:'Querying a Knowledge base',desc:'A user query is the question that the end user asks o...'},
  {rule:'Querying a Knowledge base',desc:'A user query is the question that the end user asks o...'},
  {rule:'Querying a Knowledge base',desc:'A user query is the question that the end user asks o...'},
  {rule:'Querying a Knowledge base',desc:'A user query is the question that the end user asks o...'},
],},
{name:'Safety', rules:[
  {rule:'Querying a Knowledge base1',desc:'A user query is the question that the end user asks o...'},
  {rule:'Querying a Knowledge base1',desc:'A user query is the question that the end user asks o...'},
  {rule:'Querying a Knowledge base1',desc:'A user query is the question that the end user asks o...'},
  {rule:'Querying a Knowledge base1',desc:'A user query is the question that the end user asks o...'},
  {rule:'Querying a Knowledge base1',desc:'A user query is the question that the end user asks o...'},
]},
{name:'Security',rules:[
  {rule:'Querying a Knowledge base2',desc:'A user query is the question that the end user asks o...'},
  {rule:'Querying a Knowledge base2',desc:'A user query is the question that the end user asks o...'},
  {rule:'Querying a Knowledge base2',desc:'A user query is the question that the end user asks o...'},
  {rule:'Querying a Knowledge base2',desc:'A user query is the question that the end user asks o...'},
  {rule:'Querying a Knowledge base2',desc:'A user query is the question that the end user asks o...'},
],},
{name:'Miscellaneous', rules:[
  {rule:'Querying a Knowledge base3',desc:'A user query is the question that the end user asks o...'},
  {rule:'Querying a Knowledge base3',desc:'A user query is the question that the end user asks o...'},
  {rule:'Querying a Knowledge base3',desc:'A user query is the question that the end user asks o...'},
  {rule:'Querying a Knowledge base3',desc:'A user query is the question that the end user asks o...'},
  {rule:'Querying a Knowledge base3',desc:'A user query is the question that the end user asks o...'},
]}
];

  // Store pagination settings for each panel
  paginationSettings: { [categoryName: string]: { pageIndex: number, pageSize: number } } = {};

  // Create a MatTableDataSource for each rule category
  categoryDataSources: { [categoryName: string]: MatTableDataSource<{ rule: string; desc: string }> } = {};

  setPage(categoryName: string, pageIndex: number, pageSize: number) {
    console.log('SelectRules:', this.SelectRules);
    console.log('categoryName:', categoryName);
    this.paginationSettings[categoryName] = { pageIndex, pageSize };
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    
    const displayedColumns = this.SelectRules.find((category: RuleCategory) => category.name === categoryName)?.rules.map((rule: Rule) => rule.rule) || [];
    
    this.categoryDataSources[categoryName].data = this.SelectRules.find((category: RuleCategory) => category.name === categoryName)?.rules.slice(startIndex, endIndex) || [];

    console.log('startIndex:', startIndex);
    console.log('endIndex:', endIndex);
    }

  Back(){
    this.showLanding=true;
    this.showSelect=false;
  }
  selectRule(){
    this.showLanding=false;
    this.showSelect=true;
  }
}

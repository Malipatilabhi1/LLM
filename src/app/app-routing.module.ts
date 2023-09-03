import { DataListComponent } from './data-list/data-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './data/data.component';
import { ModelZooComponent } from './model-zoo/model-zoo.component';
import { ModelZooDetailsComponent } from './model-zoo-details/model-zoo-details.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { FineTuningComponent } from './fine-tuning/fine-tuning.component';
import { ModerationComponent } from './moderation/moderation.component';
import { TaskBasedComponent } from './task-based/task-based.component';
import { HomeComponent } from './home/home.component';
import { ChatbattleComponent } from './chatbattle/chatbattle.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

const routes: Routes = [
  {path:'dataIngestion',
  data:{hasSubpages:true},
  children:[
    { path:"rawdata",component: DataComponent,pathMatch:"full" }, 
    { path:"labelled-data",component: DataListComponent,pathMatch:"full"  },
  ],},
  { path:"modelZoo", component: ModelZooComponent, pathMatch:"full" },
  { path:"details", component: ModelZooDetailsComponent, pathMatch:"full" },
  {path:'evaluation',
  data:{hasSubpages:true},
  children:[
    { path:"benchmark", component: EvaluationComponent, pathMatch:"full" },
    { path:"chat-battle", component: ChatbattleComponent, pathMatch:"full" },
    { path:"chatbot", component: ChatbotComponent, pathMatch:"full" },
  ],},
  {path:'finetune',
  data:{hasSubpages:true},
  children:[
    { path:"domain-adaptation", component: FineTuningComponent, pathMatch:"full" },
    {path:"taskBased",component:TaskBasedComponent,pathMatch:'full'},
  ],},
  { path:"pipeline", component: PipelineComponent, pathMatch:"full" },
  { path:"moderation", component: ModerationComponent, pathMatch:"full" },
  {path:"",component:HomeComponent,pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

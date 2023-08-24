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

const routes: Routes = [
  { path:"ingestion",component: DataComponent,pathMatch:"full" }, 
  { path:"list",component: DataListComponent,pathMatch:"full"  },
  { path:"modelZoo", component: ModelZooComponent, pathMatch:"full" },
  { path:"details", component: ModelZooDetailsComponent, pathMatch:"full" },
  { path:"evaluation", component: EvaluationComponent, pathMatch:"full" },
  { path:"pipeline", component: PipelineComponent, pathMatch:"full" },
  { path:"finetune", component: FineTuningComponent, pathMatch:"full" },
  { path:"moderation", component: ModerationComponent, pathMatch:"full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

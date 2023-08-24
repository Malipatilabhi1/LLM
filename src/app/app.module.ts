import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { DataComponent } from './data/data.component';
import {MatCardModule} from '@angular/material/card';
import { SideNavComponent } from './side-nav/side-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import { DataListComponent } from './data-list/data-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { ModelZooComponent } from './model-zoo/model-zoo.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { ModelZooDetailsComponent } from './model-zoo-details/model-zoo-details.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { PipelineComponent } from './pipeline/pipeline.component';
import { FineTuningComponent } from './fine-tuning/fine-tuning.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { ModerationComponent } from './moderation/moderation.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DataComponent,
    SideNavComponent,
    DataListComponent,
    ModelZooComponent,
    ModelZooDetailsComponent,
    EvaluationComponent,
    PipelineComponent,
    FineTuningComponent,
    ModalContentComponent,
    ModerationComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    FlexLayoutModule,
    FormsModule,
    MatTooltipModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatExpansionModule,
    MatMenuModule,
    MatSelectModule,
    MatChipsModule,
    MatStepperModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs/jobs.component';
import { SidebarModule } from 'primeng/sidebar';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddeditmodalComponent } from './addeditmodal/addeditmodal.component';
import { InterviewComponent } from './interview/interview.component';
import { FileUploadModule } from 'primeng/fileupload';
import { AccordionModule } from 'primeng/accordion';
import { WorksheetComponent } from './worksheet/worksheet.component';

@NgModule({
  declarations: [
    JobsComponent,
    AddeditmodalComponent,
    InterviewComponent,
    WorksheetComponent,

  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    SidebarModule,
    SharedModule,
    FileUploadModule,
    // MatDialogModule
    AccordionModule
  ]
})
export class JobsModule { }

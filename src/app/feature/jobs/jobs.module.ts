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
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { MenubarModule } from 'primeng/menubar';

import { SplitButtonModule } from 'primeng/splitbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DetailsModalComponent } from './details-modal/details-modal.component';

@NgModule({
  declarations: [
    JobsComponent,
    AddeditmodalComponent,
    InterviewComponent,
    WorksheetComponent,
    DetailsModalComponent,

  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    SidebarModule,
    SharedModule,
    FileUploadModule,
    AccordionModule,
    MenuModule,
    TooltipModule,
    MenubarModule,
    SplitButtonModule,
    OverlayPanelModule,
    ButtonModule,
    InputTextareaModule,
    MenuModule,
    TooltipModule
  ]
})
export class JobsModule { }

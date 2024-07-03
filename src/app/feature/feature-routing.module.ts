import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewComponent } from './jobs/interview/interview.component';
import { WorksheetComponent } from './jobs/worksheet/worksheet.component';


const routes: Routes = [
  { path: '', redirectTo: 'topics', pathMatch: 'full' },
  { path: 'topics', loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule) },
  { path: 'questions', component: InterviewComponent },
  { path: 'worksheet', component: WorksheetComponent },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }

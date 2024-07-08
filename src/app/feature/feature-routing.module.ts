import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './jobs/questions/question.component';
import { WorksheetComponent } from './jobs/worksheet/worksheet.component';


const routes: Routes = [
  { path: '', redirectTo: 'topics', pathMatch: 'full' },
  { path: 'topics', loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule) },
  { path: 'questions', component: QuestionComponent },
  { path: 'worksheet', component: WorksheetComponent },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }

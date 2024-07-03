import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { EditorModule } from 'primeng/editor';
import { AccordionModule } from 'primeng/accordion';
// import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [

  
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    SharedModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    EditorModule,
    AccordionModule
    // MatDialogModule
  ],
})
export class FeatureModule { }

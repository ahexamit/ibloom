import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { BreadcumComponent } from './breadcum/breadcum.component';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AllowNumberDirective } from '../utills/directives/allow-number.directive';
import { RadioButtonModule } from 'primeng/radiobutton';
@NgModule({
  declarations: [
    // BreadcumComponent,
    AllowNumberDirective
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    CarouselModule,
    DialogModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    OverlayPanelModule,
    NgMultiSelectDropDownModule,
    RadioButtonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ButtonModule,
    InputTextModule,
    CarouselModule,
    DialogModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    OverlayPanelModule,
    // BreadcumComponent,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    NgMultiSelectDropDownModule,
    RadioButtonModule,
    AllowNumberDirective

  ]
})
export class SharedModule { }

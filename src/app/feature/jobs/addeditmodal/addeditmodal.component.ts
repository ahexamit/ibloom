import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeatureService } from '../../feature.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addeditmodal',
  templateUrl: './addeditmodal.component.html',
  styleUrls: ['./addeditmodal.component.scss'],
})
export class AddeditmodalComponent {
  @Input() mode: 'add' | 'edit' | null = null;
  @Input() data: any;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<void>();
  form: FormGroup;
  dropdownOptions: any = [
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Hard', value: 'hard' },
  ];
  subject_options: any = [{ label: 'Maths', value: 'Maths' }];
  grade_options: any = [{ label: 'First', value: 'First' }];
  constructor(
    private fb: FormBuilder,
    private featureService: FeatureService,
    private sharedService: SharedService,
    private toaster: ToastrService,
    private cd: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      topic: ['', Validators.required],
      age: ['', [Validators.required]],
      grade: [{ value: 'First' }],
      subject: [{ value: 'Maths' }],
      lesson: ['', [Validators.required]],
      difficulty: [''],
    });
  }
  onSubmit() {
    if (this.mode === 'edit') {
      const obj = {
        topic: this.data?.topic,
        grade: this.data?.grade,
        age: +this.data?.age,
        subject: this.data?.subject,
        lesson: JSON.stringify(this.data?.lesson),
        difficulty: this.form.get('difficulty')?.value,
      };
      this.featureService
        .generateQuestions(obj, 'questions_generator')
        .subscribe({
          next: (res: any) => {
            if (res.message === 'Questions Generated Successfully!!!') {
              this.toaster.success(res.message);
              this.closeModal();
            }
          },
          error: (err: any) => {
            console.error('Error:', err);
            this.sharedService.errorMessage(
              'Failed to Generate Questions. Please try again.'
            );
          },
        });
    } else {
      const obj = {
        title: this.form.get('topic')?.value,
        grade: this.form.get('grade')?.value,
        age: +this.form.get('age')?.value,
        subject: this.form.get('subject')?.value,
        objective: this.form.get('lesson')?.value,
      };
      this.featureService.generateTopics(obj, 'content_generator').subscribe({
        next: (res) => {
          if (res.message === 'Lesson Generated Successfully!!!') {
            this.sharedService.successMessage(res.message);
            this.closeModal();
          }
        },
        error: (err) => {
          console.error('Error occurred:', err);
          this.sharedService.errorMessage(
            'Failed to Generate Lesson. Please try again.'
          );
        },
      });
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['mode'] || changes['data']) {
      if (this.visible) {
        if (this.mode === 'edit' && this.data) {
          this.form.patchValue(this.data);
          this.form.patchValue({ lesson: this.data.learning_objective });
          this.form.get('age')?.disable();
          this.form.get('topic')?.disable();
          this.form.get('lesson')?.disable();
          this.form.get('difficulty')?.setValidators([Validators.required]);
        } else if (this.mode === 'add') {
          this.form.reset();
          this.form.patchValue({ grade: 'First' });
          this.form.patchValue({ subject: 'Maths' });
          this.form.get('age')?.enable();
          this.form.get('topic')?.enable();
          this.form.get('lesson')?.enable();
          this.form.get('difficulty')?.clearValidators();
        }
        this.form.get('difficulty')?.updateValueAndValidity();
      }
    }
    this.cd.detectChanges();
  }
  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.close.emit();
    this.form.get('topic')?.reset();
    this.form.get('age')?.reset();
    this.form.get('lesson')?.reset();
    this.form.get('difficulty')?.reset();
  }
}

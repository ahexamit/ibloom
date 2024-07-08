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
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
})
export class DetailsModalComponent {
  @Input() mode: 'add' | 'edit' | null = null;
  @Input() data: any;
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<void>();

  deatilsShow!: string;
  constructor(
    private cd: ChangeDetectorRef
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['mode'] || changes['data']) {
      if (this.visible) {
        if (this.mode === 'edit' && this.data) {
          this.deatilsShow = JSON.stringify(this.data.lesson_content);
        }
      }
    }
    this.cd.detectChanges();
  }
  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.close.emit();
  }
}

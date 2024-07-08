import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

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

  detailsToShow: any;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mode'] || changes['data']) {
      if (this.visible) {
        if (this.mode === 'edit' && this.data) {
          this.detailsToShow = this.normalizeKeys(this.data.lesson_content);
        }
      }
    }
    this.cd.detectChanges();
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  formatKey(key: string): string {
    return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  }

  normalizeKeys(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.normalizeKeys(item));
    }

    return Object.keys(obj).reduce((acc:any, key) => {
      const normalizedKey = key.replace(/ /g, '_');
      acc[normalizedKey] = this.normalizeKeys(obj[key]);
      return acc;
    }, {});
  }

  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.close.emit();
  }
}

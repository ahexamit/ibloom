import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../feature.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  visible: boolean = false;
  allJobs: any[] = [];
  filtered_topics: any[] = [];
  modalMode: 'add' | 'edit' | null = null;
  modalData: any = null;
  isModalVisible = false;
  isDetailModalVisible = false;
  gradeOptions: any = [{ label: 'First', value: 'First' }];
  subjectOptions: any = [{ label: 'Maths', value: 'Maths' }];
  dropdownOptions: any = [];
  items!: any[];
  cardData: any;
  selectedTopic: any;
  selectedGrade: any;
  selectedDiffucilty: any;
  selectedSubject: any;
  constructor(
    private featuredService: FeatureService,
    private router: Router,
    private toastr:ToastrService
  ) {};
  ngOnInit() {
    // this.getAllTopics();
    this.get_topics();
    this.items = [
      {
        label: 'Generated Questions',
        icon: 'pi pi-refresh',
        title: ' Generated Questions',
        command: (event: any) => this.showDialog('edit', this.cardData),
      },
      {
        label: 'Questions',
        icon: 'pi pi-question-circle',
        title: 'Questions',
        command: () => this.showQuestions(this.cardData),
      },
      {
        label: 'WorkSheet',
        icon: 'pi pi-file',
        title: 'WorkSheet',
        command: () => this.showWorkSheet(this.cardData),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        title: 'Delete',
        severity: 'danger',
        command: () => this.deleteItem(),
      },
    ];
  }
  get_topics(): void {
    this.featuredService.get_topics().subscribe((res) => {
      this.dropdownOptions = res.topics_list;
      this.initializeSelectedTopic();

    });
  }
  onDropdownChange(event: any, params: string): void {
    const selectedValue = event.value;
    switch (params) {
      case 'topic':
        this.selectedTopic = selectedValue;
        break;
      case 'grade':
        this.selectedGrade = selectedValue;
        break;
      case 'subject':
        this.selectedSubject = selectedValue;
        break;
      default:
        break;
    }
    this.getAllTopics();
  };
  gettingdata(data: any) {
    this.cardData = data;
  }

  deleteItem() {
    console.log(this.cardData.topic_id)
    this.featuredService.delete_topics(this.cardData.topic_id)
    .subscribe({
      next: (res: any) => {
        if (res.message === 'Topic Deleted successfully') {
          this.toastr.success(res.message);
          this.getAllTopics();
        }
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.toastr.error(
          'Failed to Delete Topic. Please try again.'
        );
      },
    });
  }

  showQuestions(data: any) {
    if (data) {
      this.router.navigate([
        '/dashboard/questions',
        { topic: data?.topic, grade: data?.grade, subject: data?.subject },
      ]);
    }
  };
  showWorkSheet(data: any) {
    this.router.navigate([
      '/dashboard/worksheet',
      { topic: data?.topic, grade: data?.grade, subject: data?.subject },
    ]);
  }
  // toggleViewMore(data: any, section: string) {
  //   if (section === "introduction") {
  //     data.showFullIntroduction = !data.showFullIntroduction;
  //   } else if (section === "summary") {
  //     data.showFullSummary = !data.showFullSummary;
  //   }
  // }

  showDialog(mode: 'add' | 'edit', data?: any) {
    console.log(data);
    this.modalMode = mode;
    this.modalData = data || null;
    this.isModalVisible = true;
  }
  openContentModal(mode: 'add' | 'edit', data?: any) {
    console.log(data);
    this.modalMode = mode;
    this.modalData = data || null;
    this.isDetailModalVisible = true;
  }

  handleModalClose() {
    this.isModalVisible = false;
    this.isDetailModalVisible = false;
    this.getAllTopics();
  }

  getAllTopics() {
    const obj = {
      grade: this.selectedGrade,
      subject: this.selectedSubject,
    };
    this.featuredService.getAllCards('get_all_cards',obj).subscribe({
      next: (res: any) => {
        let lesson = res.all_card_results;
        this.allJobs = lesson as any[];
        this.filtered_topics = lesson as any[]; // Initialize filtered_topics with all jobs
      },
    });
  };
  filterJobs(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filtered_topics = this.allJobs.filter((job) =>
      job.topic.toLowerCase().includes(searchTerm)
    );
  }
  initializeSelectedTopic(): void {
    if (this.dropdownOptions.length > 0) {
      // this.selectedTopic = this.dropdownOptions[0].value;
      this.selectedGrade = this.gradeOptions[0].value;
      this.selectedSubject = this.subjectOptions[0].value;
    }
    this.setSelectedTopic();
    this.getAllTopics();
  };
  setSelectedTopic(): void {
    if (this.selectedTopic) {
      const selectedOption = this.dropdownOptions.find(
        (option: any) => option.value === this.selectedTopic
      );
      if (selectedOption) {
        this.selectedTopic = selectedOption.value;
      }
    }
  };
}

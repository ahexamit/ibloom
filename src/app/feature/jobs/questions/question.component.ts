import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../../feature.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  filtered_questions: any[] = [];
  searchQuery: string = '';
  all_questions: any[] = [];
  selectedTopic!: any;
  dropdownOptions: any = [];
  gradeOptions: any = [{ label: 'First', value: 'First' }];
  subjectOptions: any = [{ label: 'Maths', value: 'Maths' }];
  diffuciltyOptions: any = [
    { label: 'ALL', value: 'ALL' },
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Hard', value: 'hard' },
  ];
  selectedGrade!: any;
  selectedSubject!: any;
  selectedDiffucilty!: any;
  paramTopic!: string | null;
  paramGrade!: string | null;
  paramsubject!: string | null;
  isMovedToWorksheet: boolean[] = [];
  showtextbox: boolean[][] = [];
  message: string[][] = [];
  generate_mode!: string;

  constructor(
    private featuredService: FeatureService,
    private routes: ActivatedRoute,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.get_topics();
    this.routes.paramMap.subscribe((params) => {
      this.paramTopic = params.get('topic');
      this.paramGrade = params.get('grade');
      this.paramsubject = params.get('subject');
    });
    this.initializeMessages();
  }

  initializeMessages(): void {
    this.all_questions.forEach((_, i) => {
      this.message[i] = [''];
      this.showtextbox[i] = [false];
    });
  }

  get_topics(): void {
    this.featuredService.get_topics().subscribe((res) => {
      this.dropdownOptions = res.topics_list;
      this.initializeSelectedTopic();
    });
  }

  initializeSelectedTopic(): void {
    if (this.paramTopic && this.paramGrade && this.paramsubject) {
      this.selectedTopic = this.paramTopic;
      this.selectedGrade = this.paramGrade;
      this.selectedSubject = this.paramsubject;
      this.selectedDiffucilty = 'ALL';
    } else if (this.dropdownOptions.length > 0) {
      this.selectedTopic = this.dropdownOptions[0].value;
      this.selectedGrade = this.gradeOptions[0].value;
      this.selectedSubject = this.subjectOptions[0].value;
      this.selectedDiffucilty = this.diffuciltyOptions[0].value;
    }
    this.setSelectedTopic();
    this.get_all_questions();
  }

  get_all_questions(): void {
    if (!this.selectedTopic) return;

    const obj = {
      topic: this.selectedTopic,
      grade: this.selectedGrade,
      subject: this.selectedSubject,
      diffucilty: this.selectedDiffucilty,
    };
    this.featuredService.get_all_questions(obj).subscribe((res) => {
      this.all_questions = res.questions_list;
      this.filtered_questions = res.questions_list;
      this.initializeMessages();
    });
  }

  showtextarea(api:string ,index: number, subIndex: number = 0) {
    console.log(api)
    this.generate_mode = api;
    if (!this.showtextbox[index]) {
      this.showtextbox[index] = [];
    }
    this.showtextbox[index][subIndex] = true;
  }

  hideTextArea(index: number, subIndex: number = 0) {
    if (
      this.showtextbox[index] &&
      this.showtextbox[index][subIndex] !== undefined
    ) {
      this.showtextbox[index][subIndex] = false;
    }
  }

  generateQuestions(
    event: Event,
    index: number,
    data: any,
    textareaRef: HTMLTextAreaElement | null,
    parentIndex: number = -1
  ): void {
    let message = '';

    if (parentIndex === -1) {
      if (this.message[index] && this.message[index][0]) {
        message = this.message[index][0];
      }
    } else {
      if (this.message[parentIndex] && this.message[parentIndex][index]) {
        message = this.message[parentIndex][index];
      }
    }

    console.log(data, data?.question_id, data?.regenerated_id);

    let obj: any = {
      user_input: message,
    };
    let datatype: string = '';
    if (data.question_id) {
      datatype = 'question';
      obj.question_id = data?.question_id;
    } else {
      datatype = 'requestion';
      obj.regenerated_id = data?.regenerated_id;
    }
    let api_endpoint = '';
    if(this.generate_mode === 'Generate'){
      api_endpoint = 'visualizing_question'
    } else if(this.generate_mode === 'Regenerate'){
     api_endpoint = 'regenerate_question'
    }else{
      api_endpoint = 'similar_question'

    }
    this.featuredService.generateVr(obj, datatype,api_endpoint).subscribe((res) => {
      console.log('Response from generateVr:', res); // Log the response for debugging

      if (typeof res === 'object' && res !== null) {
        this.toaster.success(res.message)
        if (parentIndex === -1) {
          this.showtextbox[index] = [];
          this.message[index] = [''];
        } else {
          this.showtextbox[parentIndex][index] = false;
          this.message[parentIndex][index] = '';
        }

        if (textareaRef) {
          textareaRef.value = '';
        }

        const normalizedResponse = this.normalizeKeys(res);
        if (!data.generatedVr) {
          data.generatedVr = [];
        }

        data.generatedVr.push(normalizedResponse);
        this.isMovedToWorksheet.push(false);
      } else {
        console.error('Unexpected structure for the response:', res);
      }
    });
  }

  normalizeKeys(obj: any): any {
    const normalizedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const lowerKey = key.toLowerCase();
        normalizedObj[lowerKey] = obj[key];
      }
    }
    return normalizedObj;
  }

  movetoworksheet(data: any, index: number): void {
    let obj: any = {};
    let datatype: string = '';
    if (data.question_id) {
      datatype = 'question';
      obj.question_id = data?.question_id;
    } else {
      datatype = 'requestion';

      obj.question_id = data.regenerated_id;
    }
    this.featuredService.movetoworksheet(obj, datatype).subscribe((res) => {
      if (res.message === 'Status updated to approved successfully!') {
        this.toaster.success('Question successfully moved to worksheet');
        this.isMovedToWorksheet[index] = true;
      }
    });
  }

  delete(data: any, mainIndex: number, subIndex?: number): void {
    let obj: any = {};
    let datatype: string = '';
    if (data.question_id) {
      datatype = 'question';
      obj.question_id = data?.question_id;
    } else {
      datatype = 'requestion';

      obj.question_id = data.regenerated_id;
    }
    this.featuredService.delete_questions(obj, datatype).subscribe((res) => {
      console.log(res);
      this.toaster.success(res.message);

      // Remove the deleted question from the local array
      if (subIndex !== undefined) {
        this.filtered_questions[mainIndex].generatedVr.splice(subIndex, 1);
        if (this.filtered_questions[mainIndex].generatedVr.length === 0) {
          delete this.filtered_questions[mainIndex].generatedVr;
        }
      } else {
        this.filtered_questions.splice(mainIndex, 1);
      }
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
      case 'difficulty':
        this.selectedDiffucilty = selectedValue;
        break;
      default:
        break;
    }
    this.get_all_questions();
  }

  setSelectedTopic(): void {
    if (this.selectedTopic) {
      const selectedOption = this.dropdownOptions.find(
        (option: any) => option.value === this.selectedTopic
      );
      if (selectedOption) {
        this.selectedTopic = selectedOption.value;
      }
    }
  }

  filterJobs(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filtered_questions = this.all_questions.filter((job) =>
      job['question'].toLowerCase().includes(searchTerm)
    );
  }

  getStarColor(difficulty: string): string {
    let color = '';
    switch (difficulty) {
      case 'easy':
        color = 'green';
        break;
      case 'medium':
        color = 'orange';
        break;
      case 'hard':
        color = 'red';
        break;
      default:
        color = 'black';
    }
    return color;
  }

  getStars(difficulty: string): number[] {
    let stars = 0;
    switch (difficulty) {
      case 'easy':
        stars = 2;
        break;
      case 'medium':
        stars = 3;
        break;
      case 'hard':
        stars = 4;
        break;
      default:
        stars = 0;
    }
    return new Array(stars);
  }
}

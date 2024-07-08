import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FeatureService } from "../../feature.service";
import * as moment from "moment-timezone";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.scss']
})
export class WorksheetComponent {


  visible: boolean = false;
  isInterviewContext: boolean = false;
  form: FormGroup;
  allJobs: any[] = [];
  isSidebarVisible = false;
  flag = false;
  modalMode: "add" | "edit" | null = null;
  modalData: any = null;
  isModalVisible = false;
  selectedJob_id!: string;
  job_id!: string;
  interview_id: string = "";
  filtered_questions: any[] = [];
  searchQuery: string = "";
  currentPage: number = 1;
  itemsPerPage: number = 10;
  user_name: string = "User";
  pagesArray: any[] = [];
  lastSegment!: string;
  highlightedSessionId: string | null = null;
  isModalOpen!: boolean;
  dummyJson:any[]= [];
  selectedTopic!: any;
  openAccordions: boolean[] = [];
  dropdownOptions: any = [];
  gradeOptions: any = [{ label: "First", value: "First" }];
  subjectOptions: any = [{ label: "Maths", value: "Maths" }];
  diffuciltyOptions: any = [
    { label: "ALL", value: "ALL" },
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ];
  selectedGrade!: any;
  selectedSubject!: any;
  selectedDiffucilty!: any;
  paramTopic!: string | null;
  paramGrade!: string | null;
  paramsubject!: string | null;
  generatedVr: any;
  isMovedToWorksheet: any=false;
  datageneratedVr: any;
  constructor(
    private featuredService: FeatureService,
    private fb: FormBuilder,
    private routes: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
    });
    console.log(this.filtered_questions, "worksheet");
  }
  ngOnInit(): void {
    this.get_topics();
    // this.get_questions();
    this.routes.paramMap.subscribe((params) => {
      console.log(params);
      this.paramTopic = params.get("topic");
      this.paramGrade = params.get("grade");
      this.paramsubject = params.get("subject");
    });
  }

  get_topics(): void {
    this.featuredService.get_topics().subscribe((res) => {
      this.dropdownOptions = res.topics_list;
      this.initializeSelectedTopic();
    });
  }
get_questions(){
  if (!this.selectedTopic) return;
  const obj = {
    topic: this.selectedTopic,
    grade: this.selectedGrade,
    subject: this.selectedSubject,
    diffucilty: this.selectedDiffucilty,
  };
  this.featuredService.approvedquestion(obj).subscribe((res)=>{
    console.log(res)
    this.dummyJson = res.approved_questions;
    this.filtered_questions=res.approved_questions
  })
}
  initializeSelectedTopic(): void {
    if (this.paramTopic && this.paramGrade && this.paramsubject) {
      this.selectedTopic = this.paramTopic;
      this.selectedGrade = this.paramGrade;
      this.selectedSubject = this.paramsubject;
      this.selectedDiffucilty='ALL';
    } else if (this.dropdownOptions.length > 0) {
      this.selectedTopic = this.dropdownOptions[0].value;
      this.selectedGrade = this.gradeOptions[0].value;
      this.selectedSubject = this.subjectOptions[0].value;
      this.selectedDiffucilty = this.diffuciltyOptions[0].value;
    }
    this.setSelectedTopic();
    this.get_questions();
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
      this.dummyJson = res.questions_list;
      this.filtered_questions = res.questions_list;
    });
  }

  // generateQuestions(event: Event, index: number, data: any): void {
  //   const obj = {
  //     question_id: data?.question_id,
  //     user_input: ''
  //   };
  
  //   this.featuredService.generateVr(obj).subscribe((res) => {
  //     console.log('Response from generateVr:', res); // Log the response for debugging
  
  //     // Check if res.generated_vr is an object
  //     if (typeof res === 'object' && res !== null) {
  //       const normalizedResponse = this.normalizeKeys(res);
  //       if (!data.generatedVr) {
  //         data.generatedVr = [];
  //       }
  //       // data.generatedVr.push(normalizedResponse); 
  //       this.datageneratedVr = data.generatedVr.push(normalizedResponse);
  //    this.isMovedToWorksheet = new Array(this.datageneratedVr?.length).fill(false);

  //     } else {
  //       console.error('Unexpected structure for the response:', res);
  //     }
  //   });
  // }
  
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
  
  movetoworksheet(data:any,index:any){
    console.log(data,index);
    const obj ={
      regenerated_id:data
    }
    // this.featuredService.movetoworksheet(obj).subscribe((res)=>{
    //   console.log(res);
    //   if( res.message ="Status updated to approved successfully!")
    //   this.toaster.success('Question Succesfully move to worksheet')
    //   this.isMovedToWorksheet[index] = true;
    // })
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
    // this.get_all_questions();
    this.get_questions();
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
  };

  isAccordionOpen(index: number): boolean {
    return this.openAccordions[index];
  };
  showInterviewModal(job_id: string) {
    this.selectedJob_id = job_id;
    console.log(job_id);
    this.visible = true;
    this.form.reset(); // Reset the form when showing the modal
  }

  closeModal() {
    this.visible = false;
  }

  // private getAllInterviews(): void {
  //   this.featuredService.getAllInterviews("get_interviews").subscribe({
  //     next: (res: any) => {
  //       this.allJobs = res.session_interviews;
  //       this.job_id = res.session_interviews.job_id;
  //       this.interview_id = res.session_interviews.session_id;
  //       // this.filterJobs();
  //       console.log(this.allJobs);
  //     },
  //   });
  // }

  filterJobs(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filtered_questions = this.dummyJson.filter((job) =>
      job['regenerated_question_text'].toLowerCase().includes(searchTerm)
    );
  };
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

  get paginatedJobs() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filtered_questions.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filtered_questions.length / this.itemsPerPage);
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagesArray();
  }

  updatePagesArray() {
    this.pagesArray = [];
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        this.pagesArray.push(i);
      }
    } else {
      if (currentPage <= 3) {
        this.pagesArray = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        this.pagesArray = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        this.pagesArray = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }
  }

  startMeeting(user_name: string, job_id: string, interview_id: string) {
    console.log("starthistoryblock");
    console.log(user_name, interview_id);
    this.user_name = user_name;
    this.interview_id = interview_id;
    this.isModalOpen = true;

    this.flag = true;
    console.log(this.interview_id);

    this.urlParamChanged();

    this.isSidebarVisible = !this.isSidebarVisible;
    this.isInterviewContext = !this.isInterviewContext;
    console.log(this.isSidebarVisible);

    this.highlightedSessionId = interview_id; // Highlight the session row
  }

  urlParamChanged(): void {
    const currentParams = { ...this.routes.snapshot.queryParams };
    currentParams["session_id"] = this.interview_id;
    this.router.navigate([], {
      relativeTo: this.routes,
      queryParams: currentParams,
      queryParamsHandling: "merge",
    });
    currentParams["username"] = this.user_name;
    this.router.navigate([], {
      relativeTo: this.routes,
      queryParams: currentParams,
      queryParamsHandling: "merge",
    });
  }

  handleSidebarHide() {
    this.isModalOpen = false;
    // this.isSidebarVisible = false;
    this.isInterviewContext = false;
  }

  convertToIST(dateString: string): string {
    return moment
      .tz(dateString, "GMT")
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD hh:mm:ss A");
  }

  showDialog(mode: "add" | "edit", data?: any) {
    console.log(data);
    this.modalMode = mode;
    this.modalData = data || null;
    this.isModalVisible = true;
  }
  handleModalClose() {
    this.isModalVisible = false;
    // this.getAllJobs();
  }

}

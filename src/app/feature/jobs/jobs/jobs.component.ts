import { Component, OnInit } from "@angular/core";
import { FeatureService } from "../../feature.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SharedService } from "src/app/shared/shared.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
export interface Job {
  job_id: string;
  title: string;
  skills: string;
  description: string;
}
@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"],
})
export class JobsComponent implements OnInit {
  visible: boolean = false;
  form: FormGroup;
  allJobs: any[] = [];
  filteredJobs: any[] = [];
  isSidebarVisible = false;
  flag = false;
  modalMode: "add" | "edit" | null = null;
  modalData: any = null;
  isModalVisible = false;
  isDetailModalVisible = false;
  selectedJob_id!: string;
  job_id: any;
  interview_id: any = "";
  user_name: string = "User";
  parsedLessons: any;

  items!: any[];
  cardData: any;
  constructor(
    private featuredService: FeatureService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private toaster: ToastrService
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.getAllJobs();
    this.items = [
      { label:'Generated Questions',icon: 'pi pi-refresh', title: ' Generated Questions', command: (event:any) => this.showDialog('edit',this.cardData) },
      { label:'Questions',icon: 'pi pi-question-circle', title: 'Questions', command: () => this.showQuestions(this.cardData) },
      {label:'WorkSheet', icon: 'pi pi-file', title: 'WorkSheet', command: () => this.showWorkSheet(this.cardData)},
        {label:'Delete', icon: 'pi pi-trash', title: 'Delete',  severity:"danger", command: () => this.deleteItem() }
       
    ]
  
   
    // this.featuredService.getallQuestions().subscribe((res)=>{
    //   console.log(res)
    // })
  }
  editItem(event:any) {
    // Your edit item logic here
    console.log('item',event)
    this.router.navigate([''])
  }
  gettingdata(data:any){
    this.cardData= data
    console.log(data)
  }

  deleteItem() {
    // Your delete item logic here
  }

  shareItem() {
    // Your share item logic here
  }
  showQuestions(data: any) {
    console.log(data);
    if (data) {
      this.router.navigate([
        "/dashboard/questions",
        { topic: data?.topic, grade: data?.grade , subject:data?.subject },
      ]);
    }
    console.log(data);
  }
  showWorkSheet(data: any) {
    this.router.navigate(["/dashboard/worksheet", { topic: data.topic }]);
  }
  // toggleViewMore(data: any, section: string) {
  //   if (section === "introduction") {
  //     data.showFullIntroduction = !data.showFullIntroduction;
  //   } else if (section === "summary") {
  //     data.showFullSummary = !data.showFullSummary;
  //   }
  // }
  
  showInterviewModal(job_id: string) {
    // const currentParams = { ...this.activateRouter.snapshot.queryParams };
    // currentParams['aimodels'] ="openai"
    // this.router.navigate([], {
    //   relativeTo: this.activateRouter,
    //   queryParams: currentParams,
    //   queryParamsHandling: 'merge',
    // });
    this.selectedJob_id = job_id;
    console.log(job_id);
    this.visible = true;
    this.form.reset(); // Reset the form when showing the modal
  }

  onSubmit() {
    this.user_name = this.form.get("name")?.value;
    const obj = {
      name: this.form.get("name")?.value,
      email: this.form.get("email")?.value,
      job_id: this.selectedJob_id,
    };
    this.featuredService
      .scheduledMetting(obj, "create_interview_session")
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.job_id = res.session_details.job_id;
          this.interview_id = res.session_details.interview_id;
          console.log(this.job_id, this.interview_id);

          if (
            res.message === "users created successfully" ||
            res.interview_id
          ) {
            this.flag = true;
            console.log("openchatbot");
            this.closeModal();
            this.startMeeting();
            console.log("openchatbot but not opening");
          }
        },
        error: (err: any) => {
          console.error("Error:", err);
          this.sharedService.errorMessage(
            "Failed to start interview. Please try again."
          );
        },
        complete: () => {
          console.log("Request completed");
        },
      });
  }

  closeModal() {
    this.visible = false;
  }

  showDialog(mode: "add" | "edit", data?: any) {
    console.log(data);
    this.modalMode = mode;
    this.modalData = data || null;
    this.isModalVisible = true;
  }
  openContentModal(mode: "add" | "edit", data?: any){
    console.log(data);
    this.modalMode = mode;
    this.modalData = data || null;
    this.isDetailModalVisible = true;
  }

  handleModalClose() {
    this.isModalVisible = false;
    this.isDetailModalVisible = false;
    this.getAllJobs();
  }

  getAllJobs() {
    this.featuredService.getAllCards("get_all_cards").subscribe({
      next: (res: any) => {
        // console.log(res)
        let lesson = res.all_card_results;
        console.log(lesson);
        // this.parsedLessons = lesson.map((card:any) => ({
        //   ...card,
        //   lesson: JSON.parse(card.lesson)
        // }));
        // console.log(this.parsedLessons);

        // let array_index = Object.keys(this.parsedLessons);
        // console.log(array_index)
        //  for(let i =0 ; i<=array_index.length;i++){
        //   console.log(Object.keys(this.parsedLessons[i]))

        //  }

        this.allJobs = lesson as any[];
        this.filteredJobs = lesson as any[]; // Initialize filteredJobs with all jobs
        console.log(this.allJobs);
      },
    });
  }

  filterJobs(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredJobs = this.allJobs.filter((job) =>
      job.topic.toLowerCase().includes(searchTerm)
    );
  }

  startMeeting() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  handleSidebarHide() {
    this.isSidebarVisible = false;
  }
}

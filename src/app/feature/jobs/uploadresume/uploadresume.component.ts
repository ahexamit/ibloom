import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { interview } from 'src/app/model/profile';
import { FeatureService } from '../../feature.service';

@Component({
  selector: 'app-uploadresume',
  templateUrl: './uploadresume.component.html',
  styleUrls: ['./uploadresume.component.scss']
})
export class UploadresumeComponent implements OnInit {
  visible: boolean = false;
  allJobs: interview[] = [];
  filteredJobs: interview[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pagesArray: any[] = [];
  userForm!: FormGroup;
  dropdownOptions:any=[
    { label: 'Java Developer', value: 'Java Developer' },
      { label: 'Python Software Developer', value: 'Python Software Developer' },
    { label: 'Automation Test Engineer', value: 'Automation Test Engineer' }
  ]
  constructor(
    private featuredService: FeatureService,
    private fb: FormBuilder
  ) {
  
    this.userForm = this.fb.group({
  
      resumes: [null, [Validators.required, this.fileTypeValidator]]
    });
  }
 
  ngOnInit(): void {
    this.getAllInterviews();
  };

  closeModal() {
    this.visible = false;
  };

  private getAllInterviews(): void {
    this.featuredService.getAllInterviews('get_interviews').subscribe({
      next: (res: any) => {
        this.allJobs = res.session_interviews;
        this.filterJobs();
        console.log(this.allJobs);
      },
    });
  }

  filterJobs() {
    const query = this.searchQuery.toLowerCase();
    this.filteredJobs = this.allJobs.filter(
      (job) =>
        job.user_name.toLowerCase().includes(query) ||
        job.user_email.toLowerCase().includes(query) ||
        job.job_id.toLowerCase().includes(query)
    );
    this.currentPage = 1; // Reset to the first page after filtering
    this.updatePagesArray();
  }

  get paginatedJobs() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredJobs.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredJobs.length / this.itemsPerPage);
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
        this.pagesArray = [1, 2, 3, 4, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        this.pagesArray = [
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        this.pagesArray = [
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        ];
      }
    }
  }




  convertToIST(dateString: string): string {
    return moment.tz(dateString, 'GMT').tz('Asia/Kolkata').format('YYYY-MM-DD hh:mm:ss A');
  }

  showDialog() {
  
    this.visible = true;
  }

  onSubmit() {
    // if (this.userForm.valid) {
    //   const dateTime = new Date(this.userForm.get('dateTime')!.value);
    //   const isoDateTime = dateTime.toISOString();
    //   const obj = {
    //     name: this.userForm.get('name')!.value,
    //     email:  this.userForm.get('email')!.value,
    //     jobtitle: this.userForm.get('dropdown')!.value,
    //     dateTime: isoDateTime,
    //     resume: this.userForm.get('resume')!.value,
    //   };
     

    //   this.featureService.scheduleMetting(obj).subscribe({
    //     next: (res) => {
    //       console.log('API Response:', res);
    //       if(res.message){
    //         this.toastr.success(res.message)
    //         this.closeModal();
    //       }
    //     },
    //     error: (error) => {
    //       console.error('Login error');
    //       // Optionally, show an error message to the user
    //     },
    //   });
    // }
  }
  onUpload(event: any) {
    console.log(event.files);
    const file = event.files[0];
    if (file.type === 'application/pdf') {
      this.userForm.patchValue({ resume: file });
    } else {
      alert('Please upload a PDF file.');
    }
  
  }
  fileTypeValidator(control: any) {
    const files: FileList = control.value;
    for (let i = 0; i < files?.length; i++) {
      if (files[i].type !== 'application/pdf') {
        return { extension: true };
      }
    }
    return null;
  }
}



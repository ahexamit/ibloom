import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { addProfile } from '../../../model/profile';
import { FormBuilder, FormGroup } from '@angular/forms';
import { examAiform } from '../../../model/schemaForm/examAiform';
import { FeatureService } from '../../feature.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public addProfile!: FormGroup;
  public scheduleForm!: FormGroup;
  public jobsName = [];
  public selectedJobs: object = {};
  public totalCount!: number;
  public addEdit!: string;
  @ViewChild('addModal', { static: true }) addModal!: ElementRef;
  @ViewChild('scheduleModal', { static: true }) scheduleModal!: ElementRef;
  public resumeFile: any;
  public allProfileData = [];
  constructor(
    private sharedService: SharedService,
    private featureService: FeatureService,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.addProfile = examAiform.getProfileForm();
    this.scheduleForm = examAiform.sheduledMettingForm();
    this.getallProfile();
  }
  private getallProfile(): void {
    this.featureService.getallProfile().subscribe({
      next: (res: any) => {
        this.allProfileData = res;
        console.table(this.allProfileData);
      },
    });
  }
  public addProfileData(): void {
    console.log(this.addProfile.value);

    if (!this.addProfile.valid) {
      this.addProfile.markAllAsTouched();
      return;
    }
    if (!this.resumeFile) {
      this.sharedService.errorMessage('please uplaod resume');
      return;
    }

    this.featureService
      .addProfileData(this.addProfile.value, this.resumeFile)
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.sharedService.successMessage(res['message']);
            this.addProfile.reset();
            this.closeModal();
          }
        },
      });
  }
  public editProfileData(): void {
    const body = this.addProfile.value
    delete body.filename;
    this.featureService.editProfile(this.addProfile.value['email'], body, this.resumeFile).subscribe({
      next: (res) => {
        this.sharedService.successMessage(res.message);
        this.closeModal()
        this.getallProfile();
      }
    })
  }
  /**edit */
  public edit(email: string) {
    this.featureService.viewProfile(email).subscribe({
      next: (res) => {
        this.sharedService.open(this.addModal);
        this.addProfile.patchValue(res);
      },
    });

    // this.addProfile.patchValue(data)
  }
  public onSearch(event: any): void { }
  /*pagination*/
  public onPageChange(event: any): void { }
  /**closeModal */
  public closeModal(): void {
    this.sharedService.close();
    this.resumeFile = null
  }
  /**openmodal*/
  public openModal(params: string): void {
    switch (params) {
      case 'addform':
        this.sharedService.open(this.addModal);
        this.addProfile.reset();
        break;
      case 'scheduled':
        this.sharedService.open(this.scheduleModal);
        break;
    }
  }
  /**file upload */
  public fileUpload(event: any) {
    const file = event.target.files[0];
    const allowedFileTypes = ['application/pdf'];

    if (!allowedFileTypes.includes(file.type)) {
      this.sharedService.errorMessage('Only PDF files are allowed.');
      return;
    }
    this.resumeFile = file;
  }
  /**schedule */
  // public scheduledMetting() {
  //   const body = this.scheduleForm.value
  //   this.featureService.scheduledMetting(body).subscribe({
  //     next: (res) => {
  //       console.log(res);

  //     }
  //   })
  // }
}

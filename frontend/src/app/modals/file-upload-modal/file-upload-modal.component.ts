import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {DocumentService} from "../../services/document.service";
import {SharedDataService} from "../../services/shared-data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DocumentType} from "../../classes/enums/DocumentType";
import {AlertBroker} from "../../alert/alert-broker";
import {ExerciseService} from "../../services/exercise.service";
import {ManualService} from "../../services/manual.service";
import {LabelService} from "../../services/label.service";
import {SuccessResponse} from "../../classes/enums/SuccessResponse";
import {AlertType} from "../../alert/alert.model";
import {CourseService} from "../../services/course.service";
import {Course} from "../../classes/Course";

@Component({
  selector: 'hades-file-upload-modal',
  templateUrl: './file-upload-modal.component.html',
  styleUrls: ['./file-upload-modal.component.scss']
})
export class FileUploadModalComponent implements OnInit {
  title = "Faili üleslaadimine";

  formData: FormData = new FormData();

  labels: FormControl = new FormControl(
    {value: '', disabled: false}
  )

  type: FormControl = new FormControl(
    {value: '', disabled: false},
    [Validators.required]
  )

  year: FormControl = new FormControl(
    {value: this.getCurrentYear(), disabled: false}
  )

  documentFile: FormControl = new FormControl(
    {value: '', disabled: false},
    [Validators.required]
  )

  course: FormControl = new FormControl(
    {value: '', disabled: false},
    [Validators.required]
  )

  solutionFile: FormControl = new FormControl(
    {value: '', disabled: false},
  )

  fileTypes?: Array<any> = [
    {
      "type": DocumentType.MANUAL,
      "description": DocumentType.MANUAL,
    },
    {
      "type": DocumentType.EXERCISE,
      "description": DocumentType.EXERCISE,
    }
  ]

  courseList: Course[] = [];

  uploadFormGroup: FormGroup = this.initForm();

  constructor(public bsModalRef: BsModalRef,
              private documentService: DocumentService,
              private exerciseService: ExerciseService,
              private manualService: ManualService,
              private sharedDataService: SharedDataService,
              private labelService: LabelService,
              private courseService: CourseService,
              private alertBroker: AlertBroker) {

  }

  ngOnInit() {
    this.initCourseList();
  }

  initCourseList() {
    this.courseService.getAllCourses().subscribe(res => {
      this.courseList = res;
    })
  }

  initForm(): FormGroup {
    return new FormGroup({
      labels: this.labels,
      type: this.type,
      year: this.year,
      file: this.documentFile,
      course: this.course,
      solutionFile: this.solutionFile,
    })
  }


  isFileExercise() {
    return DocumentType.EXERCISE === this.getSelectedFileType();
  }

  solutionFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.formData.append('solutionFile', file);
  }

  documentFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.formData.append('documentFile', file);
  }

  private addData() {
    this.formData.append("labels", this.getSelectedLabels().join(","));
    this.formData.append("year", this.getSelectedYear());
    this.formData.append("courseCode", this.getSelectedCourse());
  }

  submitFile() {
    this.addData();
    if (DocumentType.MANUAL === this.getSelectedFileType()) {
      this.manualService.createManual(this.formData).subscribe(res => this.sharedDataService.setUploadedManual(res));
      this.alertBroker.add(SuccessResponse.MANUAL_SAVE_SUCCESS, AlertType.SUCCESS);
    } else if (DocumentType.EXERCISE === this.getSelectedFileType()) {
      this.exerciseService.createExercise(this.formData).subscribe(res => this.sharedDataService.setUploadedExercise(res));
      this.alertBroker.add(SuccessResponse.EXERCISE_SAVE_SUCCESS, AlertType.SUCCESS);
    }
    this.bsModalRef.hide();
  }


  isFormValid() {
    return !this.uploadFormGroup.valid;
  }

  private getSelectedFileType(): string {
    return this.uploadFormGroup.get("type")?.value;
  }

  private getSelectedYear(): string {
    return this.uploadFormGroup.get("year")?.value;
  }

  private getSelectedCourse(): string {
    return this.uploadFormGroup.get("course")?.value;
  }

  private getSelectedLabels(): string[] {
    const inputLabels = this.uploadFormGroup.get("labels")?.value;
    if (inputLabels) {
      return inputLabels?.map((inputLabel: any) => inputLabel.value) || [];
    }
    return [];
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }
}

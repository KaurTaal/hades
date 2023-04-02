import {Component} from '@angular/core';
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

@Component({
  selector: 'hades-file-upload-modal',
  templateUrl: './file-upload-modal.component.html',
  styleUrls: ['./file-upload-modal.component.scss']
})
export class FileUploadModalComponent {
  title = "Faili üleslaadimine";

  uploadedFile?: FormData;

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

  file: FormControl = new FormControl(
    {value: '', disabled: false},
    [Validators.required]
  )

  fileTypes?: Array<any> = [
    {
      "type": DocumentType.MANUAL,
      "description": DocumentType.MANUAL,
    },
    {
      "type": DocumentType.EXERCISE,
      "description": DocumentType.EXERCISE,
    },
    {
      "type": DocumentType.PROGRAM,
      "description": DocumentType.PROGRAM,
    },
  ]

  uploadFormGroup: FormGroup = this.initForm();

  constructor(public bsModalRef: BsModalRef,
              private documentService: DocumentService,
              private exerciseService: ExerciseService,
              private manualService: ManualService,
              private sharedDataService: SharedDataService,
              private labelService: LabelService,
              private alertBroker: AlertBroker) {

  }


  initForm(): FormGroup {
    return new FormGroup({
      labels: this.labels,
      type: this.type,
      year: this.year,
      file: this.file
    })
  }


  isFileWithLabels() {
    return this.getSelectedFileType() === DocumentType.EXERCISE;
  }

  fileSelected(event: any) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this.uploadedFile = formData;
    this.addMetadata();
  }

  addMetadata() {
    this.uploadedFile?.append("labels", this.getSelectedLabels().join(","));
    this.uploadedFile?.append("year", this.getSelectedYear())
  }

  submitFile() {
    if (this.uploadedFile && this.getSelectedFileType) {
      if (this.getSelectedFileType() === DocumentType.MANUAL) {
        this.manualService.createManual(this.uploadedFile).subscribe(res => this.sharedDataService.setUploadedManual(res));
        this.alertBroker.add(SuccessResponse.MANUAL_SAVE_SUCCESS, AlertType.SUCCESS);
      } else if (this.getSelectedFileType() === DocumentType.EXERCISE) {
        this.exerciseService.createExercise(this.uploadedFile).subscribe(res => this.sharedDataService.setUploadedExercise(res));
        this.alertBroker.add(SuccessResponse.EXERCISE_SAVE_SUCCESS, AlertType.SUCCESS);
      }
    }
    this.bsModalRef.hide();
  }


  isFormValid() {
    return !this.uploadFormGroup.valid;
  }

  getSelectedFileType(): string {
    return this.uploadFormGroup.get("type")?.value;
  }

  getSelectedYear(): string {
    return this.uploadFormGroup.get("year")?.value;
  }

  getSelectedLabels(): string[] {
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

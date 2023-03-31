import {Component} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {DocumentService} from "../../services/document.service";
import {SharedDataService} from "../../services/shared-data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DocumentType} from "../../classes/enums/DocumentType";
import {AlertBroker} from "../../alert/alert-broker";
import {SuccessResponse} from "../../classes/enums/SuccessResponse";
import {AlertType} from "../../alert/alert.model";
import {ExerciseService} from "../../services/exercise.service";
import {ManualService} from "../../services/manual.service";

@Component({
  selector: 'hades-file-upload-modal',
  templateUrl: './file-upload-modal.component.html',
  styleUrls: ['./file-upload-modal.component.scss']
})
export class FileUploadModalComponent {
  title = 'Faili üleslaadimine';

  uploadedFile?: FormData;

  fileName: FormControl = new FormControl(
    {value: '', disabled: false},
    [Validators.required, Validators.minLength(2)]
  );

  labels: FormControl = new FormControl(
    {value: '', disabled: false}
  )

  type: FormControl = new FormControl(
    {value: '', disabled: false},
    [Validators.required]
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
              private alertBroker: AlertBroker) {

  }


  initForm(): FormGroup {
    return new FormGroup({
      fileName: this.fileName,
      labels: this.labels,
      type: this.type,
      file: this.file
    })
  }


  isFileWithLabels() {
    const isWithLabels = this.getSelectedFileType() === DocumentType.EXERCISE;

    if (isWithLabels) {
      this.labels.setValidators([Validators.required]);
    } else {
      this.labels.clearValidators();
    }
    return isWithLabels;
  }

  fileSelected(event: any) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this.addMetadata();
    this.uploadedFile = formData;
  }

  addMetadata() {
    this.uploadedFile?.append("type", this.getSelectedFileType());
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
}

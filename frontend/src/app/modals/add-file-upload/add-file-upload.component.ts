import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import {ExerciseService} from "../../services/exercise.service";
import {AlertBroker} from "../../alert/alert-broker";
import {SuccessResponse} from "../../classes/enums/SuccessResponse";
import {AlertType} from "../../alert/alert.model";
import {SharedDataService} from "../../services/shared-data.service";

@Component({
  selector: 'hades-add-file-upload',
  templateUrl: './add-file-upload.component.html',
  styleUrls: ['./add-file-upload.component.scss']
})
export class AddFileUploadComponent {
  parentExerciseId!: number;
  title = "Lisa fail";
  formData: FormData = new FormData();

  testSuiteFile: FormControl = new FormControl(
    {value: '', disabled: false}
  )
  solutionFile: FormControl = new FormControl(
    {value: '', disabled: false}
  )

  uploadFormGroup: FormGroup = this.initForm();

  isSolutionUpload: boolean = false;
  isTestSuiteUpload: boolean = false;


  constructor(public bsModalRef: BsModalRef,
              private exerciseService: ExerciseService,
              private alertBroker: AlertBroker,
              private sharedDataService: SharedDataService) {
  }

  initForm(): FormGroup {
    return new FormGroup({
      testSuiteFile: this.testSuiteFile,
      solutionFile: this.solutionFile,
    })
  }


  testSuiteFileSelected(event: any) {
    const files: File[] = event.target.files;
    for (let file of files) {
      this.formData.append("testSuiteFile", file);
    }
  }

  solutionFileSelected(event: any) {
    const files: File[] = event.target.files;
    for (let file of files) {
      this.formData.append("solutionFile", file);
    }
  }

  addFile() {
    if (this.isTestSuiteUpload) {
      this.uploadTestSuite();
    }
    if (this.isSolutionUpload) {
      this.uploadSolution();
    }
  }

  isFormValid() {
    this.solutionFile.setValidators(this.isSolutionUpload ? [Validators.required] : null);
    this.testSuiteFile.setValidators(this.isTestSuiteUpload ? [Validators.required] : null);

    this.solutionFile.updateValueAndValidity();
    this.testSuiteFile.updateValueAndValidity();

    return !this.uploadFormGroup.valid;
  }

  private uploadTestSuite() {
    this.exerciseService.createNewTestSuite(this.formData, this.parentExerciseId).subscribe((res) => {
      this.sharedDataService.setAddedTestSuite(res);
      this.alertBroker.add(SuccessResponse.TEST_SUITE_ADD_SUCCESS, AlertType.SUCCESS);
      this.bsModalRef.hide();
    });
  }

  private uploadSolution() {
    this.exerciseService.createNewSolution(this.formData, this.parentExerciseId).subscribe((res) => {
      this.sharedDataService.setAddedSolution(res);
      this.alertBroker.add(SuccessResponse.SOLUTION_ADD_SUCCESS, AlertType.SUCCESS);
      this.bsModalRef.hide();
    })
  }
}

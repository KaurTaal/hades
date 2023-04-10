import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {DocumentService} from "../../services/document.service";
import {SharedDataService} from "../../services/shared-data.service";
import {AlertBroker} from "../../alert/alert-broker";
import {AlertType} from "../../alert/alert.model";
import {Exercise} from "../../classes/Exercise";
import {SuccessResponse} from "../../classes/enums/SuccessResponse";
import {DocumentToolbarComponent} from "../document-toolbar/document-toolbar.component";
import {MimeType} from "../../classes/enums/MimeType";
import {ExerciseService} from "../../services/exercise.service";
import {Solution} from "../../classes/Solution";
import {TestSuite} from "../../classes/TestSuite";

@Component({
  selector: 'hades-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  @ViewChild(DocumentToolbarComponent)
  documentToolbar!: DocumentToolbarComponent;
  @Output()
  allExercisesList: Exercise[] = [];
  @Output()
  displayExerciseList: Exercise[] = [];

  constructor(
    private sharedDataService: SharedDataService,
    private documentService: DocumentService,
    private exerciseService: ExerciseService,
    private alertBroker: AlertBroker,) {
  }

  ngOnInit() {
    this.getAllExercises();

    this.sharedDataService.subscribeToUploadedExerciseFile(() => {
      const addedExercise = this.sharedDataService.getUploadedExerciseData();
      if (addedExercise) {
        this.addUploadedExerciseToList(addedExercise);
      }
    })

    this.sharedDataService.getFilteredDocumentList().subscribe(filteredList => this.displayExerciseList = filteredList as Exercise[]);
  }


  getAllExercises() {
    this.exerciseService.getAllExercises().subscribe(res => {
      for (const exercise of res) {
        this.allExercisesList.push(exercise);
      }
      this.updateDisplayList();
    })
  }


  private addUploadedExerciseToList(addedExercise: Exercise) {
    this.allExercisesList.push(addedExercise);

    this.updateDisplayList();
    this.sharedDataService.setUploadedExercise(null);
  }

  onDocumentDelete(deletedExercise: Exercise) {
    this.exerciseService.deleteExerciseById(deletedExercise.exerciseId).subscribe(() => {
      this.alertBroker.add(SuccessResponse.EXERCISE_DELETE_SUCCESS, AlertType.SUCCESS);
      this.allExercisesList = this.allExercisesList.filter((doc: Exercise) => doc.exerciseId !== deletedExercise.exerciseId);
      this.updateDisplayList();
    });
  }

  onDocumentSave(modifiedExercise: Exercise) {
    this.saveNewExerciseContent(modifiedExercise);
    this.saveNewSolutionContent(modifiedExercise.solutionDTO);
    this.saveNewTestSuiteContents(modifiedExercise.testSuiteDTOList);
  }


  private updateDisplayList() {
    this.displayExerciseList = this.allExercisesList;
    this.sharedDataService.updateDocumentDisplayListForToolbar(this.displayExerciseList);

    this.documentToolbar.emptyFilter();
  }


  private saveNewSolutionContent(solution: Solution) {
    this.documentService.getNewPythonFile(solution.contentHtml).subscribe(res => {
      if (res.body) {
        let file = new File([res.body], solution.name, {type: MimeType.PYTHON});
        let formData = new FormData();
        formData.append("file", file);
        this.documentService.saveEditedFile(solution.fileId, formData).subscribe(() => {
          this.alertBroker.add(SuccessResponse.SOLUTION_EDIT_SUCCESS, AlertType.SUCCESS);
        })
      }
    })
  }

  private saveNewTestSuiteContents(testSuites: TestSuite[]) {
    for (let testSuite of testSuites) {
      this.documentService.getNewPythonFile(testSuite.contentHtml).subscribe(res => {
        if (res.body) {
          let file = new File([res.body], testSuite.name, {type: MimeType.PYTHON});
          let formData = new FormData();
          formData.append("file", file);
          this.documentService.saveEditedFile(testSuite.fileId, formData).subscribe(() => {
            this.alertBroker.add(SuccessResponse.TEST_SUITE_EDIT_SUCCESS, AlertType.SUCCESS);
          })
        }
      })
    }
  }

  private saveNewExerciseContent(modifiedExercise: Exercise) {
    this.documentService.getNewDocxFile(modifiedExercise.contentHtml).subscribe(res => {
      if (res.body) {
        let file = new File([res.body], modifiedExercise.name, {type: MimeType.DOCX});
        let formData = new FormData();
        formData.append("file", file);
        this.documentService.saveEditedFile(modifiedExercise.fileId, formData).subscribe(() => {
          this.alertBroker.add(SuccessResponse.EXERCISE_EDIT_SUCCESS, AlertType.SUCCESS);
        })
      }
    });
  }
}

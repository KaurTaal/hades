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
    this.documentService.getNewDocx(modifiedExercise.contentHtml).subscribe(res => {
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


  private updateDisplayList() {
    this.displayExerciseList = this.allExercisesList;
    this.sharedDataService.updateDocumentDisplayListForToolbar(this.displayExerciseList);

    this.documentToolbar.emptyFilter();
  }


}

import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {DocumentService} from "../../services/document.service";
import {SharedDataService} from "../../services/shared-data.service";
import {AlertBroker} from "../../alert/alert-broker";
import {AlertType} from "../../alert/alert.model";
import {Exercise} from "../../classes/Exercise";
import {SuccessResponse} from "../../classes/enums/SuccessResponse";
import {DocumentToolbarComponent} from "../document-toolbar/document-toolbar.component";

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
    this.documentService.getAllExercises().subscribe(res => {
      for (const exercise of res) {
        this.allExercisesList.push(exercise);
      }
      this.updateDisplayList();
    })
  }


  private addUploadedExerciseToList(addedExercise: Exercise) {
    this.allExercisesList.push(addedExercise);

    this.updateDisplayList(true);
    this.sharedDataService.setUploadedExercise(null);
  }

  onDocumentDelete(deletedExercise: Exercise) {
    this.documentService.deleteExerciseById(deletedExercise.exerciseId).subscribe(() => {
      this.alertBroker.add(SuccessResponse.EXERCISE_DELETE_SUCCESS, AlertType.SUCCESS);
      this.allExercisesList = this.allExercisesList.filter((doc: Exercise) => doc.exerciseId !== deletedExercise.exerciseId);
      this.updateDisplayList();
    });
  }

  onDocumentSave(modifiedExercise: Exercise) {
    if (modifiedExercise.fileId && modifiedExercise.contentHtml) {
      this.documentService.saveExercise(modifiedExercise.fileId, modifiedExercise.contentHtml).subscribe(() => {

      })
    }
  }


  private updateDisplayList(emptyFilter?: boolean) {
    this.displayExerciseList = this.allExercisesList;
    this.sharedDataService.updateDocumentDisplayListForToolbar(this.displayExerciseList);

    this.documentToolbar.emptyFilter();
  }


}

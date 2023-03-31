import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {DocumentService} from "../../services/document.service";
import {SharedDataService} from "../../services/shared-data.service";
import {AlertBroker} from "../../alert/alert-broker";
import {AlertType} from "../../alert/alert.model";
import {Exercise} from "../../classes/Exercise";
import {SuccessResponse} from "../../classes/enums/SuccessResponse";
import {DocumentToolbarComponent} from "../document-toolbar/document-toolbar.component";
import {Document, Packer, Paragraph} from "docx";

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
    let asDocx = this.prepareDocx(modifiedExercise);
    Packer.toBlob(asDocx).then(result => {
      if (modifiedExercise.name && modifiedExercise.fileId) {
        const file = new File([result], modifiedExercise.name, {type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"});
        let formData = new FormData();
        formData.append("file", file);
        this.documentService.saveExercise(modifiedExercise.fileId, formData).subscribe(res => {
          console.log("saved")
        })
      }
    });
  }

  private prepareDocx(modifiedDoc: Exercise) {
    return new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: modifiedDoc.contentHtml,
          })
        ],
      }],
    });
  }


  private updateDisplayList(emptyFilter?: boolean) {
    this.displayExerciseList = this.allExercisesList;
    this.sharedDataService.updateDocumentDisplayListForToolbar(this.displayExerciseList);

    this.documentToolbar.emptyFilter();
  }


}

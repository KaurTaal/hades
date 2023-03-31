import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DocumentType} from "../../classes/enums/DocumentType";
import {BaseDocument} from "../../classes/BaseDocument";
import {Manual} from "../../classes/Manual";
import {Exercise} from "../../classes/Exercise";

@Component({
  selector: 'hades-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent {
  @Output()
  modifiedManual = new EventEmitter<Manual>();
  @Output()
  deletedManual = new EventEmitter<Manual>();
  @Output()
  modifiedExercise = new EventEmitter<Exercise>();
  @Output()
  deletedExercise = new EventEmitter<Exercise>();
  @Input()
  documents?: BaseDocument[];
  public oneAtATime: boolean = true;


  documentDeleteEvent(deletedDoc: BaseDocument) {
    if (deletedDoc) {
      if (deletedDoc.docType === DocumentType.MANUAL) {
        this.deletedManual.emit(deletedDoc as Manual);
      }
      if (deletedDoc.docType === DocumentType.EXERCISE) {
        this.deletedExercise.emit(deletedDoc as Exercise);
      }
    }
  }

  documentSaveEvent(modifiedDoc: BaseDocument) {
    if (modifiedDoc) {
      if (modifiedDoc.docType === DocumentType.MANUAL) {
        this.modifiedManual.emit(modifiedDoc as Manual);
      }
      if (modifiedDoc.docType === DocumentType.EXERCISE) {
        this.modifiedExercise.emit(modifiedDoc as Exercise);
      }
    }
  }
}

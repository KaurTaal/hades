import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DocumentType} from "../../classes/enums/DocumentType";
import {BaseDocument} from "../../classes/BaseDocument";

@Component({
  selector: 'hades-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent {
  @Output()
  deletedManual = new EventEmitter<any>();
  @Output()
  deletedExercise = new EventEmitter<any>();
  @Input()
  documents?: BaseDocument[];
  public oneAtATime: boolean = true;


  documentDeleteEvent(deletedDoc: BaseDocument) {
    if (deletedDoc) {
      if (deletedDoc.docType === DocumentType.MANUAL) {
        this.deletedManual.emit(deletedDoc);
      }
      if (deletedDoc.docType === DocumentType.EXERCISE) {
        this.deletedExercise.emit(deletedDoc);
      }
    }
  }
}

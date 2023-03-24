import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent {
  @Output()
  deletedDocumentEvent = new EventEmitter<any>();
  @Input()
  documents: any[] | undefined;
  public oneAtATime: boolean = true;




  documentDeleted(deletedDoc: any) {
    this.deletedDocumentEvent.emit(deletedDoc);
    // this.documents = this.documents?.filter(doc => doc.id !== deletedDoc.id);
  }
}

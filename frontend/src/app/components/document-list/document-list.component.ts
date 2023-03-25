import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'hades-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent {
  @Output()
  deleteDocumentEvent = new EventEmitter<any>();
  @Input()
  documents: any[] | undefined;
  public oneAtATime: boolean = true;




  documentDeleteEvent(deletedDoc: any) {
    this.deleteDocumentEvent.emit(deletedDoc);
    // this.documents = this.documents?.filter(doc => doc.id !== deletedDoc.id);
  }
}

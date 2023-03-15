import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent {
  @Input()
  documents: any[] | undefined;
  public oneAtATime: boolean = true;


  test() {
    console.log(this.documents)
  }
}

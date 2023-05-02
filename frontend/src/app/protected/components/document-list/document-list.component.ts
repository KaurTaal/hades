import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {DocumentType} from "../../classes/enums/DocumentType";
import {BaseDocument} from "../../classes/BaseDocument";
import {Manual} from "../../classes/Manual";
import {Exercise} from "../../classes/Exercise";
import {SharedDataService} from "../../services/shared-data.service";

@Component({
  selector: 'hades-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  @ViewChildren("nameInput")
  nameInputs!: QueryList<ElementRef>;
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
  oneAtATime: boolean = true;
  isEditNameDisabled: boolean = true;
  isFilteredListEmpty: boolean = false;

  constructor(private sharedDataService: SharedDataService) {
  }

  ngOnInit() {
    this.sharedDataService.getIsFilteredListEmpty().subscribe((res) => {
      this.isFilteredListEmpty = res;
      console.log(this.isFilteredListEmpty)
    })
  }

  documentDeleteEvent(deletedDoc: BaseDocument) {
    if (deletedDoc) {
      if (DocumentType.MANUAL === deletedDoc.docType) {
        this.deletedManual.emit(deletedDoc as Manual);
      }
      if (DocumentType.EXERCISE === deletedDoc.docType) {
        this.deletedExercise.emit(deletedDoc as Exercise);
      }
    }
  }

  documentSaveEvent(modifiedDoc: BaseDocument) {
    if (modifiedDoc) {
      if (DocumentType.MANUAL === modifiedDoc.docType) {
        this.modifiedManual.emit(modifiedDoc as Manual);
      }
      if (DocumentType.EXERCISE === modifiedDoc.docType) {
        this.modifiedExercise.emit(modifiedDoc as Exercise);
      }
    }
  }


  editDocumentName(event: any, index: number) {
    event.stopPropagation();

    this.isEditNameDisabled = false;
    const nameInput = this.nameInputs.toArray()[index].nativeElement as HTMLInputElement;
    setTimeout(() => nameInput.focus());

    document.addEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent) => {
    const nameInputs = this.nameInputs.toArray();
    for (const element of nameInputs) {
      const nameInput = element.nativeElement as HTMLInputElement;
      if (!nameInput.contains(event.target as Node)) {
        this.isEditNameDisabled = true;
        nameInput.blur();
        document.removeEventListener('click', this.handleClickOutside);
      }
    }
  }

  @HostListener('document:keydown.enter')
  onEnterKey() {
    const nameInputs = this.nameInputs.toArray();
    for (const element of nameInputs) {
      const nameInput = element.nativeElement as HTMLInputElement;
      if (!nameInput.disabled) {
        this.isEditNameDisabled = true;
        nameInput.blur();
        document.removeEventListener('click', this.handleClickOutside);
        break;
      }
    }
  }
}

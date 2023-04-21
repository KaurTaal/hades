import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {DocumentService} from "../../services/document.service";
import {SharedDataService} from "../../services/shared-data.service";
import {Manual} from "../../classes/Manual";
import {AlertType} from "../../../alert/alert.model";
import {AlertBroker} from "../../../alert/alert-broker";
import {SuccessResponse} from "../../classes/enums/SuccessResponse";
import {DocumentToolbarComponent} from "../document-toolbar/document-toolbar.component";
import {ManualService} from "../../services/manual.service";
import {MimeType} from "../../classes/enums/MimeType";


@Component({
  selector: 'hades-manuals',
  templateUrl: './manuals.component.html',
  styleUrls: ['./manuals.component.scss']
})
export class ManualsComponent implements OnInit {
  @ViewChild(DocumentToolbarComponent)
  documentToolbar!: DocumentToolbarComponent;
  @Output()
  allManualsList: Manual[] = [];
  @Output()
  displayManualList: Manual[] = [];

  constructor(
    private sharedDataService: SharedDataService,
    private manualService: ManualService,
    private documentService: DocumentService,
    private alertBroker: AlertBroker) {
  }

  ngOnInit() {
    this.getAllManuals();

    this.sharedDataService.subscribeToUploadedManualFile(() => {
      const addedManual = this.sharedDataService.getUploadedManual();
      if (addedManual) {
        this.addUploadedManualToList(addedManual);
      }
    })

    this.sharedDataService.getFilteredDocumentList().subscribe(filteredList => this.displayManualList = filteredList as Manual[]);
  }


  private getAllManuals() {
    this.manualService.getAllManuals().subscribe(res => {
      for (const manual of res) {
        this.allManualsList.push(manual);
      }
      this.updateDisplayList();
    })
  }

  private addUploadedManualToList(addedManual: Manual) {
    this.allManualsList.push(addedManual);

    this.updateDisplayList();
    this.sharedDataService.setUploadedManual(null);
  }

  onDocumentDelete(deletedManual: Manual) {
    this.manualService.deleteManualById(deletedManual.manualId).subscribe(() => {
      this.alertBroker.add(SuccessResponse.MANUAL_DELETE_SUCCESS, AlertType.SUCCESS);
      this.allManualsList = this.allManualsList.filter((doc: Manual) => doc.manualId !== deletedManual.manualId);
      this.updateDisplayList();
    });
  }

  onDocumentSave(modifiedManual: Manual) {
    this.documentService.getNewDocxFile(modifiedManual.contentHtml).subscribe(res => {
      if (res.body) {
        let file = new File([res.body], modifiedManual.name, {type: MimeType.DOCX});
        let formData = new FormData();
        formData.append("file", file);
        this.documentService.saveEditedFile(modifiedManual.fileId, formData).subscribe(() => {
          this.alertBroker.add(SuccessResponse.MANUAL_EDIT_SUCCESS, AlertType.SUCCESS);
        })
      }
    });
  }

  private updateDisplayList() {
    this.displayManualList = this.allManualsList;
    this.sharedDataService.updateDocumentDisplayListForToolbar(this.displayManualList);

    this.documentToolbar.emptyFilter();
  }

}

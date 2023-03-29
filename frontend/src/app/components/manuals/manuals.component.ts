import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {DocumentService} from "../../services/document.service";
import {SharedDataService} from "../../services/shared-data.service";
import {Manual} from "../../classes/Manual";
import {AlertType} from "../../alert/alert.model";
import {AlertBroker} from "../../alert/alert-broker";
import {SuccessResponse} from "../../classes/enums/SuccessResponse";
import {DocumentToolbarComponent} from "../document-toolbar/document-toolbar.component";


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
    this.documentService.getAllManuals().subscribe(res => {
      for (const manual of res) {
        this.allManualsList.push(manual);
      }
      this.updateDisplayList();
    })
  }

  private addUploadedManualToList(addedManual: Manual) {
    this.allManualsList.push(addedManual);

    this.updateDisplayList(true);
    this.sharedDataService.setUploadedManual(null);
  }

  onDocumentDelete(deletedManual: Manual) {
    this.documentService.deleteManualById(deletedManual.manualId).subscribe(() => {
      this.alertBroker.add(SuccessResponse.MANUAL_DELETE_SUCCESS, AlertType.SUCCESS);
      this.allManualsList = this.allManualsList.filter((doc: Manual) => doc.manualId !== deletedManual.manualId);
      this.updateDisplayList();
    });
  }

  onDocumentSave(modifiedManual: Manual) {
    console.log(modifiedManual);
  }

  private updateDisplayList(emptyFilter?: boolean) {
    this.displayManualList = this.allManualsList;
    this.sharedDataService.updateDocumentDisplayListForToolbar(this.displayManualList);

    this.documentToolbar.emptyFilter();
  }

}

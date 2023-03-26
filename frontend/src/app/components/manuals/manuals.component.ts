import {Component, OnInit, Output} from '@angular/core';
import {DocumentService} from "../../services/document.service";
import {SharedDataService} from "../../services/shared-data.service";
import {Manual} from "../../classes/Manual";
import {AlertType} from "../../alert/alert.model";
import {AlertBroker} from "../../alert/alert-broker";
import {SuccessResponse} from "../../classes/enums/SuccessResponse";


@Component({
  selector: 'hades-manuals',
  templateUrl: './manuals.component.html',
  styleUrls: ['./manuals.component.scss']
})
export class ManualsComponent implements OnInit {
  @Output()
  allManualsList: Manual[] = [];

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
  }


  private getAllManuals() {
    this.documentService.getAllManuals().subscribe(res => {
      for (const manual of res) {
        this.allManualsList.push(manual);
      }
    })
  }

  private addUploadedManualToList(addedManual: Manual) {
    this.allManualsList.push(addedManual);
    this.sharedDataService.setUploadedManual(null);
  }

  onDocumentDelete(deletedManual: Manual) {
    this.documentService.deleteManualById(deletedManual.manualId).subscribe(() => {
      this.alertBroker.add(SuccessResponse.MANUAL_DELETE_SUCCESS, AlertType.SUCCESS);
      this.allManualsList = this.allManualsList.filter((doc: Manual) => doc.manualId !== deletedManual.manualId);
    });
  }
}

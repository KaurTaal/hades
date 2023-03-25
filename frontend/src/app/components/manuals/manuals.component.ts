import {Component, OnInit, Output} from '@angular/core';
import {DocumentService} from "../../services/document.service";
import {SharedDataService} from "../../services/shared-data.service";
import {add} from "ngx-bootstrap/chronos";
import {Manual} from "../../classes/Manual";
import {AlertType} from "../../alert/alert.model";
import {AlertBroker} from "../../alert/alert-broker";


@Component({
  selector: 'hades-manuals',
  templateUrl: './manuals.component.html',
  styleUrls: ['./manuals.component.scss']
})
export class ManualsComponent implements OnInit {
  @Output()
  allManualsList: any = [];

  constructor(private manualService: DocumentService,
              private sharedDataService: SharedDataService,
              private documentService: DocumentService,
              private alertBroker: AlertBroker) {
  }

  ngOnInit() {
    this.getAllManuals();

    this.sharedDataService.subscribeToUploadedFileData(() => {
      const addedManual = this.sharedDataService.getUploadedFileData();
      if (addedManual) {
        this.addUploadedFileToList(addedManual);
      }
    })
  }


  private getAllManuals() {
    this.manualService.getAllManuals().subscribe(res => {
      for (const manual of res) {
        this.allManualsList.push({id: manual.manualId, docId: manual.fileId, name: manual.name, text: manual.contentHtml});
      }
    })
  }

  private addUploadedFileToList(addedManual: any) {
    this.allManualsList.push({id: addedManual.manualId, docId: addedManual.docId, name: addedManual.name, text: addedManual.contentHtml});
  }

  onDocumentDelete(deletedManual: any) {
    this.documentService.deleteManualById(deletedManual.id).subscribe(() => {
      this.alertBroker.add("Dokument kustutatud", AlertType.SUCCESS);
      this.allManualsList = this.allManualsList.filter((doc: any) => doc.id !== deletedManual.id);
    });
  }
}

import {Component, OnInit, Output} from '@angular/core';
import {ManualService} from "../services/manual.service";
import {SharedDataService} from "../services/shared-data.service";
import {add} from "ngx-bootstrap/chronos";


@Component({
  selector: 'app-manuals',
  templateUrl: './manuals.component.html',
  styleUrls: ['./manuals.component.scss']
})
export class ManualsComponent implements OnInit {
  @Output()
  allManualsList: any = [];

  constructor(private manualService: ManualService,
              private sharedDataService: SharedDataService) {
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
        this.allManualsList.push({id: manual.manualId, name: manual.name, text: manual.contentHtml});
      }
    })
  }

  private addUploadedFileToList(addedManual: any) {
    this.allManualsList.push({id: addedManual.manualId, name: addedManual.name, text: addedManual.contentHtml});
  }

  onDocumentDeleted(deletedDoc: any) {
    this.allManualsList = this.allManualsList.filter((doc: any) => doc.id !== deletedDoc.id);
  }
}

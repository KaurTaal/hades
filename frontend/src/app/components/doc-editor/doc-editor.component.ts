import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DownloadService} from "../../services/download.service";
import {DocumentService} from "../../services/document.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'hades-doc-editor',
  templateUrl: './doc-editor.component.html',
  styleUrls: ['./doc-editor.component.scss']
})
export class DocEditorComponent implements OnInit {
  @Output()
  deletedDocument = new EventEmitter<any>();
  @Input()
  document: any;

  readonly editorConfig = {
    plugins: 'code link image table codesample autoresize',
    toolbar: 'undo redo | bold italic underline | link image table | forecolor backcolor | codesample | code',
    branding: false,
    menu: {
      file: {
        title: 'File',
        items: 'print'
      }
    },
    content_style: 'html, body {' +
      '        height: 100%;' +
      '    }' +
      '' +
      '    html {' +
      '        display: table;' +
      '        margin: auto;' +
      '    }' +
      '' +
      '    body {' +
      '        display: table-cell;' +
      '        vertical-align: middle;' +
      '    }',
    code_dialog: true,
    codesample_languages: [
      {text: 'Python', value: 'python'},
      {text: 'Java', value: 'java'},
    ],
    autoresize_bottom_margin: 0,
  };

  constructor(private documentService: DocumentService,
              private downloadService: DownloadService) {
  }


  ngOnInit() {

  }

  deleteManual(document: any) {
    this.deletedDocument.emit(document);
  }

  downloadDocument(document: any) {
    this.downloadService.downloadFile(document.docId);
  }


  getEditorAPIKey(): string {
    return environment.EDITOR_API_KEY;
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DownloadService} from "../../services/download.service";
import {DocumentService} from "../../services/document.service";
import {environment} from "../../../environments/environment";
import {BaseDocument} from "../../classes/BaseDocument";

@Component({
  selector: 'hades-doc-editor',
  templateUrl: './doc-editor.component.html',
  styleUrls: ['./doc-editor.component.scss']
})
export class DocEditorComponent implements OnInit {
  @Output()
  deletedDocument = new EventEmitter<BaseDocument>();
  @Output()
  modifiedDocument = new EventEmitter<BaseDocument>();
  @Input()
  document: BaseDocument = new BaseDocument(-1, "", "", "");
  editorContent: string = '';

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
    code_dialog: true,
    codesample_languages: [
      {text: 'Python', value: 'python'},
      {text: 'Java', value: 'java'},
    ],
    autoresize_bottom_margin: 40,
  };

  constructor(private documentService: DocumentService,
              private downloadService: DownloadService) {
  }


  ngOnInit() {
    this.editorContent = this.document.contentHtml!;
  }

  saveDocument(document: BaseDocument) {
    document.contentHtml = this.editorContent;
    this.modifiedDocument.emit(document);
  }

  deleteDocument(document: BaseDocument) {
    this.deletedDocument.emit(document);
  }

  downloadDocumentByFileId(document: BaseDocument) {
    if (document.fileId) {
      this.downloadService.downloadFile(document.fileId);
    }
  }


  getEditorAPIKey(): string {
    return environment.EDITOR_API_KEY;
  }
}

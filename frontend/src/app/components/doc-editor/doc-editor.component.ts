import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DownloadService} from "../../services/download.service";
import {DocumentService} from "../../services/document.service";
import {environment} from "../../../environments/environment";
import {BaseDocument} from "../../classes/BaseDocument";
import {Course} from "../../classes/Course";
import {DocumentType} from "../../classes/enums/DocumentType";
import {Exercise} from "../../classes/Exercise";

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
  document: BaseDocument = new BaseDocument(-1, "", "", "", -1, new Course("", ""));
  editorContent: string = '';
  activeEditorTab: DocumentType = DocumentType.EXERCISE;
  isExerciseDocument: boolean = false;

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
    this.editorContent = this.document.contentHtml;
    this.isExerciseDocument = this.document.docType === DocumentType.EXERCISE;
  }

  saveDocument(document: BaseDocument) {
    if (DocumentType.SOLUTION === this.activeEditorTab) {
      const documentAsExercise: Exercise = this.document as Exercise;
      documentAsExercise.solutionDTO.contentHtml = this.editorContent;
    } else {
      this.document.contentHtml = this.editorContent;
    }
    this.modifiedDocument.emit(document);
  }

  deleteDocument(document: BaseDocument) {
    this.deletedDocument.emit(document);
  }

  downloadDocument(document: BaseDocument) {
    if (DocumentType.EXERCISE === this.activeEditorTab && document.fileId) {
      this.downloadService.downloadFile(document.fileId);
    }
    if (DocumentType.SOLUTION === this.activeEditorTab) {
      const documentAsExercise: Exercise = this.document as Exercise;
      if (documentAsExercise.solutionDTO && documentAsExercise.solutionDTO.fileId) {
        this.downloadService.downloadFile(documentAsExercise.solutionDTO.fileId);
      }
    }
  }

  toggleSolutionTab() {
    this.activeEditorTab = DocumentType.SOLUTION;
    let activeDocument: Exercise = this.document as Exercise;
    this.editorContent = activeDocument.solutionDTO.contentHtml;
  }

  toggleExerciseTab() {
    this.activeEditorTab = DocumentType.EXERCISE;
    this.editorContent = this.document.contentHtml;
  }

  getEditorAPIKey(): string {
    return environment.EDITOR_API_KEY;
  }
}

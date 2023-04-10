import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DownloadService} from "../../services/download.service";
import {DocumentService} from "../../services/document.service";
import {environment} from "../../../environments/environment";
import {BaseDocument} from "../../classes/BaseDocument";
import {DocumentType} from "../../classes/enums/DocumentType";
import {Exercise} from "../../classes/Exercise";

@Component({
  selector: 'hades-doc-editor',
  templateUrl: './doc-editor.component.html',
  styleUrls: ['./doc-editor.component.scss']
})
export class DocEditorComponent implements OnInit {
  @Output()
  addNewTestSuite = new EventEmitter<BaseDocument>();
  @Output()
  deletedDocument = new EventEmitter<BaseDocument>();
  @Output()
  modifiedDocument = new EventEmitter<BaseDocument>();
  @Input()
  document!: BaseDocument;
  documentAsExercise!: Exercise;
  activeEditorTab!: DocumentType;
  isExerciseDocument: boolean = false;


  isTestSuiteTabActive: boolean = false;
  isSolutionTabActive: boolean = false;
  isMainTabActive: boolean = false;

  readonly mainTabEditorConfig = {
    plugins: 'code link image table codesample autoresize',
    toolbar: 'undo redo | bold italic underline | link table | forecolor backcolor | codesample | code',
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
  };

  readonly solutionAndTestSuiteEditorConfig = {
    plugins: 'codesample code autoresize',
    toolbar: 'undo redo | codesample | code',
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
  }

  constructor(private documentService: DocumentService,
              private downloadService: DownloadService) {
  }


  ngOnInit() {
    this.setMainTabActive();
    this.isExerciseDocument = DocumentType.EXERCISE === this.document.docType;
    this.activeEditorTab = this.document.docType;
    if (this.isExerciseDocument) {
      this.documentAsExercise = this.document as Exercise;
    }
  }

  newTestSuite(document: BaseDocument) {
    console.log(document)
  }

  saveDocument(document: BaseDocument) {
    this.modifiedDocument.emit(document);
  }

  deleteDocument(document: BaseDocument) {
    this.deletedDocument.emit(document);
  }

  downloadDocument(document: BaseDocument) {
    if ((DocumentType.EXERCISE === this.activeEditorTab || DocumentType.MANUAL === this.activeEditorTab) && document.fileId) {
      this.downloadService.downloadFile(document.fileId);
    }
    if (DocumentType.SOLUTION === this.activeEditorTab) {
      if (this.documentAsExercise.solutionDTO && this.documentAsExercise.solutionDTO.fileId) {
        this.downloadService.downloadFile(this.documentAsExercise.solutionDTO.fileId);
      }
    }
    if (DocumentType.TEST_SUITE === this.activeEditorTab) {
      if (this.documentAsExercise.testSuiteDTOList) {
        this.documentAsExercise.testSuiteDTOList.forEach(testSuite => this.downloadService.downloadFile(testSuite.fileId));
      }
    }
  }

  toggleSolutionTab() {
    this.setSolutionTabActive();
    this.activeEditorTab = DocumentType.SOLUTION;
  }

  toggleExerciseTab() {
    this.setMainTabActive();
    this.activeEditorTab = this.document.docType;
  }

  toggleTestSuiteTab() {
    this.setTestSuiteTabActiveTrue();
    this.activeEditorTab = DocumentType.TEST_SUITE;
    this.isTestSuiteTabActive = true;
  }

  getEditorAPIKey(): string {
    return environment.EDITOR_API_KEY;
  }


  private setTestSuiteTabActiveTrue() {
    this.isTestSuiteTabActive = true;
    this.isMainTabActive = false;
    this.isSolutionTabActive = false;
  }

  private setMainTabActive() {
    this.isMainTabActive = true;
    this.isSolutionTabActive = false;
    this.isTestSuiteTabActive = false;
  }

  private setSolutionTabActive() {
    this.isSolutionTabActive = true;
    this.isMainTabActive = false;
    this.isTestSuiteTabActive = false;
  }
}

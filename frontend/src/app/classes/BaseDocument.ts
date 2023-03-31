import {DocumentType} from "./enums/DocumentType";

export class BaseDocument {
  fileId: number;
  contentHtml: string;
  name: string;
  docType: DocumentType;


  constructor(fileId: number, contentHtml: string, name: string, docType: DocumentType) {
    this.fileId = fileId;
    this.contentHtml = contentHtml;
    this.name = name;
    this.docType = docType;
  }


}

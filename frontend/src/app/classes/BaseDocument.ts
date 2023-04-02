import {DocumentType} from "./enums/DocumentType";

export class BaseDocument {
  fileId: number;
  contentHtml: string;
  name: string;
  docType: DocumentType;
  year: number;


  constructor(fileId: number, contentHtml: string, name: string, docType: DocumentType, year: number) {
    this.fileId = fileId;
    this.contentHtml = contentHtml;
    this.name = name;
    this.docType = docType;
    this.year = year;
  }


}

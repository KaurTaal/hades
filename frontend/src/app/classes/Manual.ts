import {BaseDocument} from "./BaseDocument";
import {DocumentType} from "./enums/DocumentType";

export class Manual extends BaseDocument{
  manualId: number;

  constructor(manualId: number, fileId: number, contentHtml: string, name: string, year: number) {
    super(fileId, contentHtml, name, DocumentType.MANUAL, year);
    this.manualId = manualId;
  }
}

import {BaseDocument} from "./BaseDocument";
import {DocumentType} from "./enums/DocumentType";
import {Course} from "./Course";

export class Manual extends BaseDocument{
  manualId: number;

  constructor(manualId: number, fileId: number, contentHtml: string, name: string, year: number, course: Course) {
    super(fileId, contentHtml, name, DocumentType.MANUAL, year, course);
    this.manualId = manualId;
  }
}

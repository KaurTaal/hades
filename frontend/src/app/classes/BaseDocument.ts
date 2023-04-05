import {DocumentType} from "./enums/DocumentType";
import {Course} from "./Course";

export class BaseDocument {
  fileId: number;
  contentHtml: string;
  name: string;
  docType: DocumentType;
  year: number;
  courseDTO: Course;


  constructor(fileId: number, contentHtml: string, name: string, docType: DocumentType, year: number, course: Course) {
    this.fileId = fileId;
    this.contentHtml = contentHtml;
    this.name = name;
    this.docType = docType;
    this.year = year;
    this.courseDTO = course;
  }

}

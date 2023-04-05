import {BaseDocument} from "./BaseDocument";
import {DocumentType} from "./enums/DocumentType";
import {Label} from "./Label";
import {Course} from "./Course";

export class Exercise extends BaseDocument{
  exerciseId: number;
  labelDTOList: Label[];

  constructor(exerciseId: number, labelList: Label[], fileId: number, contentHtml: string, name: string, year: number, course: Course) {
    super(fileId, contentHtml, name, DocumentType.EXERCISE, year, course);
    this.exerciseId = exerciseId;
    this.labelDTOList = labelList;
  }
}

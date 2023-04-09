import {BaseDocument} from "./BaseDocument";
import {DocumentType} from "./enums/DocumentType";
import {Label} from "./Label";
import {Course} from "./Course";
import {Solution} from "./Solution";

export class Exercise extends BaseDocument{
  exerciseId: number;
  labelDTOList: Label[];
  solutionDTO: Solution;

  constructor(exerciseId: number, labelList: Label[], fileId: number, contentHtml: string, name: string, year: number, course: Course, solution: Solution) {
    super(fileId, contentHtml, name, DocumentType.EXERCISE, year, course);
    this.exerciseId = exerciseId;
    this.labelDTOList = labelList;
    this.solutionDTO = solution;
  }
}

import {BaseDocument} from "./BaseDocument";
import {DocumentType} from "./enums/DocumentType";

export class Exercise extends BaseDocument{
  exerciseId: number;

  constructor(exerciseId: number, fileId: number, contentHtml: string, name: string) {
    super(fileId, contentHtml, name, DocumentType.EXERCISE);
    this.exerciseId = exerciseId;
  }
}

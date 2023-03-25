export class Exercise {
  exerciseId: number;
  fileId: number;
  contentHtml: string;
  name: string;


  constructor(exerciseId: number, fileId: number, contentHtml: string, name: string) {
    this.exerciseId = exerciseId;
    this.fileId = fileId;
    this.contentHtml = contentHtml;
    this.name = name;
  }
}

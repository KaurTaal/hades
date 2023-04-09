

export class Solution {

  solutionId: number;
  exerciseId: number;
  fileId: number;
  contentHtml: string;
  name: string;


  constructor(solutionId: number, exerciseId: number, fileId: number, contentHtml: string, name: string) {
    this.solutionId = solutionId;
    this.exerciseId = exerciseId;
    this.fileId = fileId;
    this.contentHtml = contentHtml;
    this.name = name;
  }
}

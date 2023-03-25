export class Manual {
  manualId: number;
  fileId: number;
  contentHtml: string;
  name: string;


  constructor(manualId: number, fileId: number, contentHtml: string, name: string) {
    this.manualId = manualId;
    this.fileId = fileId;
    this.contentHtml = contentHtml;
    this.name = name;
  }
}

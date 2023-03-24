export class ManualDoc {
  private manualId: number;
  private docId: number;
  private contentHtml: string;
  private name: string;

  constructor(obj: { manualDocId: number, docId: number, contentHtml: string, name: string }) {
    this.manualId = obj.manualDocId;
    this.docId = obj.docId;
    this.contentHtml = obj.contentHtml;
    this.name = obj.name;
  }

}

export class Label {
  public labelId: number;
  public name: string;

  constructor(obj: { labelId: number, labelName: string }) {
    this.labelId = obj.labelId;
    this.name = obj.labelName;
  }

}

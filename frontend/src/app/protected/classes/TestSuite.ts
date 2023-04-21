

export class TestSuite {

  testSuiteId: number;
  exerciseId: number;
  fileId: number;
  contentHtml: string;
  name: string;

  constructor(testSuiteId: number, exerciseId: number, fileId: number, contentHtml: string, name: string) {
    this.testSuiteId = testSuiteId;
    this.exerciseId = exerciseId;
    this.fileId = fileId;
    this.contentHtml = contentHtml;
    this.name = name;
  }
}

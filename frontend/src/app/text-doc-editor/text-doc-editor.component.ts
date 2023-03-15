import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-text-doc-editor',
  templateUrl: './text-doc-editor.component.html',
  styleUrls: ['./text-doc-editor.component.scss']
})
export class TextDocEditorComponent implements OnInit {
  @Input()
  document: any;

  API_KEY: string = "pj67ouezfcz4z72h5b5wewp75gnwata17ojfaabtutt51mz9"  // Don't modify!

  public editorConfig = {
    plugins: 'code link image table codesample autoresize',
    toolbar: 'undo redo | bold italic underline | link image table | forecolor backcolor | codesample | code',
    branding: false,
    menu: {
      file: {
        title: 'File',
        items: 'print'
      }
    },
    content_style: 'html, body {' +
      '        height: 100%;' +
      '    }' +
      '' +
      '    html {' +
      '        display: table;' +
      '        margin: auto;' +
      '    }' +
      '' +
      '    body {' +
      '        display: table-cell;' +
      '        vertical-align: middle;' +
      '    }',
    code_dialog: true,
    codesample_languages: [
      { text: 'Python', value: 'python' },
      { text: 'Java', value: 'java' },
    ],
    autoresize_bottom_margin: 0,
  };




  ngOnInit() {

  }

}

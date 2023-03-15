import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDocEditorComponent } from './text-doc-editor.component';

describe('TextDocEditorComponent', () => {
  let component: TextDocEditorComponent;
  let fixture: ComponentFixture<TextDocEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextDocEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextDocEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

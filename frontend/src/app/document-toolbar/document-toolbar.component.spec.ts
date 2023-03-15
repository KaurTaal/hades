import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentToolbarComponent } from './document-toolbar.component';

describe('DocumentToolbarComponent', () => {
  let component: DocumentToolbarComponent;
  let fixture: ComponentFixture<DocumentToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

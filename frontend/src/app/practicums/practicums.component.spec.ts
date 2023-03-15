import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticumsComponent } from './practicums.component';

describe('PracticumsComponent', () => {
  let component: PracticumsComponent;
  let fixture: ComponentFixture<PracticumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticumsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

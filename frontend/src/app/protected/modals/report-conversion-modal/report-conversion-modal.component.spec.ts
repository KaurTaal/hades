import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportConversionModalComponent } from './report-conversion-modal.component';

describe('ReportConversionModalComponent', () => {
  let component: ReportConversionModalComponent;
  let fixture: ComponentFixture<ReportConversionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportConversionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportConversionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

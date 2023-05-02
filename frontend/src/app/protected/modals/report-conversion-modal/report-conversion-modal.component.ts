import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import {AlertBroker} from "../../../alert/alert-broker";
import {SuccessResponse} from "../../classes/enums/SuccessResponse";
import {AlertType} from "../../../alert/alert.model";

@Component({
  selector: 'hades-report-conversion-modal',
  templateUrl: './report-conversion-modal.component.html',
  styleUrls: ['./report-conversion-modal.component.scss']
})
export class ReportConversionModalComponent {

  reportText: FormControl = new FormControl(
    {value: '', disabled: false},
    [Validators.required]
  )

  reportFormGroup: FormGroup = this.initForm();


  constructor(public bsModalRef: BsModalRef, private alertBroker: AlertBroker,) {
  }

  initForm(): FormGroup {
    return new FormGroup({
      reportText: this.reportText,
    })
  }

  isFormValid() {
    return !this.reportFormGroup.valid;
  }

  sendReport() {
    this.alertBroker.add(SuccessResponse.REPORT_SENT_SUCCESS, AlertType.SUCCESS);
    this.bsModalRef.hide();
  }
}

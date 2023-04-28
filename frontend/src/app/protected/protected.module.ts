import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProtectedRoutingModule} from './protected-routing.module';
import {ManualsComponent} from "./components/manuals/manuals.component";
import {DocEditorComponent} from "./components/doc-editor/doc-editor.component";
import {DocumentListComponent} from "./components/document-list/document-list.component";
import {DocumentToolbarComponent} from "./components/document-toolbar/document-toolbar.component";
import {FileUploadModalComponent} from "./modals/file-upload-modal/file-upload-modal.component";
import {UsersComponent} from "./components/users/users.component";
import {ExercisesComponent} from "./components/exercises/exercises.component";
import {AddFileUploadComponent} from "./modals/add-file-upload/add-file-upload.component";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {TabsModule} from "ngx-bootstrap/tabs";
import {AccordionModule} from "ngx-bootstrap/accordion";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditorModule} from "@tinymce/tinymce-angular";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TypeaheadModule} from "ngx-bootstrap/typeahead";
import {ModalModule} from "ngx-bootstrap/modal";
import {MatSelectModule} from "@angular/material/select";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {TagInputModule} from "ngx-chips";
import {NgxSelectModule} from "ngx-select-ex";
import {AlertModule} from "ngx-bootstrap/alert";
import {ReportConversionModalComponent} from './modals/report-conversion-modal/report-conversion-modal.component';
import {DeleteConfirmDialogComponent} from './dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ManualsComponent,
    DocEditorComponent,
    DocumentListComponent,
    DocumentToolbarComponent,
    FileUploadModalComponent,
    UsersComponent,
    ExercisesComponent,
    AddFileUploadComponent,
    ReportConversionModalComponent,
    DeleteConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    CollapseModule,
    TabsModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    BsDropdownModule,
    TypeaheadModule,
    ModalModule.forRoot(),
    MatSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    TagInputModule,
    NgxSelectModule,
    AlertModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class ProtectedModule {
}

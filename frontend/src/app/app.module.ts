import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import {CollapseModule} from "ngx-bootstrap/collapse";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';
import {TabsModule} from "ngx-bootstrap/tabs";
import { ManualsComponent } from './manuals/manuals.component';
import {AccordionModule} from "ngx-bootstrap/accordion";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TextDocEditorComponent } from './text-doc-editor/text-doc-editor.component';
import { DocumentListComponent } from './document-list/document-list.component';
import {EditorModule} from "@tinymce/tinymce-angular";
import { DocumentToolbarComponent } from './document-toolbar/document-toolbar.component';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TypeaheadModule} from "ngx-bootstrap/typeahead";
import { ModalModule } from 'ngx-bootstrap/modal';
import { FileUploadModalComponent } from './modals/file-upload-modal/file-upload-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UsersComponent } from './users/users.component';
import {MatSelectModule} from "@angular/material/select";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { ExercisesComponent } from './exercises/exercises.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NavbarComponent,
    ManualsComponent,
    TextDocEditorComponent,
    DocumentListComponent,
    DocumentToolbarComponent,
    FileUploadModalComponent,
    UsersComponent,
    ExercisesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule,
    FontAwesomeModule,
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
    HttpClientModule
  ],
  providers: [
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

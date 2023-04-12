import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuComponent} from './components/menu/menu.component';
import {CollapseModule} from "ngx-bootstrap/collapse";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NavbarComponent} from './components/navbar/navbar.component';
import {TabsModule} from "ngx-bootstrap/tabs";
import {ManualsComponent} from './components/manuals/manuals.component';
import {AccordionModule} from "ngx-bootstrap/accordion";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DocEditorComponent} from './components/doc-editor/doc-editor.component';
import {DocumentListComponent} from './components/document-list/document-list.component';
import {EditorModule} from "@tinymce/tinymce-angular";
import {DocumentToolbarComponent} from './components/document-toolbar/document-toolbar.component';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TypeaheadModule} from "ngx-bootstrap/typeahead";
import {BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {FileUploadModalComponent} from './modals/file-upload-modal/file-upload-modal.component';
import {UsersComponent} from './components/users/users.component';
import {MatSelectModule} from "@angular/material/select";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {ExercisesComponent} from './components/exercises/exercises.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpMiddleware} from "../core/http-middleware";
import {AlertModule} from "ngx-bootstrap/alert";
import {AlertComponent} from "./alert/alert.component";
import {LoaderComponent} from './components/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoaderInterceptor} from "../core/loader.interceptor";
import {TagInputModule} from "ngx-chips";
import {NgxSelectModule} from "ngx-select-ex";
import { AddFileUploadComponent } from './modals/add-file-upload/add-file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NavbarComponent,
    ManualsComponent,
    DocEditorComponent,
    DocumentListComponent,
    DocumentToolbarComponent,
    FileUploadModalComponent,
    UsersComponent,
    ExercisesComponent,
    AlertComponent,
    LoaderComponent,
    AddFileUploadComponent,
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
    HttpClientModule,
    AlertModule,
    MatProgressSpinnerModule,
    TagInputModule,
    NgxSelectModule,
  ],
  providers: [
    BsModalService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpMiddleware, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

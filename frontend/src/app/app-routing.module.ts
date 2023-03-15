import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticumsComponent } from "./practicums/practicums.component";
import { ManualsComponent } from "./manuals/manuals.component";
import {ExtraComponent} from "./extra/extra.component";
import {ExamsComponent} from "./exams/exams.component";
import {AssessmentsComponent} from "./assessments/assessments.component";
import {HomeworksComponent} from "./homeworks/homeworks.component";

const routes: Routes = [
  { path: '', redirectTo: '/manuals', pathMatch: 'full'},
  { path: 'manuals', component: ManualsComponent},
  { path: 'practicums', component: PracticumsComponent},
  { path: 'homeworks', component: HomeworksComponent},
  { path: 'assessments', component: AssessmentsComponent},
  { path: 'exams', component: ExamsComponent},
  { path: 'extra', component: ExtraComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

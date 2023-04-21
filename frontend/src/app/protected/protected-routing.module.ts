import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManualsComponent} from "./components/manuals/manuals.component";
import {ExercisesComponent} from "./components/exercises/exercises.component";
import {UsersComponent} from "./components/users/users.component";

const routes: Routes = [
  { path: 'manuals', component: ManualsComponent},
  { path: 'exercises', component: ExercisesComponent},
  { path: 'users', component: UsersComponent},
  { path: "**", redirectTo: "exercises", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }

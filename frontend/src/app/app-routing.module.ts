import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManualsComponent } from "./manuals/manuals.component";
import {UsersComponent} from "./users/users.component";
import {ExercisesComponent} from "./exercises/exercises.component";


const routes: Routes = [
  { path: '', redirectTo: '/manuals', pathMatch: 'full'},
  { path: 'manuals', component: ManualsComponent},
  { path: 'exercises', component: ExercisesComponent},
  { path: 'users', component: UsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";


const routes: Routes = [
  {
    path: "protected",
    canActivate: [AuthGuard],
    loadChildren: () => import("./protected/protected.module").then(m => m.ProtectedModule)
  },
  {
    path: "public",
    loadChildren: () => import("./public/public.module").then(m => m.PublicModule)
  },
  {
    path: "**",
    redirectTo: "public",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

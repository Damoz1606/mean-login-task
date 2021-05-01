import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PublicTasksComponent } from './components/public-tasks/public-tasks.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';

import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path:"signin",
    component: SigninComponent
  },
  {
    path:"signup",
    component: SignupComponent
  },
  {
    path:"public",
    component: PublicTasksComponent
  },
  {
    path:"private",
    component: PrivateTasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "",
    redirectTo: "/signin",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

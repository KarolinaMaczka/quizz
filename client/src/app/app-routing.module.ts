import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateUserComponent } from './create-user/create-user.component';
import { LearnTestComponent } from './learn-test/learn-test.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ViewTestComponent } from './view-test/view-test.component';

const routes: Routes = [
  { path: 'main-page/:id', component: MainPageComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'edit-test/:id', component: LearnTestComponent },
  { path: '', component: LoginComponent },
  { path: 'view-test/:userId/:id/:title', component: ViewTestComponent },
  {path: 'learn-test/:userId/:id', component: LearnTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

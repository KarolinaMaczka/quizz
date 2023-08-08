import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateUserComponent } from './create-user/create-user.component';
import { EditTestComponent } from './edit-test/edit-test.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ViewTestComponent } from './view-test/view-test.component';

const routes: Routes = [
  { path: 'main-page', component: MainPageComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'edit-test/:id', component: EditTestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'view-test/:id/:title', component: ViewTestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

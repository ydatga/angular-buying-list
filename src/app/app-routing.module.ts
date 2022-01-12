import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ShowUsersComponent } from './show-users/show-users.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: '', component: TestComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'users', component: ShowUsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

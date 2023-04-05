import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatepostComponent } from './createpost/createpost.component';
import { PostlistComponent } from './postlist/postlist.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './service/auth.guard';
import { PracticeComponent } from './practice/practice.component';

const routes: Routes = [
  {path:"", component:PostlistComponent},
  {path:"postList", component:PostlistComponent},
  {path:"practice", component:PracticeComponent},
  {path:"createPost", component:CreatepostComponent, canActivate: [AuthGuard]},
  {path:"edit/:postId", component:CreatepostComponent, canActivate: [AuthGuard]},
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

//we reusing the create form to edit form with the help of routing, we specify to encode which post need to be edit on url
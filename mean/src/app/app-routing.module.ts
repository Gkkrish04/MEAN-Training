import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatepostComponent } from './createpost/createpost.component';
import { PostlistComponent } from './postlist/postlist.component';

const routes: Routes = [
  {path:"", component:PostlistComponent},
  {path:"createPost", component:CreatepostComponent},
  {path:"postList", component:PostlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

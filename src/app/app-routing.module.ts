import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
// @ngModule({
//   imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
//   exports: [RouterModule],
//   })
export class AppRoutingModule { }

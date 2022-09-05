import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddOrderComponent} from "./add-order/add-order.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: 'add-order',
    component: AddOrderComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

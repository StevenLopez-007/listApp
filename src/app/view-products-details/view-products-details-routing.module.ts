import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProductsDetailsPage } from './view-products-details.page';

const routes: Routes = [
  {
    path: '',
    component: ViewProductsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProductsDetailsPageRoutingModule {}

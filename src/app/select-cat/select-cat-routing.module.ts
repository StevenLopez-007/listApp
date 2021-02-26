import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectCatPage } from './select-cat.page';

const routes: Routes = [
  {
    path: '',
    component: SelectCatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectCatPageRoutingModule {}

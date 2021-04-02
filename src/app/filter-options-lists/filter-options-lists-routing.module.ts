import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterOptionsListsPage } from './filter-options-lists.page';

const routes: Routes = [
  {
    path: '',
    component: FilterOptionsListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterOptionsListsPageRoutingModule {}

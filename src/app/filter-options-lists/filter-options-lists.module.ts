import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterOptionsListsPageRoutingModule } from './filter-options-lists-routing.module';

import { FilterOptionsListsPage } from './filter-options-lists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterOptionsListsPageRoutingModule
  ],
  declarations: [FilterOptionsListsPage]
})
export class FilterOptionsListsPageModule {}

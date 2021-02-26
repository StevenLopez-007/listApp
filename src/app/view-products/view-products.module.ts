import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProductsPageRoutingModule } from './view-products-routing.module';

import { ViewProductsPage } from './view-products.page';
import { FilterProductsPipe } from '../pipes/filter-products.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProductsPageRoutingModule
  ],
  declarations: [ViewProductsPage,FilterProductsPipe]
})
export class ViewProductsPageModule {}

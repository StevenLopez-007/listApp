import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchProductPageRoutingModule } from './search-product-routing.module';

import { SearchProductPage } from './search-product.page';
import { FilterFoundProductsPipe } from '../pipes/filter-found-products.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchProductPageRoutingModule
  ],
  declarations: [SearchProductPage,FilterFoundProductsPipe]
})
export class SearchProductPageModule {}

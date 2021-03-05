import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProductsPageRoutingModule } from './view-products-routing.module';

import { ViewProductsPage } from './view-products.page';
import { AnimateItemsDirective } from '../directives/animate-items.directive';
import { PipesModule } from '../pipes/PipesModule.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProductsPageRoutingModule,
    PipesModule
  ],
  declarations: [ViewProductsPage,AnimateItemsDirective]
})
export class ViewProductsPageModule {}

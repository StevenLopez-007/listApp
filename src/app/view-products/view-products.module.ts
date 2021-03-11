import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProductsPageRoutingModule } from './view-products-routing.module';

import { ViewProductsPage } from './view-products.page';
import { PipesModule } from '../pipes/PipesModule.module';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProductsPageRoutingModule,
    PipesModule,
    DirectivesModule
  ],
  declarations: [ViewProductsPage]
})
export class ViewProductsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProductsDetailsPageRoutingModule } from './view-products-details-routing.module';

import { ViewProductsDetailsPage } from './view-products-details.page';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/PipesModule.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectivesModule,
    PipesModule,
    ViewProductsDetailsPageRoutingModule
  ],
  declarations: [ViewProductsDetailsPage]
})
export class ViewProductsDetailsPageModule {}

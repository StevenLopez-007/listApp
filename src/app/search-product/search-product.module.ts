import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchProductPageRoutingModule } from './search-product-routing.module';

import { SearchProductPage } from './search-product.page';
import { PipesModule } from '../pipes/PipesModule.module';
import { AnimateItemsDirective } from '../directives/animate-items.directive';
import { LongPressDirective } from '../directives/long-press.directive';
import { ShowInputDirective } from '../directives/show-input.directive';
import { NumberInputDirective } from '../directives/number-input.directive';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchProductPageRoutingModule,
    PipesModule,
    DirectivesModule
  ],
  declarations: [SearchProductPage]
})
export class SearchProductPageModule {}

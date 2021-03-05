import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDetailListPageRoutingModule } from './view-detail-list-routing.module';

import { ViewDetailListPage } from './view-detail-list.page';
import { AnimateItemsDirective } from '../directives/animate-items.directive';
import { LongPressDirective } from '../directives/long-press.directive';
import { PipesModule } from '../pipes/PipesModule.module';
import { HeaderAnimate1Directive } from '../directives/header-animate1.directive';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDetailListPageRoutingModule,
    PipesModule
  ],
  declarations: [ViewDetailListPage,AnimateItemsDirective,LongPressDirective,HeaderAnimate1Directive]
})
export class ViewDetailListPageModule {}

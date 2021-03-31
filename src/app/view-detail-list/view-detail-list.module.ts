import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDetailListPageRoutingModule } from './view-detail-list-routing.module';

import { ViewDetailListPage } from './view-detail-list.page';
import { PipesModule } from '../pipes/PipesModule.module';
import { DirectivesModule } from '../directives/directives.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDetailListPageRoutingModule,
    PipesModule,
    DirectivesModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ViewDetailListPage]
})
export class ViewDetailListPageModule {}

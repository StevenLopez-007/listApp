import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCatPageRoutingModule } from './select-cat-routing.module';

import { SelectCatPage } from './select-cat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectCatPageRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [SelectCatPage]
})
export class SelectCatPageModule {}

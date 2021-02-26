import { NgModule } from '@angular/core';
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
  declarations: [SelectCatPage]
})
export class SelectCatPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProductComponent } from './add-product.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,ReactiveFormsModule],
  declarations: [AddProductComponent],
  exports: [AddProductComponent]
})
export class AddProductComponentModule {}

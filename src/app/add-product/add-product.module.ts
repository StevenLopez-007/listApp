import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProductComponent } from './add-product.component';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,ReactiveFormsModule,DirectivesModule],
  declarations: [AddProductComponent],
  exports: [AddProductComponent]
})
export class AddProductComponentModule {}

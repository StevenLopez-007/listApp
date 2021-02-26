import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCategoryComponent } from './add-category.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,ReactiveFormsModule],
  declarations: [AddCategoryComponent],
  exports: [AddCategoryComponent]
})
export class AddCategoryComponentModule {}

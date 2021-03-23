import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCategoryComponent } from './add-category.component';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,ReactiveFormsModule,DirectivesModule],
  declarations: [AddCategoryComponent],
  exports: [AddCategoryComponent]
})
export class AddCategoryComponentModule {}

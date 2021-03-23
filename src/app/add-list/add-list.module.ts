import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AddListComponent } from './add-list.component';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,ReactiveFormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AddListComponent],
  exports: [AddListComponent]
})
export class AddListComponentModule {}

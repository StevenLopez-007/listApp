import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AddListComponent } from './add-list.component';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule,ReactiveFormsModule],
  declarations: [AddListComponent],
  exports: [AddListComponent]
})
export class AddListComponentModule {}

import { AddListComponentModule } from './../add-list/add-list.module';
import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
// import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import {AddCategoryComponentModule} from '../add-category/add-category.module';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import {AddProductComponentModule} from '../add-product/add-product.module';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AddCategoryComponentModule,
    AddProductComponentModule,
    AddListComponentModule,
    Tab2PageRoutingModule,
    DirectivesModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}

import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { AnimateItemsDirective } from '../directives/animate-items.directive';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/PipesModule.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    DirectivesModule,
    PipesModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}

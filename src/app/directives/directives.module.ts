import { NgModule } from '@angular/core';
import { AnimateItemsDirective } from './animate-items.directive';
import { LongPressDirective } from './long-press.directive';
import { NumberInputDirective } from './number-input.directive';
import { ShowInputDirective } from './show-input.directive';
@NgModule({
imports:[],
declarations:[AnimateItemsDirective,LongPressDirective,NumberInputDirective,ShowInputDirective],
exports:[AnimateItemsDirective,LongPressDirective,NumberInputDirective,ShowInputDirective]
})
export class DirectivesModule{}
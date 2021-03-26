import { NgModule } from '@angular/core';
import { AnimateItemsDirective } from './animate-items.directive';
import { LongPressDirective } from './long-press.directive';
import { NumberInputDirective } from './number-input.directive';
import { ShowInputDirective } from './show-input.directive';
import { AnimateSlidesDirective } from './animate-slides.directive';
import { GlobalClickDirective } from './global-click.directive';

@NgModule({
    imports: [],
    declarations: [AnimateItemsDirective, LongPressDirective, NumberInputDirective,
        ShowInputDirective, AnimateSlidesDirective, GlobalClickDirective,
        ],
    exports: [AnimateItemsDirective, LongPressDirective, NumberInputDirective,
        ShowInputDirective, AnimateSlidesDirective, GlobalClickDirective,
        ]
})
export class DirectivesModule { }
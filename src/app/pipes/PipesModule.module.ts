import { NgModule } from "@angular/core";
import { FilterProductsPipe } from './filter-products.pipe';
import { FilterFoundProductsPipe } from './filter-found-products.pipe';
import { SumPricePipe } from './sum-price.pipe';
import { ColorCardsPipe } from './color-cards.pipe';

@NgModule({
    imports:[],
    declarations:[FilterProductsPipe,FilterFoundProductsPipe,SumPricePipe, ColorCardsPipe],
    exports:[FilterProductsPipe,FilterFoundProductsPipe,SumPricePipe,ColorCardsPipe]
})
export class PipesModule{}
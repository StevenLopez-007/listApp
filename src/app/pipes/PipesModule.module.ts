import { NgModule } from "@angular/core";
import { FilterProductsPipe } from './filter-products.pipe';
import { FilterFoundProductsPipe } from './filter-found-products.pipe';
import { SumPricePipe } from './sum-price.pipe';
import { ColorCardsPipe } from './color-cards.pipe';
import { FilterDetailProductsPipe } from './filter-detail-products.pipe';
import { FilterListPipe } from './filter-list.pipe';

@NgModule({
    imports:[],
    declarations:[FilterProductsPipe,FilterFoundProductsPipe,SumPricePipe, ColorCardsPipe, FilterDetailProductsPipe, FilterListPipe],
    exports:[FilterProductsPipe,FilterFoundProductsPipe,SumPricePipe,ColorCardsPipe,FilterDetailProductsPipe,FilterListPipe]
})
export class PipesModule{}
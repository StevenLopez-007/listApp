import { NgModule } from "@angular/core";
import { FilterProductsPipe } from './filter-products.pipe';
import { FilterFoundProductsPipe } from './filter-found-products.pipe';
import { SumPricePipe } from './sum-price.pipe';

@NgModule({
    imports:[],
    declarations:[FilterProductsPipe,FilterFoundProductsPipe,SumPricePipe],
    exports:[FilterProductsPipe,FilterFoundProductsPipe,SumPricePipe]
})
export class PipesModule{}
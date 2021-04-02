import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetailListGuard } from '../guards/detail-list.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'select-cat',
    loadChildren: () => import('./select-cat/select-cat.module').then( m => m.SelectCatPageModule)
  },
  {
    path: 'view-products',
    loadChildren: () => import('./view-products/view-products.module').then( m => m.ViewProductsPageModule)
  },
  {
    path: 'search-product',
    loadChildren: () => import('./search-product/search-product.module').then( m => m.SearchProductPageModule)
  },
  {
    path: 'view-detail-list/:idList',
    canActivate:[DetailListGuard],
    loadChildren: () => import('./view-detail-list/view-detail-list.module').then( m => m.ViewDetailListPageModule)
  },
  {
    path: 'view-products-details',
    loadChildren: () => import('./view-products-details/view-products-details.module').then( m => m.ViewProductsDetailsPageModule)
  },
  {
    path: 'filter-options-lists',
    loadChildren: () => import('./filter-options-lists/filter-options-lists.module').then( m => m.FilterOptionsListsPageModule)
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

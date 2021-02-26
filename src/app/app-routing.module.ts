import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

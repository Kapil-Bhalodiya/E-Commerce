import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { ProductsRoutingModule } from './products-routing.module'

@NgModule({
  imports: [
    ProductsComponent,
    ProductDetailComponent,
    CommonModule,
    ProductsRoutingModule
  ],
  exports: [ProductsComponent, ProductDetailComponent]
})
export class ProductsModule {}

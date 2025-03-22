import { Component, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "./product-card/product-card.component";

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  products = signal<Product[]>([
      {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and travel. A minimalist laptop backpack with a style all its own.",
        "category": "men's clothing",
        "image": "https://img.etimg.com/thumb/msid-88750013,width-300,height-225,imgsize-78670,resizemode-75/fiwbyyxvkaig1mv.jpg",
        "rating": 3.9
      },
      {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts",
        "price": 22.3,
        "description": "Slim fit, lightweight, and comfortable. Suitable for both daily use and casual outings.",
        "category": "men's clothing",
        "image": "https://img.etimg.com/thumb/msid-88750013,width-300,height-225,imgsize-78670,resizemode-75/fiwbyyxvkaig1mv.jpg",
        "rating": 4.1
      },
      {
        "id": 3,
        "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        "price": 695,
        "description": "From our Legends Collection, the Naga was created to be a representation of love and strength. The Naga, a mythical water dragon, is said to have the ability to bring rain and prosperity.",
        "category": "jewelery",
        "image": "https://img.etimg.com/thumb/msid-88750013,width-300,height-225,imgsize-78670,resizemode-75/fiwbyyxvkaig1mv.jpg",
        "rating": 4.6,
      },
      {
        "id": 4,
        "title": "Solid Gold Petite Micropave Apple Pendant Necklace",
        "price": 168,
        "description": "A dainty, yet bold necklace made with 14k solid gold, featuring a small apple pendant with micropave diamonds.",
        "category": "jewelery",
        "image": "https://img.etimg.com/thumb/msid-88750013,width-300,height-225,imgsize-78670,resizemode-75/fiwbyyxvkaig1mv.jpg",
        "rating":  4.7,
      },
      {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts",
        "price": 22.3,
        "description": "Slim fit, lightweight, and comfortable. Suitable for both daily use and casual outings.",
        "category": "men's clothing",
        "image": "https://img.etimg.com/thumb/msid-88750013,width-300,height-225,imgsize-78670,resizemode-75/fiwbyyxvkaig1mv.jpg",
        "rating": 4.1
      },
      {
        "id": 3,
        "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        "price": 695,
        "description": "From our Legends Collection, the Naga was created to be a representation of love and strength. The Naga, a mythical water dragon, is said to have the ability to bring rain and prosperity.",
        "category": "jewelery",
        "image": "https://img.etimg.com/thumb/msid-88750013,width-300,height-225,imgsize-78670,resizemode-75/fiwbyyxvkaig1mv.jpg",
        "rating": 4.6,
      },
      {
        "id": 4,
        "title": "Solid Gold Petite Micropave Apple Pendant Necklace",
        "price": 168,
        "description": "A dainty, yet bold necklace made with 14k solid gold, featuring a small apple pendant with micropave diamonds.",
        "category": "jewelery",
        "image": "https://img.etimg.com/thumb/msid-88750013,width-300,height-225,imgsize-78670,resizemode-75/fiwbyyxvkaig1mv.jpg",
        "rating":  4.7,
      }
  ])
}

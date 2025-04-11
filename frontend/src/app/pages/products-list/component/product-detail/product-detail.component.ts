import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../../compoments/breadcrumb/breadcrumb.component";
import { SocialShareComponent } from "../../../../compoments/social-share/social-share.component";
import { CarouselsComponent } from "../../../../compoments/carousel/carousel.component";
import { CommonModule } from '@angular/common';
import { RatingComponent } from "../../../../compoments/rating/rating.component";
import { RadioVariantComponent } from "../../../../compoments/radio-variant/radio-variant.component";
import { QuantityBoxComponent } from "../../../../compoments/quantity-box/quantity-box.component";
import { PrimaryButtonComponent } from "../../../../compoments/primary-button/primary-button.component";

@Component({
  selector: 'app-product-detail',
  imports: [BreadcrumbComponent,
    SocialShareComponent,
    CarouselsComponent,
    CommonModule,
    RatingComponent,
    RadioVariantComponent,
    QuantityBoxComponent,
    PrimaryButtonComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  productImages = [
    { id: '1', src: 'Men/Tshirt/Whale Shark/Whale Shark - Blue.webp' },
    { id: '2', src: 'Men/Tshirt/Whale Shark/Whale Shark - Blue.webp' }
  ];

  productColors = [
    '#FFB6C1',
    '#F08080',
    '#FFA07A',
    '#FFE4E1',
    '#FFDAB9'];

  productSizes = ['S', 'M', 'L', 'XL']

  selectedSize: string = this.productSizes[0];
  selectedColor: string = this.productColors[0];

  onSizeChange(value: string) {
    this.selectedSize = value;
    console.log('Selected size:', this.selectedSize);
  }

  onColorChange(value: string) {
    this.selectedColor = value;
    console.log('Selected color:', this.selectedColor);
  }
}

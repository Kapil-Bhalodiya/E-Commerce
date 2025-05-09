import { Component, Input, ViewChild } from '@angular/core';
import { CarouselModule, CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-carousel',
  imports: [CommonModule, CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselsComponent {
  @Input() images: any;
  @ViewChild('owlCarousel', { static: false }) owlCarousel?: CarouselComponent;

  productImages = [
    { id: '1', src: 'Men/Tshirt/Whale Shark/Whale Shark - Blue.webp' },
    { id: '3', src: 'Women/TShirt/Tralala/Tralala - black.webp' },
    { id: '4', src: 'Women/TShirt/Tralala/Tralala - blue.webp' },
    { id: '5', src: 'Men/Tshirt/Whale Shark/Whale Shark - Smoke White.webp' }
  ];


  selectedImage: string = '';

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['<<', '>>'],
    center: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    }
  };

  ngOnChanges() {
    if (this.images?.length) {
      this.selectedImage = this.images[0];
    }
  }

  onThumbnailClick(img: string) {
    this.selectedImage = img;
  }

  nextSlide() {
    this.owlCarousel?.next();
  }

  prevSlide() {
    this.owlCarousel?.prev();
  }
}

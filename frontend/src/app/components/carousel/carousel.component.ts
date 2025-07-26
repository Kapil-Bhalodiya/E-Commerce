import { Component, Input, ViewChild } from '@angular/core';
import { CarouselModule, CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

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
  
  imageURL: string = environment.apiUrl;
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

  openImageModal() {
    if (this.selectedImage) {
      const modal = document.createElement('div');
      modal.className = 'image-modal-overlay';
      modal.innerHTML = `
        <div class="image-modal">
          <button class="modal-close">&times;</button>
          <img src="${this.imageURL}/${this.selectedImage}" alt="Zoomed product image">
        </div>
      `;
      
      // Add styles
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        cursor: pointer;
      `;
      
      const modalContent = modal.querySelector('.image-modal') as HTMLElement;
      modalContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        cursor: default;
      `;
      
      const img = modal.querySelector('img') as HTMLElement;
      img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 8px;
      `;
      
      const closeBtn = modal.querySelector('.modal-close') as HTMLElement;
      closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      
      // Close modal events
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });
      
      closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
      });
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (document.body.contains(modal)) {
            document.body.removeChild(modal);
          }
        }
      });
      
      document.body.appendChild(modal);
    }
  }

  nextSlide() {
    this.owlCarousel?.next();
  }

  prevSlide() {
    this.owlCarousel?.prev();
  }
}

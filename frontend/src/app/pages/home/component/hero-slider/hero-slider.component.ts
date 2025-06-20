import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselsComponent } from '../../../../compoments/carousel/carousel.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [RouterModule, CarouselsComponent],
  templateUrl: './hero-slider.component.html'
})
export class HeroSliderComponent implements OnInit {
  @Input() slides: {
    image: string;
    offer: string;
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
  }[] = [];

  slideImages: string[] = [];
  currentSlide: any = null;
  imageURL: string = environment.apiUrl;

  ngOnInit(): void {
    this.slideImages = this.slides.map(slide => slide.image);
    this.currentSlide = this.slides[0] || null;
  }

  onSlideChange(image: string): void {
    const index = this.slideImages.indexOf(image);
    this.currentSlide = this.slides[index] || null;
  }
}
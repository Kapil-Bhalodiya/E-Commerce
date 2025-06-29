import { Component, Input, OnInit } from '@angular/core';
import { CarouselsComponent } from '../../../../components/carousel/carousel.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CarouselsComponent],
  templateUrl: './testimonial.component.html'
})
export class TestimonialComponent implements OnInit {
  @Input() testimonials: {
    image: string;
    name: string;
    title: string;
    quote: string;
  }[] = [];

  testimonialImages: string[] = [];
  currentTestimonial: any = null;
  imageURL: string = environment.apiUrl;

  ngOnInit(): void {
    this.testimonialImages = this.testimonials.map(testimonial => testimonial.image);
    this.currentTestimonial = this.testimonials[0] || null;
  }

  onSlideChange(image: string): void {
    const index = this.testimonialImages.indexOf(image);
    this.currentTestimonial = this.testimonials[index] || null;
  }
}

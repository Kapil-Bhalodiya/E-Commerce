import { Component, Input, OnInit } from '@angular/core';
import { CarouselsComponent } from '../../../../components/carousel/carousel.component';
import { environment } from '../../../../../environments/environment';
import { Testimonial } from '../../../../shared/interfaces/home.interface';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CarouselsComponent],
  templateUrl: './testimonial.component.html'
})
export class TestimonialComponent implements OnInit {
  @Input() testimonials: Testimonial[] = [];

  testimonialImages: string[] = [];
  currentTestimonial: Testimonial | null = null;
  readonly imageURL = environment.apiUrl;

  ngOnInit(): void {
    this.testimonialImages = this.testimonials.map(t => t.image);
    this.currentTestimonial = this.testimonials[0] || null;
  }

  onSlideChange(image: string): void {
    const index = this.testimonialImages.indexOf(image);
    this.currentTestimonial = this.testimonials[index] || null;
  }
}

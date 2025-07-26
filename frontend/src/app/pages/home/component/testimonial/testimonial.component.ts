import { Component, Input, OnInit } from '@angular/core';
<<<<<<< HEAD
import { CarouselsComponent } from '../../../../compoments/carousel/carousel.component';
import { environment } from '../../../../../environments/environment';
=======
import { CarouselsComponent } from '../../../../components/carousel/carousel.component';
import { environment } from '../../../../../environments/environment';
import { Testimonial } from '../../../../shared/interfaces/home.interface';
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CarouselsComponent],
  templateUrl: './testimonial.component.html'
})
export class TestimonialComponent implements OnInit {
<<<<<<< HEAD
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
=======
  @Input() testimonials: Testimonial[] = [];

  testimonialImages: string[] = [];
  currentTestimonial: Testimonial | null = null;
  readonly imageURL = environment.apiUrl;

  ngOnInit(): void {
    this.testimonialImages = this.testimonials.map(t => t.image);
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
    this.currentTestimonial = this.testimonials[0] || null;
  }

  onSlideChange(image: string): void {
    const index = this.testimonialImages.indexOf(image);
    this.currentTestimonial = this.testimonials[index] || null;
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2

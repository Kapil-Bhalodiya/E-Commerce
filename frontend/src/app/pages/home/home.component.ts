import { Component } from '@angular/core';
import { BannerSectionComponent } from './component/banner-section/banner-section.component';
import { ShopCardsComponent } from './component/shop-cards/shop-cards.component';
import { TestimonialComponent } from './component/testimonial/testimonial.component';
import { ContactSectionComponent } from './component/contact-section/contact-section.component';
import { HOME_DATA } from '../../shared/data/home.data';
import { Banner, ContentSection, Testimonial } from '../../shared/interfaces/home.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerSectionComponent,
    ShopCardsComponent,
    TestimonialComponent,
    ContactSectionComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  readonly categoryBanners: Banner[] = HOME_DATA.categoryBanners;
  readonly discountBanners: Banner[] = HOME_DATA.discountBanners;
  readonly discountContent: ContentSection = HOME_DATA.discountContent;
  readonly shopCardContent: ContentSection = HOME_DATA.shopCardContent;
  readonly shopCardBanners: Banner[] = HOME_DATA.shopCardBanners;
  readonly testimonials: Testimonial[] = HOME_DATA.testimonials;
}

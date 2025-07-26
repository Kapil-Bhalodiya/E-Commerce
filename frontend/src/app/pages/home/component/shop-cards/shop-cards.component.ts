import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
=======
import { Banner, ContentSection } from '../../../../shared/interfaces/home.interface';
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2

@Component({
  selector: 'app-shop-cards',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './shop-cards.component.html',
  styleUrls: ['./shop-cards.component.scss']
})
export class ShopCardsComponent {
<<<<<<< HEAD
  @Input() content?: {
    subtitle: string;
    title: string;
    description: string;
    cta: string;
    ctaLink: string;
  };
  @Input() banners: { image: string; link: string; alt: string }[] = [];
  @Input() videoUrl: string = '';
  imageURL: string = environment.apiUrl;
=======
  @Input() content?: ContentSection;
  @Input() banners: Banner[] = [];
  @Input() videoUrl = 'https://vimeo.com/115041822';
  readonly imageURL = environment.apiUrl;
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
}
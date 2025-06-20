import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-cards',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './shop-cards.component.html',
  styleUrls: ['./shop-cards.component.scss']
})
export class ShopCardsComponent {
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
}
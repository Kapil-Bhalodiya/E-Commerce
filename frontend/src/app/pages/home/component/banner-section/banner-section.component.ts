import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner-section',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './banner-section.component.html',
  styleUrls: ['./banner-section.component.scss'],
})
export class BannerSectionComponent {
  @Input() type: 'categories' | 'discount' = 'categories';
  @Input() banners: {
    image: string;
    title?: string;
    link: string;
    alt: string;
    maxHeight?: boolean;
    position?: string;
  }[] = [];
  @Input() discountContent?: {
    subtitle: string;
    title: string;
    cta: string;
    ctaLink: string;
  };
  imageURL: string = environment.apiUrl;
}
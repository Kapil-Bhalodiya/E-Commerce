import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Banner, ContentSection } from '../../../../shared/interfaces/home.interface';

@Component({
  selector: 'app-banner-section',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './banner-section.component.html',
  styleUrls: ['./banner-section.component.scss'],
})
export class BannerSectionComponent {
  @Input() type: 'categories' | 'discount' = 'categories';
  @Input() banners: Banner[] = [];
  @Input() discountContent?: ContentSection;
  readonly imageURL = environment.apiUrl;
}
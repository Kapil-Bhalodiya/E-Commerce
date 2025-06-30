import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Banner, ContentSection } from '../../../../shared/interfaces/home.interface';

@Component({
  selector: 'app-shop-cards',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './shop-cards.component.html',
  styleUrls: ['./shop-cards.component.scss']
})
export class ShopCardsComponent {
  @Input() content?: ContentSection;
  @Input() banners: Banner[] = [];
  @Input() videoUrl = 'https://vimeo.com/115041822';
  readonly imageURL = environment.apiUrl;
}
import { Component, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-logos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-logos.component.html'
})
export class BrandLogosComponent {
  @Input() logos: { src: string; alt: string }[] = [];
  imageURL: string = environment.apiUrl;
}
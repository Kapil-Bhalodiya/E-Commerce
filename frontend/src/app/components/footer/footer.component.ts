import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer-section',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterSectionComponent {
  currentYear: number = new Date().getFullYear();
  newsletterEmail: string = '';
  widgets: { [key: string]: boolean } = {
    about: true,
    account: true,
    categories: true,
    instagram: true,
    newsletter: true
  };

  toggleWidget(widget: string) {
    this.widgets[widget] = !this.widgets[widget];
  }

  onNewsletterSubmit() {
    if (this.newsletterEmail) {
      console.log('Newsletter subscription:', this.newsletterEmail);
      this.newsletterEmail = '';
    }
  }
}
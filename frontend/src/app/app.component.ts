import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { HeaderComponent } from './compoments/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterSectionComponent } from "./compoments/footer/footer.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule, HeaderComponent, CommonModule, FooterSectionComponent]
})
export class AppComponent {
}

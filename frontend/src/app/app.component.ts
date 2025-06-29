import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterSectionComponent } from "./components/footer/footer.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule, HeaderComponent, CommonModule, FooterSectionComponent]
})
export class AppComponent {
}

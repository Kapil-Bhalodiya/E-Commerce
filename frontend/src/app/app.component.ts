import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
<<<<<<< HEAD
import { HeaderComponent } from './compoments/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterSectionComponent } from "./compoments/footer/footer.component";
=======
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterSectionComponent } from "./components/footer/footer.component";
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule, HeaderComponent, CommonModule, FooterSectionComponent]
})
export class AppComponent {
}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { HeaderComponent } from './compoments/header/header.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule, HeaderComponent, CommonModule]
})
export class AppComponent {
}

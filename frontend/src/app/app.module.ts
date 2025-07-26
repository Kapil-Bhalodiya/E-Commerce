import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routes'; 
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { ComponentModule } from './compoments/component.module';
=======
import { ComponentModule } from './components/component.module';
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppComponent,
        CommonModule,
        ComponentModule,
        AppRoutingModule
    ]
  })
  export class AppModule { }

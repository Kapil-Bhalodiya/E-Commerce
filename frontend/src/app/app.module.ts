import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routes'; 
import { CommonModule } from '@angular/common';
import { ComponentModule } from './components/component.module';
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

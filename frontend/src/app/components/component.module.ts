import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PrimaryButtonComponent,
        HeaderComponent,
        CarouselModule
    ],
    exports: [
        PrimaryButtonComponent,
        HeaderComponent,
    ]
})
export class ComponentModule { }

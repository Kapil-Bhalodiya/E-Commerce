// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { HeaderComponent } from './header/header.component';
// import { PrimaryButtonComponent } from "./primary-button/primary-button.component";

// @NgModule({
//     declarations: [
//     ],
//     imports: [
//         CommonModule,
//         RouterModule,
//         HeaderComponent,
//         PrimaryButtonComponent,
//     ],
//     exports: [
//         HeaderComponent,
//         PrimaryButtonComponent
//     ],
// })
// export class ComponentModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

@NgModule({
    imports: [
        BrowserAnimationsModule,
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

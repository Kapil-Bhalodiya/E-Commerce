import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  imports: [RouterModule, CommonModule]
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Array<{ label: string, url: string }> = [];


  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.breadcrumbs = [
      { label: 'Home', url: '/' },
      { label: 'Products', url: '/products' },
      { label: 'Product List', url: '/products/list' },
    ];

  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.getBreadcrumbs(this.activatedRoute.root);
    });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ label: string, url: string }> = []): Array<{ label: string, url: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    children.forEach(child => {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        const breadcrumbLabel = child.snapshot.data['breadcrumb'] || routeURL;
        const breadcrumb = {
          label: breadcrumbLabel,
          url: url + '/' + routeURL
        };
        this.getBreadcrumbs(child, url + '/' + routeURL, [...breadcrumbs, breadcrumb]);
      }
    });

    return breadcrumbs;
  }
}

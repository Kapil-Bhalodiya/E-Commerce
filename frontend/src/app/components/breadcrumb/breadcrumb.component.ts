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
      { label: 'Product', url: '/product' },
      { label: 'Product Detail', url: '/product/product-detail' },
    ];
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.getBreadcrumbs(this.activatedRoute.root);
    });
  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<{ label: string, url: string }> = []
  ): Array<{ label: string, url: string }> {
    breadcrumbs = [{ label: 'Home', url: '/' }];
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        const breadcrumbLabel = child.snapshot.data['breadcrumb'] || this.capitalize(routeURL);
        const breadcrumb = {
          label: breadcrumbLabel,
          url: `${url}/${routeURL}`
        };
        breadcrumbs.push(breadcrumb);
        // Only recurse if this child has active children
        if (child.children.length > 0) {
          return this.getBreadcrumbs(child, `${url}/${routeURL}`, breadcrumbs);
        }
      }
      return breadcrumbs;
    }

    return breadcrumbs;
  }

  private capitalize(str: string): string {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
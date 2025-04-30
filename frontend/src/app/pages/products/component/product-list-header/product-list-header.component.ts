import { Component } from '@angular/core';
import { SearchBoxComponent } from "../../../../compoments/search-box/search-box.component";
import { DropdownFilterComponent } from "../../../../compoments/filter/dropdown-filter/dropdown-filter.component";

@Component({
  selector: 'app-product-list-header',
  imports: [SearchBoxComponent, DropdownFilterComponent],
  templateUrl: './product-list-header.component.html',
  styleUrl: './product-list-header.component.scss'
})

export class ProductListHeaderComponent {

  dropDownSort = [] = [
    {
      label: 'Sort by Latest',
      id: 'latest-sort',
    },
    {
      label: 'Sort by Rating',
      id: 'rating-sort',
    },
    {
      label: 'Alphabetical Assending',
      id: 'asc-sort',
    },
    {
      label: 'Alphabetical Descending',
      id: 'desc-sort',
    },
  ];

  dropPageSort = [] = [
    {
      label: '10',
      id: '10',
    },
    {
      label: '20',
      id: '20',
    },
    {
      label: '30',
      id: '30',
    },
    {
      label: '40',
      id: '40',
    },
  ];

  onSearch($event: string) {

  }
}

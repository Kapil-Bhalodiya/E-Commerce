import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchBoxComponent } from "../../../../components/search-box/search-box.component";
import { DropdownFilterComponent } from "../../../../components/filter/dropdown-filter/dropdown-filter.component";
import { PRODUCT_DATA } from '../../../../shared/data/product.data';

@Component({
  selector: 'app-product-list-header',
  imports: [SearchBoxComponent, DropdownFilterComponent],
  templateUrl: './product-list-header.component.html',
  styleUrl: './product-list-header.component.scss'
})
export class ProductListHeaderComponent {
  @Input() currentPage = 1;
  @Input() pageSize = 8;
  @Input() totalCount = 0;
  @Output() search = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() pageSizeChange = new EventEmitter<number>();

  readonly dropDownSort = PRODUCT_DATA.sortOptions;
  readonly dropPageSort = PRODUCT_DATA.pageSizeOptions;

  onSearch(searchTerm: string): void {
    this.search.emit(searchTerm);
  }

  onSortChange(sortValue: string): void {
    this.sortChange.emit(sortValue);
  }

  onPageSizeChange(pageSize: string): void {
    this.pageSizeChange.emit(parseInt(pageSize, 10));
  }

  getShowingText(): string {
    if (this.totalCount === 0) return '0 results';
    
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.totalCount);
    
    return `${start}–${end} of ${this.totalCount} results`;
  }
}

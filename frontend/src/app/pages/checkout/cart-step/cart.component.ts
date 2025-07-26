import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../../components/table/table.component";
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormStepComponent } from '../../../components/stepper/models/form-step-cponent.model';
import { CartItem } from '../../../models/cartItem.model';

@Component({
  selector: 'app-cart',
  imports: [TableComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartStepComponent implements FormStepComponent, OnInit{
  cartItems: CartItem[] = [];
  tableColumns = ['Product', 'Price', 'Quantity', 'Total'];
  tableData: any[] = [];
  formGroup!: FormGroup;
  globalFormGroup!: FormGroup<any>;
  
  constructor(
    public cartService: CartService,
    private router: Router
  ) {}
  
  data: any;

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.prepareTableData();
    });
  }
  
  continueShopping() {
    this.router.navigate(['/'])
  }
  
  prepareTableData() {
    this.tableData = this.cartItems.map(item => ({
      product: item,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity
    }));
  }

<<<<<<< HEAD
=======
  updateQuantity(event: {productId: string, quantity: number}) {
    this.cartService.updateQuantity(event.productId, event.quantity);
  }

>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }
}

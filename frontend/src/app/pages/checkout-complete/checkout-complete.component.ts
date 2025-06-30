import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout-complete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-complete.component.html',
  styleUrls: ['./checkout-complete.component.scss']
})
export class CheckoutCompleteComponent implements OnInit {
  orderDetails = {
    orderNumber: '#ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    orderDate: new Date(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    total: 0,
    items: [] as any[],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    paymentMethod: 'Credit Card ending in ****1234'
  };

  trackingSteps = [
    {
      title: 'Order Confirmed',
      description: 'Your order has been placed successfully',
      icon: 'bi-check-circle-fill',
      completed: true,
      active: false
    },
    {
      title: 'Processing',
      description: 'We are preparing your items',
      icon: 'bi-gear-fill',
      completed: false,
      active: true
    },
    {
      title: 'Shipped',
      description: 'Your order is on the way',
      icon: 'bi-truck',
      completed: false,
      active: false
    },
    {
      title: 'Delivered',
      description: 'Package delivered to your address',
      icon: 'bi-house-fill',
      completed: false,
      active: false
    }
  ];

  recommendations = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      image: 'https://via.placeholder.com/150x150/007bff/ffffff?text=HP',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://via.placeholder.com/150x150/28a745/ffffff?text=SW',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Phone Case',
      price: 24.99,
      image: 'https://via.placeholder.com/150x150/ffc107/ffffff?text=PC',
      rating: 4.2
    }
  ];

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadOrderDetails();
    this.clearCart();
  }

  loadOrderDetails(): void {
    // Load order details from localStorage or service
    const orderData = localStorage.getItem('orderForm');
    if (orderData) {
      const order = JSON.parse(orderData);
      this.orderDetails.items = order.cartForm?.items || [];
      this.orderDetails.total = this.calculateTotal();
    }
  }

  calculateTotal(): number {
    return this.orderDetails.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  clearCart(): void {
    // Clear cart after successful order
    this.cartService.clearCart();
    localStorage.removeItem('orderForm');
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  viewOrderDetails(): void {
    this.router.navigate(['/orders', this.orderDetails.orderNumber]);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  downloadInvoice(): void {
    // Generate and download invoice
    const invoiceData = {
      orderNumber: this.orderDetails.orderNumber,
      date: this.orderDetails.orderDate,
      items: this.orderDetails.items,
      total: this.orderDetails.total
    };
    
    // Create downloadable content
    const dataStr = JSON.stringify(invoiceData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `invoice-${this.orderDetails.orderNumber}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  shareOrder(): void {
    if (navigator.share) {
      navigator.share({
        title: 'My Order Confirmation',
        text: `I just placed order ${this.orderDetails.orderNumber}!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Order link copied to clipboard!');
    }
  }

  addToCart(product: any): void {
    this.cartService.addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
    alert(`${product.name} added to cart!`);
  }
}
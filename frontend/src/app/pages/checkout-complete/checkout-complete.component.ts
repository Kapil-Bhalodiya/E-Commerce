import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-checkout-complete',
  imports: [CommonModule],
  templateUrl: './checkout-complete.component.html',
  styleUrls: ['./checkout-complete.component.scss']
})
export class CheckoutCompleteComponent implements OnInit {
  orderDetails: any = null;
  imageURL: string = environment.apiUrl; // Replace with actual CDN/base URL
  trackingSteps = [
    {
      title: 'Order Placed',
      description: 'We have received your order.',
      icon: 'bi-cart-check',
      completed: true,
      active: false
    },
    {
      title: 'Processing',
      description: 'Your order is being prepared.',
      icon: 'bi-gear',
      completed: false,
      active: true
    },
    {
      title: 'Shipped',
      description: 'Your order is on the way.',
      icon: 'bi-truck',
      completed: false,
      active: false
    },
    {
      title: 'Delivered',
      description: 'Order delivered to your address.',
      icon: 'bi-box',
      completed: false,
      active: false
    }
  ];

  recommendations = [
    {
      name: 'Bluetooth Headphones',
      image: 'https://via.placeholder.com/150',
      rating: 4,
      price: 49.99
    },
    {
      name: 'Smart Watch',
      image: 'https://via.placeholder.com/150',
      rating: 5,
      price: 99.99
    },
    {
      name: 'Wireless Mouse',
      image: 'https://via.placeholder.com/150',
      rating: 3,
      price: 19.99
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const orderData = localStorage.getItem('orderFormRes');
    if (orderData) {
      try {
        const parsed = JSON.parse(orderData);
        this.orderDetails = parsed.order || parsed;
        this.orderDetails = this.orderDetails.data.order
      } catch (error) {
        console.error('Error parsing orderFormRes:', error);
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  downloadInvoice(): void {
    // Generate and download invoice
    const invoiceData = {
      orderNumber: this.orderDetails._id,
      date: this.orderDetails.createdAt,
      items: this.orderDetails.orderItems,
      total: this.orderDetails.totalAmount
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

  viewOrderDetails(): void {
    this.router.navigate(['/account/orders', this.orderDetails?.orderNumber || '']);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  continueShopping(): void {
    this.router.navigate(['/product']);
  }

  addToCart(product: any): void {
    // Add product to cart logic
    alert(`Added "${product.name}" to cart.`);
  }
}

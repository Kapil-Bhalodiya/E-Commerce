<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout-complete',
  standalone: true,
=======
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-checkout-complete',
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  imports: [CommonModule],
  templateUrl: './checkout-complete.component.html',
  styleUrls: ['./checkout-complete.component.scss']
})
export class CheckoutCompleteComponent implements OnInit {
<<<<<<< HEAD
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
=======
  orderDetails: any = null;
  imageURL: string = environment.apiUrl; // Replace with actual CDN/base URL
  trackingSteps = [
    {
      title: 'Order Placed',
      description: 'We have received your order.',
      icon: 'bi-cart-check',
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
      completed: true,
      active: false
    },
    {
      title: 'Processing',
<<<<<<< HEAD
      description: 'We are preparing your items',
      icon: 'bi-gear-fill',
=======
      description: 'Your order is being prepared.',
      icon: 'bi-gear',
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
      completed: false,
      active: true
    },
    {
      title: 'Shipped',
<<<<<<< HEAD
      description: 'Your order is on the way',
=======
      description: 'Your order is on the way.',
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
      icon: 'bi-truck',
      completed: false,
      active: false
    },
    {
      title: 'Delivered',
<<<<<<< HEAD
      description: 'Package delivered to your address',
      icon: 'bi-house-fill',
=======
      description: 'Order delivered to your address.',
      icon: 'bi-box',
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
      completed: false,
      active: false
    }
  ];

  recommendations = [
    {
<<<<<<< HEAD
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
=======
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
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2

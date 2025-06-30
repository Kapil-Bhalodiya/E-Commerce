import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/100x100/007bff/ffffff?text=JD'
  };

  stats = {
    totalOrders: 12,
    pendingOrders: 3,
    completedOrders: 9,
    totalSpent: 1250.00,
    cartItems: 0,
    wishlistItems: 5
  };

  recentOrders = [
    {
      id: '#ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 299.99,
      items: 3
    },
    {
      id: '#ORD-002',
      date: '2024-01-10',
      status: 'Processing',
      total: 149.50,
      items: 2
    },
    {
      id: '#ORD-003',
      date: '2024-01-05',
      status: 'Shipped',
      total: 89.99,
      items: 1
    }
  ];

  quickActions = [
    {
      title: 'Browse Products',
      description: 'Explore our latest collection',
      icon: 'bi-shop',
      route: '/products',
      color: 'primary'
    },
    {
      title: 'View Cart',
      description: 'Review items in your cart',
      icon: 'bi-cart3',
      route: '/cart',
      color: 'success'
    },
    {
      title: 'Order History',
      description: 'Track your past orders',
      icon: 'bi-clock-history',
      route: '/orders',
      color: 'info'
    },
    {
      title: 'Wishlist',
      description: 'Items you want to buy later',
      icon: 'bi-heart',
      route: '/wishlist',
      color: 'danger'
    },
    {
      title: 'Profile Settings',
      description: 'Update your account details',
      icon: 'bi-person-gear',
      route: '/profile',
      color: 'warning'
    },
    {
      title: 'Address Book',
      description: 'Manage delivery addresses',
      icon: 'bi-geo-alt',
      route: '/addresses',
      color: 'secondary'
    }
  ];

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadStats();
  }

  loadUserData(): void {
    // Load user data from service/localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = { ...this.user, ...JSON.parse(userData) };
    }
  }

  loadStats(): void {
    // Load cart items count
    this.stats.cartItems = this.cartService.getCartItems().length;
    
    // Load other stats from services
    // This would typically come from API calls
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'delivered': return 'status-delivered';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
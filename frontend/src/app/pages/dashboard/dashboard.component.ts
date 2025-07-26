import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
<<<<<<< HEAD
=======
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user = {
<<<<<<< HEAD
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

=======
    name: '',
    email: '',
    avatar: '' // this will hold the initials image
  };

  // Example stats — you can fetch these from APIs later
  stats = {
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalSpent: 0,
    cartItems: 0,
    wishlistItems: 0
  };

  // Other properties
  recentOrders = [
    {
      id: '#ORD-1001',
      date: '2025-07-21',
      status: 'Delivered',
      total: 1599.49,
      items: 4
    },
    {
      id: '#ORD-1002',
      date: '2025-07-15',
      status: 'Processing',
      total: 899.99,
      items: 2
    },
    {
      id: '#ORD-1003',
      date: '2025-07-10',
      status: 'Shipped',
      total: 1249.00,
      items: 3
    }
  ];
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  quickActions = [
    {
      title: 'Browse Products',
      description: 'Explore our latest collection',
      icon: 'bi-shop',
<<<<<<< HEAD
      route: '/products',
=======
      route: '/product',
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
      color: 'primary'
    },
    {
      title: 'View Cart',
      description: 'Review items in your cart',
      icon: 'bi-cart3',
<<<<<<< HEAD
      route: '/cart',
=======
      route: '/checkout',
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
      color: 'success'
    },
    {
      title: 'Order History',
      description: 'Track your past orders',
      icon: 'bi-clock-history',
<<<<<<< HEAD
      route: '/orders',
=======
      route: '/checkout-complete',
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
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
<<<<<<< HEAD
    private cartService: CartService
=======
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadStats();
<<<<<<< HEAD
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
=======
    this.loadRecentOrders();
  }

  loadUserData(): void {
  const userData = localStorage.getItem('user_data');
  if (userData) {
    const parsedUser = JSON.parse(userData);
    const initials = this.getInitials(parsedUser.fullName);
    this.user = {
      name: parsedUser.fullName,
      email: parsedUser.email,
      avatar: this.generateInitialsAvatar(initials)
    };
  }
}

getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .map(n => n[0].toUpperCase())
    .join('');
}

generateInitialsAvatar(initials: string): string {
  return `https://ui-avatars.com/api/?name=${initials}&background=007bff&color=fff&size=100&font-size=0.5`;
}


  loadStats(): void {
    this.stats.cartItems = this.cartService.getCartItems().length;
    // You can fetch other stats via API if needed
  }

  loadRecentOrders(): void {
    this.orderService.getAllOrders(1, 5).subscribe({
      next: (res) => {
        if (res && res.success && res.data && res.data.orders) {
          this.recentOrders = res.data.orders.map((order: any) => ({
            id: order.id,
            date: order.date,
            status: order.status,
            total: order.total,
            items: order.items
          }));
          this.stats.totalOrders = res.data.totalOrders;
          // Optionally, calculate pending/completed orders from the fetched orders
          this.stats.pendingOrders = this.recentOrders.filter((o: any) => o.status === 'pending').length;
          this.stats.completedOrders = this.recentOrders.filter((o: any) => o.status === 'delivered').length;
          this.stats.totalSpent = this.recentOrders.reduce((acc: number, curr: any) => acc + curr.total, 0);
        }
      },
      error: (err) => {
        // Optionally handle error
        console.error('Failed to fetch recent orders', err);
      }
    });
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
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
<<<<<<< HEAD
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
=======
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      }
    });
  }
}

>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2

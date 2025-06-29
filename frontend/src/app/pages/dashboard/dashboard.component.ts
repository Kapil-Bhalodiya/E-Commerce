import { Component, OnDestroy, OnInit } from '@angular/core';
// import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
// import { ChartComponent } from './chart/chart.component';
import { TableComponent } from '../../components/table/table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  kpis: any = {};
  columns = ['Order','Date' ,'Payment Status', 'Fulfillment Status' ,'Total']
  isUser = false;
  isAdmin = false;
  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private dashboardService: DashboardService, 
    private authService: AuthService
  ) {}

  ngOnInit() {
    // this.authService.isAuthenticated().subscribe((user) => {
    //   this.isAdmin = user?.role === 'admin';
    // });

    this.subscriptions.add(
      this.dashboardService.getKPIs().subscribe((data) => {
        this.kpis = data;
      })
    );

    this.subscriptions.add(
      this.dashboardService.getKPIs().subscribe((data) => {
        this.kpis = { ...this.kpis, ...data };
      })
    );
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

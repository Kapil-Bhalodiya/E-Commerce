import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container" *ngIf="show">
      <div class="toast" [ngClass]="type">
        <i class="bi" [ngClass]="getIcon()"></i>
        <span>{{ message }}</span>
        <button class="toast-close" (click)="close()">×</button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
    }
    .toast {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: large;
      padding: 12px 16px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      min-width: 300px;
      animation: slideIn 0.3s ease;
    }
    .toast.success { background: #28a745; }
    .toast.error { background: #dc3545; }
    .toast.warning { background: #ffc107; color: #000; }
    .toast-close {
      background: none;
      border: none;
      color: inherit;
      font-size: 18px;
      cursor: pointer;
      margin-left: auto;
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'warning' = 'success';
  @Input() show = false;

  getIcon(): string {
    switch (this.type) {
      case 'success': return 'bi-check-circle';
      case 'error': return 'bi-x-circle';
      case 'warning': return 'bi-exclamation-triangle';
      default: return 'bi-info-circle';
    }
  }

  close() {
    this.show = false;
  }
}
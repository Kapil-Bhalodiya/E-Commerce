export interface Payment {
    method: 'credit_card' | 'paypal' | 'stripe' | 'cod';
}
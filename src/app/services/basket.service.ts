import { Injectable } from '@angular/core';

export interface LineOrder {
  product: Product;
  qty: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  add(product: Product, qty: number) {
    let lineOrders = this.loadLineOrders();
    lineOrders.push({
      product: product,
      qty: qty,
      price: product.price
    });
    window.localStorage.basket = JSON.stringify(lineOrders);
  }

  update(id: string, qty: number) {
    let lineOrders = this.loadLineOrders();
    lineOrders.filter(x => x.product.id === id).forEach(x => x.qty = qty);
  }

  remove(id: string) {
    let lineOrders = this.loadLineOrders();
    let index = lineOrders.findIndex(x => x.product.id === id);
    lineOrders.splice(index, 1);
  }

  lineOrders(): LineOrder[] {
    let lineOrders = this.loadLineOrders();
    return lineOrders.map(x => {
      return {
        product: x.product,
        qty: x.qty,
        price: x.price
      }
    });
  }

  total() {
    let total = 0;
    let lineOrders = this.loadLineOrders();
    lineOrders.forEach(x => total += x.price);
    return total;
  }

  private loadLineOrders(): LineOrder[] {
    return JSON.parse(window.localStorage.basket || '[]');
  }
}

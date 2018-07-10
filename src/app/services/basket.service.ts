import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export type ChangedEventListener = () => void;

export interface LineOrder {
  product: Product;
  qty: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private listeners: ChangedEventListener[] = [];

  constructor() {
  }

  addListener(listener: ChangedEventListener) {
    this.listeners.push(listener);
  }

  removeListener(listener: ChangedEventListener) {
    let index = this.listeners.findIndex(x => x == listener);
    this.listeners.splice(index, 1);
  }

  add(product: Product, qty: number) {
    let lineOrders = this.loadLineOrders();
    let lineOrder = lineOrders.find(x => x.product.id == product.id);
    if (lineOrder != null) {
      lineOrder.qty += qty;
    } else {
      lineOrders.push({
        product: product,
        qty: qty,
        price: product.price
      });
    }
    window.localStorage.basket = JSON.stringify(lineOrders);

    this.fireChangedEventListener();
  }

  update(lineOrder: LineOrder, qty: number) {
    let lineOrders = this.loadLineOrders();
    lineOrders = lineOrders.filter(x => x.product.id === lineOrder.product.id).map(x => { x.qty = qty; return x; })
    window.localStorage.basket = JSON.stringify(lineOrders);

    this.fireChangedEventListener();
  }

  remove(lineOrder: LineOrder) {
    let lineOrders = this.loadLineOrders();
    let index = lineOrders.findIndex(x => x.product.id === lineOrder.product.id);
    lineOrders.splice(index, 1);
    window.localStorage.basket = JSON.stringify(lineOrders);

    this.fireChangedEventListener();
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

  total(): number {
    let lineOrders = this.loadLineOrders();
    let results = 0;
    lineOrders.forEach(x => results += x.price * x.qty);
    return results;
  }

  private loadLineOrders(): LineOrder[] {
    return JSON.parse(window.localStorage.basket || '[]');
  }

  private fireChangedEventListener() {
    this.listeners.forEach(x => x());
  }
}

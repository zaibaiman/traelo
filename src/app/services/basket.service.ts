import { Injectable } from '@angular/core';

interface LineOrder {
  product: Product;
  qty: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private lineOrders: LineOrder[] = [];

  add(product: Product, qty: number) {

  }

  update(id: string, qty: number) {
    this.lineOrders.filter(x => x.product.id === id).forEach(x => x.qty = qty);
  }

  remove(id: string) {
    let index = this.lineOrders.findIndex(x => x.product.id === id);
    this.lineOrders.splice(index, 1);
  }

  getLineOrders() {
    this.lineOrders.map(x => {
      return {
        product: x.product,
        qty: x.qty,
        price: x.price
      }
    });
  }

  total() {
    let total = 0;
    this.lineOrders.forEach(x => total += x.price);
    return total;
  }
}

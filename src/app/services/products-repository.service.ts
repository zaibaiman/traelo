import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsRepositoryService {
  constructor() { }

  search(query: string): Product[] {
    let products: Product[] = [
      {
        id: '1',
        name: 'Sabritas',
        description: 'Papas Sabritas',
        price: 10,
        imageUrl: null
      },
      {
        id: '2',
        name: 'Coca-Cola',
        description: 'Refresco Coca-Cola',
        price: 15,
        imageUrl: null
      }
    ];
    return products;
  }
}

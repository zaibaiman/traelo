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
        name: 'Papas sabritas adobadas 140g',
        description: 'Papas Sabritas',
        price: 10,
        imageUrl: 'https://super.walmart.com.mx/images/product-images/img_medium/00750101113112m.jpg'
      },
      {
        id: '2',
        name: 'Refresco coca cola de vidrio 235ml',
        description: 'Refresco Coca-Cola',
        price: 15,
        imageUrl: 'https://super.walmart.com.mx/images/product-images/img_medium/00750105535625m.jpg'
      }
    ];
    return products;
  }
}

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
      },
      {
        id: '3',
        name: 'Leche alpura deslactosada light 1l',
        description: 'Leche alpura',
        price: 19,
        imageUrl: 'https://super.walmart.com.mx/images/product-images/img_medium/00750105590414m.jpg'
      },
      {
        id: '4',
        name: 'Margarina sin sal la villita untable 190gr',
        description: 'Leche alpura',
        price: 21,
        imageUrl: 'https://super.walmart.com.mx/images/product-images/img_medium/00750104008225m.jpg'
      },
      {
        id: '5',
        name: 'Máscara para pestañas maybelline',
        description: 'Pestañas',
        price: 189,
        imageUrl: 'https://super.walmart.com.mx/images/product-images/img_medium/00000003007457m.jpg'
      },
      {
        id: '6',
        name: 'Shampoo ogx eucalyptus 385ml',
        description: 'Pestañas',
        price: 132,
        imageUrl: 'https://super.walmart.com.mx/images/product-images/img_medium/00002279690060m.jpg'
      },
      {
        id: '7',
        name: 'Queso crema philadelphia original',
        description: 'Pestañas',
        price: 28,
        imageUrl: 'https://super.walmart.com.mx/images/product-images/img_medium/00750100261512m.jpg'
      }
    ];
    return products;
  }
}

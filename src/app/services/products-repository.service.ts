import { Injectable } from '@angular/core';

declare var elasticlunr: any;

@Injectable({
  providedIn: 'root'
})
export class ProductsRepositoryService {
  private products: Product[];
  private index: any;

  constructor() {
    this.start();
    this.createIndex();
  }

  start() {
    this.products = [
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
      },
      {
        id: '8',
        name: 'Doritos doritos jurassic world nacho 155 g',
        description: 'Sabritas',
        price: 25,
        imageUrl: 'https://super.walmart.com.mx/images/product-images/img_medium/00750101113106m.jpg'
      },
      {
        id: '9',
        name: 'Papas sabritas crema y especias 170 g',
        description: 'Sabritas',
        price: 25,
        imageUrl: 'https://super.walmart.com.mx/images/product-images/img_medium/00750101111559m.jpg'
      },
      {
        id: '10',
        name: 'Churrumais churrumais con limoncito 200 g',
        description: 'Sabritas',
        price: 24.51,
        imageUrl: 'https://super.walmart.com.mx/images/product-images/img_medium/00750101113103m.jpg'
      }
    ];
  }

  search(query: string): Product[] {
    if (query == null) {
      return this.products;
    }

    let results = this.index.search(query,  {
      expand: true
    });
    return results.map(x => x.doc);
  }

  private createIndex() {
    this.index = elasticlunr(function () {
      this.addField('name');
      this.setRef('id');
    });

    this.products.forEach(x => {
      this.index.addDoc(x);
    });
  }
}

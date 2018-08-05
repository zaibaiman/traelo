import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as firestore from 'firebase/firestore';

declare var elasticlunr: any;

@Injectable({
  providedIn: 'root'
})
export class ProductsRepositoryService {
  private products: Product[];
  private index: any;
  private db = firebase.firestore();

  constructor() {
    this.start();
  }

  async start() {
    this.products = [];

    if (window.localStorage.products) {
      this.products = JSON.parse(window.localStorage.products);
    } else {
      const querySnapshot = await this.db.collection('products').limit(3000).get();
      querySnapshot.forEach(doc => {
        this.products.push({
          id: doc.id,
          name: doc.data().shortDescription,
          price: doc.data().price,
          imageId: doc.data().imageId
        });
      });
      window.localStorage.products = JSON.stringify(this.products);
    }
    this.products.forEach(x => x.imageUrl = `https://super.walmart.com.mx/images/product-images/img_medium/${x.imageId}m.jpg`);

    this.createIndex();
  }

  search(query: string): Product[] {
    if (query == null) {
      return [];
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

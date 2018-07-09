import { Component, OnInit } from '@angular/core';
import { ProductsRepositoryService } from '../services/products-repository.service';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsRepositoryService, 
    private basketService: BasketService) { }

  ngOnInit() {
    this.products = this.productsService.search(null);
  }

  onAddToCartClick(product: Product) {
    this.basketService.add(product, 1);
  }

  onAddToFavoritesClick(product: Product) {

  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsRepositoryService } from '../../services/products-repository.service';
import { BasketService } from '../../services/basket.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productServiceStarted = false;

  constructor(private productsService: ProductsRepositoryService,
    private basketService: BasketService, private router: Router) { }

  ngOnInit() {
    this.init();

    if (!this.productsService.isStarted()) {
      this.productsService.addStartedEventListener(() => {
        this.productServiceStarted = true;
      });
    } else {
      this.productServiceStarted = true;
    }
  }

  onSearchEnter(query: string) {
    this.search(query);
    this.closeTypeaheadDropdown();
  }

  private init() {
    $('#search-bar').typeahead({
      hint: true,
      highlight: true,
      minLength: 1,
    }, {
      name: 'products',
      limit: 10,
      source: (q, cb) => {
        return this.searchProducts(q, cb);
      }
    });

    $('#search-bar').on('typeahead:selected', (evt, item) => {
      this.search(item);
    });
  }

  private search(query: string) {
    this.router.navigate(['/search'], { queryParams: { q: query} });
  }

  private closeTypeaheadDropdown() {
    $('#search-bar').typeahead('close');
  }

  private searchProducts(query, callback) {
    let products = this.productsService.search(query);
    callback(products.map(x => x.name));
  }
}

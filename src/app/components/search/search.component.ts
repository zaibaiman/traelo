import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductsRepositoryService } from '../../services/products-repository.service';
import { BasketService } from '../../services/basket.service';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: Product[] = [];
  query: string;

  constructor(private productsService: ProductsRepositoryService,
    private basketService: BasketService) { }

  ngOnInit() {
    this.products = this.productsService.search(null);
    this.init();
  }

  onAddToCartClick(product: Product) {
    this.basketService.add(product, 1);
  }

  onAddToFavoritesClick(product: Product) {

  }

  onSearchEnter(query: string) {
    query = query === '' ? null : query;
    this.products = this.productsService.search(query);
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
      this.products = this.productsService.search(item);
    });

    let onWindowResize = () => {
      let wh = $(window).height();
      let hh = $('header').height();
      let fh = $('footer').height();
      if (hh + $('#container').height() + fh < wh) {
        $('#container').height(wh - hh - fh);
      }
    };

    // $(window).resize(onWindowResize);
    // onWindowResize();
  }

  private searchProducts(query, callback) {
    let products = this.productsService.search(query);
    callback(products.map(x => x.name));
  }

  private closeTypeaheadDropdown() {
    $('#search-bar').typeahead('close');
  }
}

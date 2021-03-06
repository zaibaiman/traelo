import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsRepositoryService } from '../../services/products-repository.service';
import { BasketService, LineOrder } from '../../services/basket.service';
import { BasketComponent } from '../basket/basket.component';


declare var $: any;

interface ProductVm extends Product {
  lineOrder: LineOrder;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: ProductVm[] = [];
  query: string;
  lineOrders: LineOrder[] = [];
  productServiceStarted = false;

  @ViewChild(BasketComponent)
  basketComponent: BasketComponent;

  constructor(private productsService: ProductsRepositoryService,
    private basketService: BasketService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (!this.productsService.isStarted()) {
      this.productsService.addStartedEventListener(() => {
        this.productServiceStarted = true;
        this.onProductServiceStarted();
      });
    } else {
      this.productServiceStarted = true;
      this.onProductServiceStarted();
    }
  }

  onAddToCartClick(product: Product) {
    this.basketService.add(product, 1);
  }

  onAddToFavoritesClick(product: Product) {

  }

  onSearchEnter(query: string) {
    this.search(query);
    this.closeTypeaheadDropdown();
  }

  onOpenBasketClick() {
    this.basketComponent.open(window.innerWidth);
  }

  onUpClick(product: ProductVm) {
    this.basketService.add(product.lineOrder.product, 1);
  }

  onDownClick(product: ProductVm) {
    if (product.lineOrder) {
      if (product.lineOrder.qty == 1) {
        this.basketService.remove(product.lineOrder);
      } else {
        this.basketService.update(product.lineOrder, product.lineOrder.qty - 1);
      }
    }
  }

  private onProductServiceStarted() {
    this.products = <ProductVm[]> this.productsService.search(null);

    this.lineOrders = this.basketService.lineOrders();
    this.updateLineOrderOfProducts();

    this.basketService.addListener(() => {
      this.lineOrders = this.basketService.lineOrders();
      this.updateLineOrderOfProducts();
    });

    let query = this.activatedRoute.snapshot.queryParams['q'];
    if (query) {
      $('#search-bar').val(query);
      this.search(query);
    }

    this.init();
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
        return this.searchProductsTypeAhead(q, cb);
      }
    });

    $('#search-bar').on('typeahead:selected', (evt, item) => {
      this.products = <ProductVm[]> this.productsService.search(item);
    });

    let onWindowResize = () => {
      let wh = $(window).height();
      let hh = $('header').height();
      let ch = $('#container').height();
      let fh = $('footer').height();
      if (hh + ch + fh < wh) {
        $('#container').css('min-height', `${wh - hh - fh}px`);
      }
    };

    $(window).resize(onWindowResize);
    setTimeout(() => {
      onWindowResize();
    }, 1000);
  }

  private search(query: string) {
    query = query === '' ? null : query;
    this.products = <ProductVm[]> this.productsService.search(query);
    this.updateLineOrderOfProducts();
  }

  private searchProductsTypeAhead(query, callback) {
    let products = this.productsService.search(query);
    callback(products.map(x => x.name));
  }

  private closeTypeaheadDropdown() {
    $('#search-bar').typeahead('close');
  }

  private updateLineOrderOfProducts() {
    this.products.forEach(p => p.lineOrder = null);
    this.lineOrders.forEach(lo => {
      this.products.forEach(p => {
        if (p.id === lo.product.id) {
          p.lineOrder = lo;
        }
      });
    });
  }
}

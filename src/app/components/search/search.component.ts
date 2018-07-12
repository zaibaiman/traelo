import { Component, OnInit } from '@angular/core';
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

  private init() {
    let states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
      'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
      'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
      'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
      'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
      'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
      'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
      'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
      'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];

    $('#search-bar').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'states',
      source: this.substringMatcher(states)
    });
  }

  private substringMatcher(strs) {
    return function findMatches(q, cb) {
      let matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substringRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substringRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { BasketService, LineOrder } from '../services/basket.service';

declare var $: any;
declare var Prism: any;

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  lineOrders: LineOrder[] = [];
  total: number = 0;

  private checkoutStep: 'resume' | 'address' | 'order' = 'resume';

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.lineOrders = this.basketService.lineOrders();
    this.total = this.basketService.total();
    setTimeout(() => { this.init() }, 500);
  }

  onDeliveryAddressClick() {
    this.checkoutStep = 'address';
  }

  onMakeOrderClick() {
    this.checkoutStep = 'order';
  }

  onContinueShoppingClick() {
    this.close();
  }

  onBackClick() {
    this.checkoutStep = 'resume';
  }

  private init() {
    $.HSCore.components.HSScrollBar.init($('.js-ss-scrollbar'));
    $.HSCore.components.HSSelect.init('.js-ss-select');

    var styleSwitcher = $('.u-ss');

    $('.u-ss-toggler').on('click', (e) => {
      e.preventDefault();

      if (styleSwitcher.hasClass('u-ss_initialized')) {
        this.close();
        return false;
      } else {
        setTimeout(() => {
          styleSwitcher.addClass('u-ss_opened');
          styleSwitcher.addClass('u-ss_initialized');
        }, 100);
      }
    });
  }

  private close() {
    this.checkoutStep = 'resume';
    var styleSwitcher = $('.u-ss');
    if (styleSwitcher.hasClass('u-ss_initialized')) {
      styleSwitcher.toggleClass('u-ss_opened');
    }
  }
}

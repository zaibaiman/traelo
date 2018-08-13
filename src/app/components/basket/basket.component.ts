import { Component, OnInit } from '@angular/core';
import { BasketService, LineOrder } from '../../services/basket.service';

import * as firebase from 'firebase';

declare var $: any;

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  lineOrders: LineOrder[] = [];
  total: number = 0;
  isOpen = false;
  coto: string = '';
  home: string;
  sendOrder = false;

  private checkoutStep: 'resume' | 'address' | 'order' = 'resume';
  private db = firebase.firestore();

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.lineOrders = this.basketService.lineOrders();
    this.total = this.basketService.total();

    this.basketService.addListener(() => {
      this.lineOrders = this.basketService.lineOrders();
      this.total = this.basketService.total();
    });

    setTimeout(() => { this.init() }, 500);
  }

  onUpClick(lineOrder: LineOrder) {
    this.basketService.add(lineOrder.product, 1);
  }

  onDownClick(lineOrder: LineOrder) {
    this.basketService.update(lineOrder, lineOrder.qty - 1);
  }

  onRemoveLineOrderClick(lineOrder) {
    this.basketService.remove(lineOrder);
  }

  onDeliveryAddressClick() {
    this.checkoutStep = 'address';
  }

  async onMakeOrderClick() {
    try {
      this.sendOrder = true;
      let lineOrders = this.lineOrders.map(x => {
        return {
          price: x.price,
          qty: x.qty,
          product: {
            id: x.product.id,
            name: x.product.name
          }
        }
      });
      await this.db.collection('orders').add({
        createdAt: new Date().toUTCString(),
        coto: this.coto,
        home: this.home,
        total: this.basketService.total(),
        lineOrders: lineOrders
      });
      this.basketService.removeAll();
      this.checkoutStep = 'order';
    } catch (error) {
      console.log(error);
    } finally {
      this.sendOrder = false;
    }
  }

  onContinueShoppingClick() {
    this.close();
  }

  onBackClick() {
    if (this.checkoutStep === 'resume') {
      this.close();
    } else {
      this.checkoutStep = 'resume';
    }
  }

  open(maxWidth: number) {
    this.isOpen = true;
    let styleSwitcher = $('.u-ss');
    setTimeout(() => {
      $('html, body').css({
        overflow: 'hidden',
        position: 'fixed',
        height: '100%'
      });
      if (maxWidth > 0) {
        $('.u-ss-wrap').width(maxWidth);
      }
      styleSwitcher.addClass('u-ss_opened');
      styleSwitcher.addClass('u-ss_initialized');
    }, 100);
  }

  close() {
    this.isOpen = false;
    this.checkoutStep = 'resume';
    var styleSwitcher = $('.u-ss');
    if (styleSwitcher.hasClass('u-ss_initialized')) {
      styleSwitcher.toggleClass('u-ss_opened');
      $('html, body').css({
        overflow: 'auto',
        position: 'static',
        height: 'auto'
      });
    }
  }

  private init() {
    $.HSCore.components.HSScrollBar.init($('.js-ss-scrollbar'));
    // $.HSCore.components.HSSelect.init('.js-ss-select');

    let styleSwitcher = $('.u-ss');

    $('.u-ss-toggler').on('click', (e) => {
      e.preventDefault();

      if (styleSwitcher.hasClass('u-ss_opened')) {
        this.close();
      } else {
        this.open(0);
      }
    });
  }
}

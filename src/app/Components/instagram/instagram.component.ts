import { CheckoutService } from './../../services/checkout.service';
import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css']
})
export class InstagramComponent implements OnInit, AfterViewChecked {

  // prices
  likePrice = 0.1;
  followPrice = 0.1;
  watchPrice = 2.5;
  commentPrice = 2.5;
  // user selected amount
  likeAmount = 1000;
  followAmount = 1000;
  watchAmount = 50;
  commentAmount = 100;
  // total
  totalPrice = 0;

  commentSale: any;
  likeSale: any;
  commentSales = [
    {id: 1, platform: 'instagram', name:'מבצע-תגובות-אינסטגרם', amount: 500, price: 800, sale: true},
    {id: 2, platform: 'instagram', name:'מבצע-תגובות-אינסטגרם', amount: 250, price: 450, sale: true},
    {id: 3, platform: 'instagram', name:'מבצע-תגובות-אינסטגרם', amount: 100, price: 200, sale: true}
  ];
  likeSales = [
    {id: 4, platform: 'instagram', name:'מבצע-לייקים-אינסטגרם', amount: 500, price: 800, sale: true},
    {id: 5, platform: 'instagram', name:'מבצע-לייקים-אינסטגרם', amount: 250, price: 450, sale: true},
    {id: 6, platform: 'instagram', name:'מבצע-לייקים-אינסטגרם', amount: 100, price: 200, sale: true}
  ];
  constructor(
    private checkOut: CheckoutService,
     private cdRef: ChangeDetectorRef,
     private router: Router) { }

  ngOnInit() {
    this.commentSale = this.commentSales[0];
    this.likeSale = this.likeSales[0];
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });

  }

ngAfterViewChecked() {
  this.totalPrice = this.checkOut.instagramFinal;
  this.cdRef.detectChanges();
}
  calcPrice(category: string): void {
    switch (category) {
      case 'like':
      this.totalPrice += this.likePrice * this.likeAmount;
      this.checkOut.addProdcut({
        id: 'instagram-like',
        platform: 'instagram',
        name: 'לייקים - אינסטגרם',
        price: this.likePrice,
        amount: this.likeAmount,
        totalPrice: this.likeAmount * this.likePrice,
        sale: false
      });
      break;

      case 'follow':
      this.totalPrice += this.followPrice * this.followAmount;
      this.checkOut.addProdcut({
        id: 'instagram-follow',
        platform: 'instagram',
        name: 'עוקבים - אינסטגרם',
        price: this.followPrice ,
        amount: this.followAmount,
        totalPrice: this.followAmount * this.followPrice,
        sale: false
      });
      break;

      case 'comment':
      this.totalPrice +=  this.commentPrice * this.commentAmount;
      this.checkOut.addProdcut({
        id: 'instagram-comment',
        platform: 'instagram',
        name: 'תגובות - אינסטגרם',
        price: this.commentPrice,
        amount: this.commentAmount,
        totalPrice: this.commentAmount * this.commentPrice,
        sale: false
      });
      break;

      case 'comment-sale':
      this.totalPrice +=  this.commentSale.price;
      // If passing original object, the amount will change. -- Must send copy here because of ngModel
      const commentCopy = Object.assign({}, this.commentSale);
      this.checkOut.addProdcut(commentCopy, true);
      this.checkOut.addAmount(this.totalPrice, 'instagram');
      return;

      case 'like-sale':
      this.totalPrice +=  this.likeSale.price;
      // If passing original object, the amount will change. -- Must send copy here because of ngModel
      const likeCopy = Object.assign({}, this.likeSale);
      this.checkOut.addProdcut(likeCopy, true);
      this.checkOut.addAmount(this.totalPrice, 'instagram');
      return;
    }
    this.checkOut.addAmount(this.totalPrice, 'instagram');
  }

  addAmount(category, op) {
    switch (category) {
      case 'like':
      if (op === '+') {
        this.likeAmount += 100;
      } else {
        this.likeAmount -= 100;
        if (this.likeAmount < 0) {
          this.likeAmount = 0;
        }
      }
      break;
      case 'comment':
      if (op === '+') {
        this.commentAmount += 100;
      } else {
        this.commentAmount -= 100;
        if (this.commentAmount < 0) {
          this.commentAmount = 0;
        }
      }
      break;
      case 'follow':
      if (op === '+') {
        this.followAmount += 100;
      } else {
        this.followAmount -= 100;
        if (this.followAmount < 0) {
          this.followAmount = 0;
        }
      }
      break;
    }
  }
}

import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { CheckoutService } from './../../services/checkout.service';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit, AfterViewChecked {
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
  {id: 7, platform: 'facebook', name:'מבצע-תגובות-פייסבוק', amount: 500, price: 800, sale: true},
  {id: 8, platform: 'facebook', name:'מבצע-תגובות-פייסבוק', amount: 250, price: 450, sale: true},
  {id: 9, platform: 'facebook', name:'מבצע-תגובות-פייסבוק', amount: 100, price: 200, sale: true}
];
likeSales = [
  {id: 10, platform: 'facebook', name:'מבצע-לייקים-פייסבוק', amount: 500, price: 800, sale: true},
  {id: 11, platform: 'facebook', name:'מבצע-לייקים-פייסבוק', amount: 250, price: 450, sale: true},
  {id: 12, platform: 'facebook', name:'מבצע-לייקים-פייסבוק', amount: 100, price: 200, sale: true}
];
constructor(private checkOut: CheckoutService, private cdRef: ChangeDetectorRef) { }

ngOnInit() {
  this.commentSale = this.commentSales[0];
  this.likeSale = this.likeSales[0];

}
  ngAfterViewChecked() {
    this.totalPrice = this.checkOut.facebookFinal;
    this.cdRef.detectChanges();
  }
    calcPrice(category: string): void {
      switch (category) {
        case 'like':
        this.totalPrice += this.likePrice * this.likeAmount;
        this.checkOut.addProdcut({
          id: 'facebook-like',
          platform: 'facebook',
          name: 'לייקים - פייסבוק',
          price: this.likePrice,
          amount: this.likeAmount,
          totalPrice: this.likeAmount * this.likePrice
        });
        break;
        case 'follow':
        this.totalPrice += this.followPrice * this.followAmount;
        this.checkOut.addProdcut({
          id: 'facebook-follow',
          platform: 'facebook',
          name: 'עוקבים - פייסבוק',
          price: this.followPrice ,
          amount: this.followAmount,
          totalPrice: this.followAmount * this.followPrice
        });
        break;
        case 'comment':
        this.totalPrice +=  this.commentPrice * this.commentAmount;
        this.checkOut.addProdcut({
          id: 'facebook-comment',
          platform: 'facebook',
          name: 'תגובות - פייסבוק',
          price: this.commentPrice,
          amount: this.commentAmount,
          totalPrice: this.commentAmount * this.commentPrice
        });
        break;
        case 'comment-sale':
        this.totalPrice +=  this.commentSale.price;
        // If passing original object, the amount will change. -- Must send copy here because of ngModel
        const commentCopy = Object.assign({}, this.commentSale);
        this.checkOut.addProdcut(commentCopy, true);
        this.checkOut.addAmount(this.totalPrice, 'facebook');
        return;

        case 'like-sale':
        this.totalPrice +=  this.likeSale.price;
        // If passing original object, the amount will change. -- Must send copy here because of ngModel
        const likeCopy = Object.assign({}, this.likeSale);
        this.checkOut.addProdcut(likeCopy, true);
        this.checkOut.addAmount(this.totalPrice, 'facebook');
        return;
      }
      this.checkOut.addAmount(this.totalPrice, 'facebook');
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

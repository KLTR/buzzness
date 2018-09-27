import { AppComponent } from './../app.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  products = [];
  finalAmount = 0;
  instagramFinal = 0;
  facebookFinal = 0;
  obs: Observable<number>;
  productsObs: Observable<any[]>;
  user: any;
  addScript = true;
  constructor(private toaster: AppComponent) {
    this.obs = new Observable((observerer) => {
      observerer.next(this.finalAmount);
    });
  }



  getAmout(): number {
    return this.finalAmount;
  }
  createObs(amount) {
    this.obs = new Observable((observerer) => {
      observerer.next(amount);
    });
  }

  isAddScript() {
    if (!this.addScript) {
      return false;
    }
    this.addScript = false;
    return true;
  }

  setUser(user) {
    this.user = user;
  }
  getUser() {
    return this.user;
  }
  setProducts(prods) {
    this.products = prods;
  }
  addProdcut(product, isSale?): void {
    // Sale product
    if (product.amount === 0 || product.price === 0) {
      return;
    }
    if (this.products.length === 0) {
      this.products.push(product);
      this.toaster.showSuccess(product.name);
      return;
    }
    const index = this.products.map(x => x.id).indexOf(product.id);
    // product found
    if (index !== -1) {
      if (isSale) {
        this.products[index].price += product.price;
      } else {
        this.products[index].price = product.price;
      }
      this.products[index].amount += product.amount;
    } else {
      // new product
      this.products.push(product);
    }
    this.toaster.showSuccess(product.name);
  }

  deleteProduct(product, reduceAmount) {
    // get index
    const index = this.products.map(x => x.id).indexOf(product.id);
    this.products.splice(index, 1);

    switch (product.platform) {
      case 'instagram':
        this.instagramFinal -= reduceAmount;
        break;
      case 'facebook':
        this.facebookFinal -= reduceAmount;
        break;
    }
    this.finalAmount = this.instagramFinal + this.facebookFinal;
    // if (this.finalAmount > 0 ) {
    //   this.facebookFinal = 0;
    // }
    this.obs = new Observable((observerer) => {
      observerer.next(this.finalAmount);
    });
    if (this.finalAmount === 0) {
      this.addScript = true;
    }
  }

  setAmount(newAmount): void {
    this.finalAmount = newAmount;
    this.obs = new Observable((observerer) => {
      observerer.next(this.finalAmount);
    });
  }

  addAmount(addAmount, platform): void {

    switch (platform) {
      case 'instagram':
        this.instagramFinal = addAmount;
        break;
      case 'facebook':
        this.facebookFinal = addAmount;
        break;
    }

    this.finalAmount = this.instagramFinal + this.facebookFinal;
    this.obs = new Observable((observerer) => {
      observerer.next(this.finalAmount);
    });
  }

  zeroAmount(): void {
    this.finalAmount = 0;
    this.obs = new Observable((observerer) => {
      observerer.next(this.finalAmount);
    });
  }
}

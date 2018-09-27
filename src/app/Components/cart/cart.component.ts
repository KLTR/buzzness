import { CheckoutService } from './../../services/checkout.service';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef  } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { AppComponent } from '../../app.component';
interface User {
  name: string;
  email: string;
  account: string;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
    style({ transform: 'translateY(-20%)' }),
    animate(500)
  ]),
  transition(':leave', [
    group([
       animate('0.5s ease', style({transform: 'translateY(-20%)', 'height': '0px', 'padding': '0px 15px 0px 15px' })),
       animate('0.5s 0.2s ease', style({ opacity: 0 }))
    ])
 ])
    ])
  ]
})


export class CartComponent implements OnInit, AfterViewChecked {
  products: any;
  finalAmount: number;
  displayAmount: string;
  contactForm: FormGroup;
  user: User;
  submitted = false;
  displayForm = false;
  constructor(
    private checkoutService: CheckoutService,
     private cdRef: ChangeDetectorRef,
     private toaster: AppComponent
    ) {
    this.user = {
      name: '',
      email: '',
      account: ''
    };
   }

  ngOnInit() {

  }
  onSubmit(form) {
    this.user = form.form.value;
    this.displayForm = false;
    this.submitted = true;
    this.checkoutService.setUser(this.user);
    this.toaster.showSent(this.user.email);
   }
  ngAfterViewChecked() {
    this.products = this.checkoutService.products;
    this.checkoutService.obs.subscribe((amount) => {
      this.finalAmount = amount;
      this.displayAmount = amount + 'שקלים';
    });

    this.cdRef.detectChanges();
  }
  deleteProduct(product, reduceAmount) {
    this.checkoutService.deleteProduct(product, reduceAmount);
  }
  toggleForm(flag: boolean) {
    this.displayForm = flag;
  }

  validateEmail(): boolean {
     // tslint:disable-next-line:max-line-length
     const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test(this.user.email)) {
     return true;
    } else {
      return false;
    }
  }

}

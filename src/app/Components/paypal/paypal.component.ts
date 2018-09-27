import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';

declare const paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit, AfterViewChecked {

  addScript;
  @Input() userInfo;
  finalAmount: number;
  displayAmount: string;
  user: any;
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AVD7PYtKH_6qvzSRQwgkOORxTDC6kGD12DU95KFl-JiS3-tucAShQtKnPk1Zw0UqCqI0MIeIcNQ6Lh9O',
      production: 'AeqVr73iePUWXkNrXpSZMaPl1D-J-knLJ0evmHCVqAD-1v3tCNn7SckQgfTveXHK3eXiRRor4ZoJPovE'
      // from https://developer.paypal.com/developer/applications/
    },
    commit: true,
    payment: (data, actions) => {
      this.user = this.checkout.getUser();
      return actions.payment.create({
        'transactions': [{
          'amount': {
            'total': this.finalAmount,
            'currency': 'ILS',
          },
          description: `רכישת עוקבים, לייקים, ותגובות לרשתות החברתיות - Buzzness. הרכישה בוצעה עבור המשתמש ${this.user.account}`
        }],
      });
    },
    onAuthorize: function (data, actions) {
      return actions.payment.execute()
        .then((payment) => {
        });
    },
    style: {
      size: 'medium', // tiny, small, medium
      color: 'blue', // orange, blue, silver
      shape: 'rect'    // pill, rect
    },
  };

  // End config


  constructor(public checkout: CheckoutService) { }

  ngOnInit() {
    if (this.checkout.isAddScript()) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
      });
    }

  }

  ngAfterViewChecked(): void {
    this.checkout.obs.subscribe((amount) => {
      this.finalAmount = amount;
      this.displayAmount = amount.toFixed() + ' ' + 'שקלים';
    });
  }

  addPaypalScript() {
    // this.addScript = true;
    return new Promise((resolve, reject) => {
      const scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }
}

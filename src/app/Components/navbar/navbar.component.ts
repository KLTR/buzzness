import { CheckoutService } from './../../services/checkout.service';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewChecked{
  finalAmount: number;
  constructor(public checkout: CheckoutService, private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {

  }

  ngAfterViewChecked() {
    this.checkout.obs.subscribe((amount) => {
      this.finalAmount = amount;
    });
    this.cdRef.detectChanges();
  }

}

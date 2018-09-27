import { CheckoutService } from './services/checkout.service';
import { FacebookComponent } from './Components/facebook/facebook.component';
import { InstagramComponent } from './Components/instagram/instagram.component';
import { YoutubeComponent } from './Components/youtube/youtube.component';
import { HomeComponent } from './Components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { PaypalComponent } from './Components/paypal/paypal.component';
import { CartComponent } from './Components/cart/cart.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterComponent } from './Components/toaster/toaster.component';

@NgModule({
  declarations: [
    AppComponent,
    InstagramComponent,
    HomeComponent,
    YoutubeComponent,
    FacebookComponent,
    PaypalComponent,
    CartComponent,
    NavbarComponent,
    ToasterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      // toastComponent: ToasterComponent // added custom toast!
    })
  ],
  // entryComponents: [ToasterComponent], // add!
  providers: [CheckoutService, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

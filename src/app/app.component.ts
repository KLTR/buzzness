import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router, private toastr: ToastrService) {

  }

  showSuccess(name) {
    this.toastr.success(`המוצר ${name} נוסף לסל!`);
  }
  showSent(email) {
    this.toastr.success(`תודה ${email}, ההרשמה בוצעה בהצלחה`);
  }

}

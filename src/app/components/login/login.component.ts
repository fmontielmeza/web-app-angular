import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/model/user.model';
import { DataService } from 'src/app/core/services/data.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loading = false;
  error = '';
  user: User = {
    email: '',
    password: ''
  };
  tutenUser: any;

  constructor(
    private userService: UserService,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.tutenUser = this.dataService.getTutenUser();

    if (this.tutenUser) {
      this.router.navigateByUrl('/bookings');
    }
  }

  submit() {
    if (this.isNotBlank(this.user.email) && this.isNotBlank(this.user.password)) {
      this.loading = true;
      console.log('user: ', this.user);
      this.userService.login(this.user).subscribe(tutenUser => {
        console.log('tutenUser: ', tutenUser);
        this.dataService.setTutenUser(tutenUser);
        this.loading = false;
        this.router.navigateByUrl('/bookings');
      }, error => {
        console.log('[ERROR] login => code: ' + error.status + ' - message: ' + error.message);
        this.error = error.error;
        this.loading = false;
      });
    } else {
      this.error = 'Campos obligatorios';
    }
  }

  isNotBlank(value: string): boolean {
    return value != undefined && value != null && value != '';
  }

}

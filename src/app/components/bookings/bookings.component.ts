import { DataService } from 'src/app/core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Booking } from 'src/app/core/model/booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  tutenUser: any;
  bookings: Booking[] = [];
  displayedColumns: string[] = ['BookingId', 'Cliente', 'Fecha de Creación', 'Dirección', 'Precio'];

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tutenUser = this.dataService.getTutenUser();

    if (this.tutenUser) {
      this.userService.getBookings(this.tutenUser, true).subscribe(response => {
        response.forEach((r: any) => {
          const booking: Booking = {
            bookingId: r.bookingId,
            firstName: r.tutenUserClient.firstName,
            lastName: r.tutenUserClient.lastName,
            bookingTime: r.bookingTime,
            streetAddress: r.locationId.streetAddress,
            bookingPrice: r.bookingPrice,
          }

          this.bookings.push(booking);
        });

        console.log('bookings', this.bookings);
      }, error => {
        console.log('[ERROR] login => code: ' + error.status + ' - message: ' + error.message);
        this.logout();
      });
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

}

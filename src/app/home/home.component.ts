import { Component } from '@angular/core';
import { StudentComponent } from '../components/student/student.component';
import { LocationComponent } from '../components/location/location.component';
import { OfferComponent } from '../components/offer/offer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StudentComponent, LocationComponent, OfferComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

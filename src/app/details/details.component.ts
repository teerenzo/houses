import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Unit Available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>
            Does this locations have laundry: {{ housingLocation?.laundry }}
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitHousingLocation()">
          <label for="first-name"> First name</label>
          <input type="text" id="first-name" formControlName="firstName" />
          <label for="last-name"> Last name</label>
          <input type="text" id="last-name" formControlName="lastName" />

          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email" />
          <button class="primary" type="submit">Apply Now</button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocationId = 0;
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    console.log(this.route.params);
    this.housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService
      .getHousingLocationById(this.housingLocationId)
      .then((housingLocation?: HousingLocation) => {
        console.log(housingLocation);
        this.housingLocation = housingLocation;
      });
  }

  submitHousingLocation() {
    this.housingService.submitHousingLocationService(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email
    );
  }
}

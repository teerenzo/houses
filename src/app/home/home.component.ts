import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent, CommonModule],
  template: `
    <section>
      <form>
        <input type="text" placeholder="filter by city" #filter />
        <button type="button" (click)="filterList(filter.value)">Search</button>
      </form>
      <section>
        <section class="results">
          <app-housing-location
            *ngFor="let housingLocation of filteredList"
            [housingLocation]="housingLocation"
          ></app-housing-location>
        </section>
      </section>
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  filteredList: HousingLocation[] = [];

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredList = housingLocationList;
      });
  }

  filterList(text: string) {
    this.filteredList = this.housingLocationList.filter((housingLocation) =>
      housingLocation.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}

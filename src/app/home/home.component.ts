import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocaion } from '../housing-locaion';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by City">
        <button class="primary" type="button">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location 
        *ngFor="let HousingLocation of HousingLocationList" 
        [housingLocation]="HousingLocation">
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  HousingLocationList: HousingLocaion[] = [];
  housingService: HousingService = inject(HousingService);
  
  constructor() {
    this.HousingLocationList = this.housingService.getAllHousingLocations();
  }
}

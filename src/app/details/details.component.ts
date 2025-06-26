import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 
import { HousingService } from '../housing.service';
import { HousingLocaion } from '../housing-locaion';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" alt="Exterior photo of {{housingLocation?.name}}">
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">
          {{housingLocation?.city}} {{housingLocation?.state}}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul class="amenities">
          <li *ngIf="housingLocation?.hasWifi">Wifi</li>
          <li *ngIf="housingLocation?.hasLaundry">Laundry</li>
          <li *ngIf="!housingLocation?.availableUnits">No units available</li>
          <li *ngIf="housingLocation?.availableUnits">Units available: {{housingLocation?.availableUnits}}</li>
        </ul>
      </section>
      <section class="listing-contact">
        <h2 class="section-heading">Contact this housing location</h2>
        <form class="contact-form">
          <label for="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" placeholder="Enter your name">
          <label for="contact-email">Email</label>
          <input id="contact-email" name="email" type="text" placeholder="Enter your email">
          <label for="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows="4" placeholder="Enter your message"></textarea>
          <button class="primary" type="button">Send</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocaion | undefined;

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
    console.log(this.housingLocation);

  }
  
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 
import { HousingService } from '../housing.service';
import { HousingLocaion } from '../housing-locaion';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
        <form class="contact-form" [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" formControlName="firstName" type="text" placeholder="Enter your first name">

          <label for="last-name">Last Name</label>
          <input id="last-name" formControlName="lastName" type="text" placeholder="Enter your last name">

          <label for="contact-email">Email</label>
          <input id="contact-email" formControlName="email" type="text" placeholder="Enter your email">

          <label for="contact-message">Message</label>
          <textarea id="contact-message" formControlName="message" rows="4" placeholder="Enter your message"></textarea>

          <button class="primary" type="submit">Send</button>
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
  applyForm = new FormGroup({
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl('')
  });


  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
    console.log(this.housingLocation);

  }
  submitApplication() {
    console.log(this.applyForm.value);
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.message ?? ''
    );
  } 

  
}

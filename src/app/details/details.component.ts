import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo">
      <section class="listing-description">
        <h2 class="linsting-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>

      <section class="listing-features">
        <h3 class="section-heading">Detalles</h3>
        <ul>
          <li>Unidades disponibles: {{housingLocation?.availableUnits}}</li>
          <li>Cuenta con WiFi: {{housingLocation?.wifi}}</li>
          <li>Cuenta con lavandería: {{housingLocation?.laundry}}</li>
        </ul>
      </section>

      <section class="listing-apply">
        <h3 class="section-heading">Contáctanos</h3>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">Nombre(s)</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="last-name">Apellidos</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="email">Correo electrónico</label>
          <input id="email" type="email" formControlName="email">

          <button type="submit" class="primary">Enviar</button>
        </form>
      </section>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  //Formulario de reserva
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(){
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication(){
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}

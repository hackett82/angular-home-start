import { Component } from '@angular/core';
import { HomeComponent } from "./home/home.component";
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <main>
      <header class="brand-name">
        <a [routerLink]="['']" class="home-link">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" >
        </a>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
    <h1>Hello Jina! Stop being mean to your Husband.</h1>`,
  styleUrls: ['./app.component.css'],
  imports: [HomeComponent, RouterModule],
})
export class AppComponent {
  title = 'homes';
}

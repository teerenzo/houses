import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `<main>
    <header class="brand-name">
      <img class="brand-logo" src="assets/logo.svg" />
    </header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>`,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'amategeko-dashboard';
}

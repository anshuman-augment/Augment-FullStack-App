import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section>
      <h2>Login</h2>
      <form (ngSubmit)="onSubmit()">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" [(ngModel)]="username" name="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" [(ngModel)]="password" name="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
      <p *ngIf="error" style="color: red;">{{ error }}</p>
    </section>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private housingService: HousingService, private router: Router) {}

  async onSubmit() {
    try {
      const token = await this.housingService.login(this.username, this.password);
      console.log('Login successful, token:', token);
      this.router.navigate(['/']);
    } catch (err) {
      console.error('Login error:', err);
      this.error = (err as Error).message || 'Login failed. Please check your credentials.';
    }
  }
}
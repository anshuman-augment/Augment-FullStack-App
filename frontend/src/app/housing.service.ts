import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = 'http://localhost:3000/api';

  constructor(private router: Router) {}

  async login(username: string, password: string): Promise<string> {
    const response = await fetch(`${this.url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.token;
  }

  private async handleResponse(response: Response) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      throw new Error('Unauthorized');
    }
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return await response.json();
  }

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${this.url}/locations`, {
      headers: {
        'Authorization': token || '',
      },
    });
    return this.handleResponse(response);
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${this.url}/locations/${id}`, {
      headers: {
        'Authorization': token || '',
      },
    });
    return this.handleResponse(response);
  }


  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}

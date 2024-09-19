import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) { }

  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const params = `latitude=${lat}&longitude=${lon}&current_weather=true`;
    return this.http.get(`${this.apiUrl}?${params}`);
  }
}



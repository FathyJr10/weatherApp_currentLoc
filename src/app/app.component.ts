import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [DatePipe]

})



export class AppComponent implements OnInit {
  

  weatherData: any;
  errorMessage: string = '';
  formattedDate: string = '';


  constructor(
    private weatherService: WeatherService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getUserLocation()
  }
  
  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.getWeather(lat, lon);

        },
        (error) => {
          this.errorMessage = 'Unable to retrieve your location.';
        }
      );
    } else {
      this.errorMessage = 'Geolocation is not supported by this browser.';
    }
  }
  getWeather(lat: number, lon: number): void {
    this.weatherService.getWeatherByCoordinates(lat, lon).subscribe(
      (data) => {
        this.weatherData = data.current_weather; 
        console.log(this.weatherData.time)
      },
      (error) => {
        this.errorMessage = 'Error fetching weather data.';
        console.error('Error fetching weather data', error);
      }
    );


  }

 
}


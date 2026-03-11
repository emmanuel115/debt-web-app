import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// Example interface for API data
export interface DebtResponse {
  year: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  private apiUrl = 'http://localhost:8089/api/debt/predictions/MEX';


  data = signal<DebtResponse[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getPredictions() {
    this.loading.set(true);
    this.http.get<DebtResponse[]>(this.apiUrl)
      .pipe(
        catchError(err => {
          this.error.set('Failed to load data');
          return ([]);
        })
      )
      .subscribe(response => {
        console.log("API RESPONSE: " + response);
        this.data.set(response);
        this.loading.set(false);
      });
  }



  

}

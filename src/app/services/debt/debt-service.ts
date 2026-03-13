import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  constructor(private http: HttpClient) {}

  getPredictions(): Observable<DebtResponse[]> {
    return this.http.get<DebtResponse[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    console.error('Debt API call failed:', error);
    return throwError(() => new Error('Something went wrong with the Debt API call.'));
  }

}

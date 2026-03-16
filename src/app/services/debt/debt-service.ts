import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Example interface for API data

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  apiUrl = 'http://localhost:8089/api/debt/predictions/';
  apiResponse: any = null;
  loading = false;
  errorMessage = '';

  constructor(private http: HttpClient) {}

}

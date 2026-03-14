import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { DebtService, DebtResponse } from '../services/debt/debt-service';
//import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-debt',
  imports: [CommonModule, FormsModule],
  templateUrl: './debt.html',
  styleUrl: './debt.css',
})
export class Debt {

    debtValues: DebtResponse[] = [];

    constructor(private http: HttpClient){}

    apiUrl = 'http://localhost:8089/api/debt/predictions/';

    countries = [
        { code: 'MEX', name: 'Mexico' },
        { code: 'USA', name: 'USA' },
        { code: "ARG", name: 'Argentina' }
    ];

    selectedCountry: string | null = null;
    loading = signal(false);
    errorMessage = signal("");

    fetchData() {

        console.log("En el fetch data");
        const start = performance.now();
    
    
      
        this.errorMessage.update(value => "");
        this.loading.update(value => true);

        if (!this.selectedCountry) {
            this.errorMessage.update(value => "Selecciona un Pais");
            return;
        }

        let apiUrlTemp = this.apiUrl + this.selectedCountry;
        console.log("API URL: " + apiUrlTemp);
        this.http.get<DebtResponse[]>(apiUrlTemp).subscribe({
            next: (data) => {
                this.debtValues = data;
                this.loading.update(value => false);
                this.errorMessage.update(value => "");
                const end = performance.now();
                console.log(`Execution time: ${(end - start).toFixed(2)} ms`);
            },
            error: (err) => {
                this.errorMessage.update(value => "Error al cargar datos. Intenta mas tarde");
                console.error(err);
                this.loading.update(value => false);
            }
        });
    }
}
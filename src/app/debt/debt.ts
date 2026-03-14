import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { DebtService, DebtResponse } from '../services/debt/debt-service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-debt',
  imports: [CommonModule, FormsModule],
  templateUrl: './debt.html',
  styleUrl: './debt.css',
})
export class Debt {

    sarimaxValues = signal<DebtResponse[]>([]);
    vecmValues = signal<DebtResponse[]>([]);

    constructor(private http: HttpClient){}

    apiUrlSarimax = 'http://localhost:8089/api/debt/predictions/sarimax/';
    apiUrlVecm = 'http://localhost:8089/api/debt/predictions/vecm/';

    countries = [
        { code: 'MEX', name: 'Mexico' },
        { code: 'USA', name: 'USA' },
        { code: "ARG", name: 'Argentina' }
    ];

    selectedCountry: string | null = null;
    loading = signal(false);
    errorMessage = signal("");
    currencyMessage = signal("");

    isSarimaxChecked = false;
    isVecmChecked = false;

    onCheckboxSarimaxChange(event: any) {
        //console.log('Checkbox sarimax value:', event.target.checked);
    }
    onCheckboxVecmChange(event: any) {
        //console.log('Checkbox vecm value:', event.target.checked);
    }

    fetchData() {

        this.sarimaxValues.set([]);
        this.vecmValues.set([]);

        console.log("En el fetch data");
        const start = performance.now();
      
        this.errorMessage.update(value => "");
        

        if (!this.selectedCountry) {
            this.errorMessage.update(value => "Selecciona un Pais");
            return;
        }
        if(!this.isSarimaxChecked && !this.isVecmChecked){
            this.errorMessage.update(value => "Selecciona un modelo");
            return;
        }
        this.loading.update(value => true);

        if(this.isSarimaxChecked){

            let apiUrlTemp = this.apiUrlSarimax + this.selectedCountry;
            console.log("API URL: " + apiUrlTemp);
            this.http.get<DebtResponse[]>(apiUrlTemp).subscribe({
                next: (data) => {
                    this.sarimaxValues.set([...data]);
                    this.loading.update(value => false);
                    this.errorMessage.update(value => "");
                    this.currencyMessage.update(value => "Valores expresados en USD")
                    const end = performance.now();
                    console.log(`Sarimax Execution time: ${(end - start).toFixed(2)} ms`);
                },
                error: (err) => {
                    this.errorMessage.update(value => "Sarimax - Error al cargar datos. Intenta mas tarde");
                    this.currencyMessage.update(value => "");
                    console.error(err);
                    this.loading.update(value => false);
                }
            });
        }
        

        if(this.isVecmChecked){

            let apiUrlTemp2 = this.apiUrlVecm + this.selectedCountry;
            console.log("API URL: " + apiUrlTemp2);
            this.http.get<DebtResponse[]>(apiUrlTemp2).subscribe({
                next: (data) => {
                    this.vecmValues.set([...data]);
                    this.loading.update(value => false);
                    this.errorMessage.update(value => "");
                    this.currencyMessage.update(value => "Valores expresados en USD")
                    const end = performance.now();
                    console.log(`Vecm Execution time: ${(end - start).toFixed(2)} ms`);
                },
                error: (err) => {
                    this.errorMessage.update(value => "Vecm - Error al cargar datos. Intenta mas tarde");
                    this.currencyMessage.update(value => "");
                    console.error(err);
                    this.loading.update(value => false);
                }
            });
        }
        
    }
}
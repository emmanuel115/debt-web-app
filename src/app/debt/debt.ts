import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { COUNTRY_LIST } from '../constants';
import { DebtResponse, DebtResponseValues } from '../debt-response';

@Component({
  selector: 'app-debt',
  imports: [CommonModule, FormsModule],
  templateUrl: './debt.html',
  styleUrl: './debt.css',
})
export class Debt {
     
    countriesList = COUNTRY_LIST;
    sarimaxValues = signal<DebtResponseValues[]>([]);
    vecmValues = signal<DebtResponseValues[]>([]);

    constructor(private http: HttpClient){}

    apiUrlSarimax = environment.apiUrlSarimax;
    apiUrlVecm = environment.apiUrlVecm;
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

        console.log("Debt predictions - fetch data()");
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
            console.log("SARIMAX API URL: " + apiUrlTemp);
            this.http.get<DebtResponse>(apiUrlTemp).subscribe({
                next: (data) => {
                    //console.log("API DATA: " + data.result)
                    this.loading.update(value => false);
                    if(data.code < 0){
                        this.sarimaxValues.set([]);
                        this.errorMessage.update(value => "Sarimax - ha ocurrido un error al ejecutar la prediccion");
                    }else{
                        this.sarimaxValues.set(JSON.parse(data.result));
                        this.currencyMessage.update(value => "Valores expresados en USD")
                    }
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
            console.log("VECM API URL: " + apiUrlTemp2);
            this.http.get<DebtResponse>(apiUrlTemp2).subscribe({
                next: (data) => {
                    this.loading.update(value => false);
                    //console.log("API DATA: " + data)
                    if(data.code < 0){
                        this.vecmValues.set([]);
                        this.errorMessage.update(value => "VECM - ha ocurrido un error al ejecutar la prediccion");
                    }else{
                        this.vecmValues.set(JSON.parse(data.result));
                        this.currencyMessage.update(value => "Valores expresados en USD")
                    }
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
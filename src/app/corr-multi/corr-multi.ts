import { Component, signal } from '@angular/core';
import { COUNTRY_LIST } from '../constants';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-corr-multi',
  imports: [CommonModule, FormsModule],
  templateUrl: './corr-multi.html',
  styleUrl: './corr-multi.css',
})
export class CorrMulti {

    countriesList = COUNTRY_LIST;

    constructor(private http: HttpClient){}

    apiUrlCorrMulti = environment.apiUrlCorrMulti;
    
    selectedCountry: any | null = null;
    //selectedCountryItem: string | null = null;
    loading = signal(false);
    errorMessage = signal("");
    noDataMessage = signal("");
    mapMessage = signal("");

    //plotImageSrc: string | null = null;

    plotImageSrc = signal("");

    getImage(): Observable<any> {
      return this.http.get<any>(this.apiUrlCorrMulti);
    }

    getCountryNameByCode(code: string): string | undefined {
      return COUNTRY_LIST.find(item => item.code === code)?.name;
    }

    fetchData() {

        this.apiUrlCorrMulti = environment.apiUrlCorrMulti;
        console.log("Corr multi - fetch data()");
        const start = performance.now();
        this.mapMessage.update(value => "");
        this.errorMessage.update(value => "");
        this.noDataMessage.update(value => "");
        this.plotImageSrc.update(value => "");

        
        if (!this.selectedCountry) {
            this.errorMessage.update(value => "Selecciona un País");
            return;
        }
        this.loading.update(value => true);
        this.apiUrlCorrMulti = this.apiUrlCorrMulti + this.selectedCountry;
        console.log("API CorrMulti URL: " + this.apiUrlCorrMulti);


        this.getImage().subscribe(res => {
          console.log(res)
          if(res == "Error"){
            this.errorMessage.update(value => "Ha ocurrido un error durante el analisis Multivariable");
          }else if(res == "NO_DATA"){
            this.noDataMessage.update(value => "No hay suficientes datos para calcular la correlación");
          }else{
            this.mapMessage.update(value => "Mostrando resultados de correlación multivariable para: " + this.getCountryNameByCode(this.selectedCountry));
            this.plotImageSrc.update(value => 'data:image/png;base64,' + res.imageBase64);
          }
          this.loading.update(value => false);
        });
 
    }
}

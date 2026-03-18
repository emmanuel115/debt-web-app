import { Component, signal } from '@angular/core';
import { COUNTRY_LIST, INDICATOR_LIST } from '../constants';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CorrUniResponse } from '../corr-uni-response';

@Component({
  selector: 'app-corr-uni',
  imports: [CommonModule, FormsModule],
  templateUrl: './corr-uni.html',
  styleUrl: './corr-uni.css',
})

export class CorrUni {

  countriesList = COUNTRY_LIST;
  indicatorsList = INDICATOR_LIST;

  constructor(private http: HttpClient){}

    apiUrlCorrUni = environment.apiUrlCorrUni;
    
    selectedCountry: any | null = null;
    selectedIndicator: any | null = null;
    loading = signal(false);
    errorMessage = signal("");
    indicatorMessage = signal("");

    plotImageSrc = signal("");

    getImage(): Observable<any> {
      return this.http.get<CorrUniResponse>(this.apiUrlCorrUni);
    }

    fetchDataUni() {

        this.apiUrlCorrUni = environment.apiUrlCorrUni;
        console.log("Corr uni - fetch data()");
        const start = performance.now();
        this.errorMessage.update(value => "");
        
        if (!this.selectedCountry) {
            this.errorMessage.update(value => "Selecciona un País");
            return;
        }
        if (!this.selectedIndicator) {
            this.errorMessage.update(value => "Selecciona un Indicador");
            return;
        }

        this.loading.update(value => true);
        this.apiUrlCorrUni = this.apiUrlCorrUni + this.selectedIndicator + "/" + this.selectedCountry;
        console.log("API CorrUni URL: " + this.apiUrlCorrUni);


        this.getImage().subscribe(res => {
          this.loading.update(value => false);
          if(res.code < 0){
            this.errorMessage.update(value => "Error al obtener información del servidor, intenta mas tarde");
            this.plotImageSrc.update(value => '');
            this.indicatorMessage.update(value => "");
          }else {
            if(res.message == "no_data_found" || res.message == "no_data_low_per"){
              this.errorMessage.update(value => "");
              this.indicatorMessage.update(value => "No se encontraron suficientes datos");
              this.plotImageSrc.update(value => '');
            }else{
              this.indicatorMessage.update(value => "Mostrando resultados de correlación para el idicador: " + res.corrType);
              this.plotImageSrc.update(value => 'data:image/png;base64,' + res.imageBase64);          
            }
          }
        });
 
    }
}

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
    mapMessage = signal("");

    //plotImageSrc: string | null = null;

    plotImageSrc = signal("");

    getImage(): Observable<any> {
      return this.http.get<any>(this.apiUrlCorrMulti);
    }

    fetchData() {

        this.apiUrlCorrMulti = environment.apiUrlCorrMulti;
        console.log("Corr multi - fetch data()");
        const start = performance.now();
        this.errorMessage.update(value => "");
        
        if (!this.selectedCountry) {
            this.errorMessage.update(value => "Selecciona un Pais");
            return;
        }
        this.loading.update(value => true);
        this.mapMessage.update(value => "Mostrando resultados de correlacion: " + this.selectedCountry);


        this.apiUrlCorrMulti = this.apiUrlCorrMulti + this.selectedCountry;
        console.log("API CorrMulti URL: " + this.apiUrlCorrMulti);


        this.getImage().subscribe(res => {
          this.plotImageSrc.update(value => 'data:image/png;base64,' + res.imageBase64);          
          this.loading.update(value => false);
        });
 
    }
}

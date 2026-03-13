import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DebtService, DebtResponse } from '../services/debt/debt-service';

@Component({
  selector: 'app-debt',
  imports: [CommonModule],
  templateUrl: './debt.html',
  styleUrl: './debt.css',
})
export class Debt implements OnInit {

    debtValues: DebtResponse[] = [];

    constructor(private debtService: DebtService){}

    ngOnInit(): void {
      
        this.debtService.getPredictions().subscribe({
            next: (data) => {
                this.debtValues = data;
            },
            error: (err) => {
                console.log("Error calling the API... ");
            }
        });
    }
}
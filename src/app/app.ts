import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatTabsModule, RouterModule, MatToolbarModule, MatDividerModule],
  templateUrl: './app.html'
})

export class App {}
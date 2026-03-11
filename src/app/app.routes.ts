import { Routes } from '@angular/router';
import { Debt } from './debt/debt';
import { CorrUni } from './corr-uni/corr-uni';
import { CorrMulti } from './corr-multi/corr-multi';

export const routes: Routes = [
    { path: 'debt', component: Debt },
  { path: 'corr-uni', component: CorrUni },
  { path: 'corr-multi', component: CorrMulti },
  { path: '', redirectTo: 'debt', pathMatch: 'full' }
];

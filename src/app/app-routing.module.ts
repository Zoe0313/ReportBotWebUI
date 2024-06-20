import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './component/reports.component';

const routes: Routes = [
   {path: "reports", component: ReportsComponent}
];

@NgModule({
   imports: [
      CommonModule,
      RouterModule.forRoot(routes)
   ],
   exports: [ RouterModule ],
   declarations: []
})
export class AppRoutingModule { }
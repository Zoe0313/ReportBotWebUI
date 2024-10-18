import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { ConfigService } from './service/configure.service';
import { ReportsService } from './service/reports.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
   showDialog: boolean;
   userName: string;
   isSystemAdmin = false;

   constructor(
      public router: Router,
      public activatedRoute: ActivatedRoute,
      public config: ConfigService,
      private locale: Location,
      private cdr: ChangeDetectorRef,
      private http: HttpClient,
      private reportsService: ReportsService,
   ) {
      if (localStorage.getItem('userName')) {
         this.userName = localStorage.getItem('userName');
      }
   }

   ngOnInit() {
      this.showDialog = !!!this.userName;
      this.config.obs$.subscribe(
         () => {
            localStorage.setItem('userName', this.config.userName);
            this.checkSystemAdmin();
         });
      if (localStorage.getItem('userName')) {
         this.config.userName = localStorage.getItem('userName');
      }
   }

   checkSystemAdmin() {
      if (this.config.userName && this.config.isSystemAdmin === undefined) {
         this.reportsService.checkSystemAdmin().subscribe(result => {
            console.log(this.config.userName + ' is system admin.');
            this.isSystemAdmin = this.config.isSystemAdmin = true;
         }, error => {
            this.isSystemAdmin = this.config.isSystemAdmin = false;
         });
      }
   }

   closeModal() {
      this.showDialog = false;
      this.config.userName = this.userName;
   }

   @HostListener('window:keydown', ['$event'])
   handleKeyDown(event: KeyboardEvent) {
      if (this.showDialog && this.userName && event.key === 'Enter') {
         this.config.userName = this.userName;
         this.showDialog = false;
      }
      this.cdr.detectChanges();
   }
}

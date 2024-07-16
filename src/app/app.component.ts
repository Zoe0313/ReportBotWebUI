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
   userPassword: string;
   isDevEnv = true;
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
//       this.isDevEnv = location.hostname === 'localhost';
      localStorage.setItem('originalUrl', locale.path());

//       if (!this.isDevEnv) {
//          if (document.cookie === '') {
//             window.location.href = '/login';
//          } else {
//             console.log(document.cookie);
//             this.userName = this.getCookie('user');
//             if (this.userName !== '') {
//                this.config.userName = this.userName;
//                this.config.password = this.userPassword;
//             } else {
//                window.location.href = '/login';
//             }
//          }
//       }

      if (localStorage.getItem('originalUrl')) {
         this.router.navigateByUrl(localStorage.getItem('originalUrl'));
      } else {
         if (locale.path() === '') {
            this.router.navigateByUrl('/reports');
         }
      }

      this.setReportTitle();
   }

   setReportTitle() {
      this.activatedRoute.queryParams.subscribe(params => {
         if (!!params['reportTitle']) {
            localStorage.setItem('reportTitle', params['reportTitle']);
         } else {
            localStorage.removeItem('reportTitle');
         }
      });
   }

   ngOnInit() {
      if (this.isDevEnv) {
         this.showDialog = !!!this.config.userName;
      }
      this.config.obs$.subscribe(
         () => {
            this.checkSystemAdmin();
         });
   }

   checkSystemAdmin() {
      if (this.config.userName && this.config.isSystemAdmin === undefined) {
         this.reportsService.checkSystemAdmin().subscribe(result => {
            this.isSystemAdmin = true;
            this.config.isSystemAdmin = true;
            console.log('checkSystemAdmin => true');
         }, error => {
            this.config.isSystemAdmin = false;
            this.router.navigateByUrl('/reports');
         });
      }
   }

   closeModal() {
      this.showDialog = false;
      this.config.userName = this.userName;
      this.config.password = this.userPassword;
      //this.checkSystemAdmin();
   }

   @HostListener('window:keydown', ['$event'])
   handleKeyDown(event: KeyboardEvent) {
      if (this.showDialog && this.userName && event.key === 'Enter') {
         this.config.userName = this.userName;
         this.config.password = this.userPassword;
         this.showDialog = false;
      }
      this.cdr.detectChanges();
   }

   private getCookie(name: string) {
      let ca: Array<string> = document.cookie.split(';');
      let caLen: number = ca.length;
      let cookieName = `${name}=`;
      let c: string;

      for (let i = 0; i < caLen; i += 1) {
          c = ca[i].replace(/^\s+/g, '');
          if (c.indexOf(cookieName) === 0) {
              return c.substring(cookieName.length, c.length);
          }
      }
      return '';
  }
}

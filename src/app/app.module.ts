import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { UserFilter } from './component/user-filter.component';
import {FastSvsRecordsGrid} from "./component/records.component";
import {UserListComponent} from "./component/users.component";
import {FastSvsRecordsService} from "./service/fastsvs-records.service";
import {CommonModule} from "@angular/common";
import {HighchartsStatic} from "angular2-highcharts/dist/HighchartsService";
import {createDrilldownModule} from "./chart/highcharts-static.factory";
import {ChartContainer} from "./component/chart-container.component";
import {ChartModule} from "angular2-highcharts";
import {DateRangePickerComponent} from "./component/date-range-picker.component";
import {DatetimePickerComponent} from "./component/datetime-picker.component";
import {OWL_DATE_TIME_FORMATS, OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {LocalizePickerLabels, pickerFormats} from "./component/datetime-picker-adapter";
import {CookieService} from "ngx-cookie-service";
import Highcharts from 'highcharts';
import xrange from "highcharts/modules/xrange";
import { HomeComponent } from './home/home.component';
import { TotStatisticsComponent } from './tot-statistics/tot-statistics.component';
import {UserRankComponent} from "./user-rank/user-rank.component";
import {ActiveUserComponent} from "./active-user/active-user.component";
import { SingleSvsDetailsComponent } from './single-svs-details/single-svs-details.component';
import {SvsStatisticsGridView} from "./component/grid-view.component";

xrange(Highcharts);
// export function highchartsFactory() {
//   return Highcharts;
// }

@NgModule({
  declarations: [
    AppComponent,
    UserFilter,
    FastSvsRecordsGrid,
    UserListComponent,
    ChartContainer,
    SvsStatisticsGridView,
    DateRangePickerComponent,
    DatetimePickerComponent,
    HomeComponent,
    TotStatisticsComponent,
    UserRankComponent,
    SingleSvsDetailsComponent,
    ActiveUserComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ChartModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AppRoutingModule,
  ],
  providers: [
     CookieService,
     FastSvsRecordsService,
     {provide: HighchartsStatic, useFactory: createDrilldownModule},
     {provide: OwlDateTimeIntl, useClass: LocalizePickerLabels},
      {provide: OWL_DATE_TIME_FORMATS, useValue: pickerFormats},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

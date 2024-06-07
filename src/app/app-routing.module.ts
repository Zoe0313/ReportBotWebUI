import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { TotStatisticsComponent } from './tot-statistics/tot-statistics.component';
import {UserRankComponent} from "./user-rank/user-rank.component";
import {ActiveUserComponent} from "./active-user/active-user.component";
import { SingleSvsDetailsComponent } from './single-svs-details/single-svs-details.component';


const routes: Routes = [
   {path: "fastsvs/home", pathMatch: "full", component: HomeComponent},
   {path: "fastsvs/tot", pathMatch: "full", component: TotStatisticsComponent},
   {path: "fastsvs/rank", pathMatch: "full", component: UserRankComponent},
   {path: "fastsvs/singleSvs", pathMatch: "full", component: SingleSvsDetailsComponent},
   {path: "fastsvs", redirectTo: "fastsvs/home", pathMatch: "full"},
   {path: "fastsvs/activeUser", pathMatch: "full", component: ActiveUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

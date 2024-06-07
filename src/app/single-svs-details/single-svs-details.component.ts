import { Component, OnInit } from '@angular/core';
import {ChartTypes} from "../component/chart-container.component";

@Component({
   selector: "single-svs-details",
   templateUrl: "single-svs-details.html"
})
export class SingleSvsDetailsComponent {
   ChartTypes = ChartTypes;
}
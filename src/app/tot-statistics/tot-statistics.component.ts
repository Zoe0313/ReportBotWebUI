import { Component, OnInit } from '@angular/core';
import {DateRangeData} from "../component/date-range-picker.component";
import {FastSvsRecordsService} from '../service/fastsvs-records.service';

@Component({
  selector: 'app-tot-statistics',
  templateUrl: './tot-statistics.component.html',
  styleUrls: ['./tot-statistics.component.scss']
})
export class TotStatisticsComponent implements OnInit {

   loading: boolean = false;

   chartOptions: any = null;

   constructor(private service: FastSvsRecordsService) { }

   ngOnInit() {

   }

   onDateRangeChange = (dateRange: DateRangeData) => {
      this.fetch(dateRange);
   }

   private fetch(dateRange: DateRangeData) {
      const params: any = {
         start: dateRange.from,
         end: dateRange.to
      };

      this.loading = true;
      this.chartOptions = null;
      this.service.getTotData(params)
            .then(totData => {
               this.loading = false;
               this.chartOptions = this.getChartOptions(totData);
               console.log(JSON.stringify(this.chartOptions));
            })
            .catch(err => {
               this.loading = false;
               console.error(err);
            });
   }

   private getChartOptions(totData: any) {
      let total: number = totData.total;
      let tot: number = totData.tot;
      return {
         chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        credits: {
          enabled: false,
        },
        title: {
            text: 'syncto-tot statistics'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'FastSVS',
                y: parseFloat(((total - tot)/total).toFixed(2)),
                sliced: true,
                selected: true
            }, {
                name: 'TOT',
                y: parseFloat(((tot)/total).toFixed(2))
            }]
        }]
      }
   }

}

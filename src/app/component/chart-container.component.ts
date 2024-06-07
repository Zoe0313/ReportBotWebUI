import { Component, EventEmitter, OnInit, ViewChild, Input, Output } from '@angular/core';
import {FastSvsRecordsService} from '../service/fastsvs-records.service';
import {ChartComponent} from "angular2-highcharts";
import {DateRangeData} from "./date-range-picker.component";

@Component({
   selector: "chart-container",
   templateUrl: "./chart-container.html",
   styleUrls: ["chart-container.scss"]
})
export class ChartContainer implements OnInit {
   @Output()
   clickOnPoint: EventEmitter<PointData | ErrorFilter> = new EventEmitter<PointData | ErrorFilter>();

   /**
    * HighCharts component
    */
   @ViewChild(ChartComponent, {static: false})
   chartComponent: ChartComponent;

   /**
    * Chart configuration object
    */
   options: Highcharts.Options[];

   userFilter: string;

   private _selectedChart: ChartTypes;

   @Input()
   set selectedChart(val: ChartTypes) {
      if (+val !== this._selectedChart) {
         this._selectedChart = +val;
         this.selectedViewType = ViewType.CHART;
      }
      this.loading = false;
      this.loadChart();
   }

   get selectedChart(): ChartTypes {
      return this._selectedChart;
   }

   availableCharts = [
      {
         text: "FastSVS Candidates Trend",
         value: ChartTypes.FASTSVS_CANDIDATE_RADIO,
      },
      {
         text: "FastSVS ratio Daily Trend of vSAN team",
         value: ChartTypes.VSAN_TREND,
      },
      {
         text: "FastSVS Daily Trend by Team",
         value: ChartTypes.TEAM_DAILY_TREND,
      },
      {
         text: "vSAN2 FastSVS Daily Trend",
         value: ChartTypes.VSAN2_TREND,
      }
      // {
      //    text: "FastSVS Total Number by Team",
      //    value: ChartTypes.TEAM_TOTAL,
      // },
      // {
      //    text: "FastSVS vs Original SVS (Detailed Step Duration)",
      //    value: ChartTypes.FAST_ORIGINAL_COMPARISON,
      // },
      // {
      //    text: "SVS Duration Ratio",
      //    value: ChartTypes.DURATION_RATIO,
      // },
      // {
      //    text: "Error Report",
      //    value: ChartTypes.ERROR_REPORT
      // }
   ];

   availableViewType = [{
      text: "Chart",
      value: ViewType.CHART
   }, {
      text: "Datagrid",
      value: ViewType.GRID
   }];

   selectedViewType: ViewType = ViewType.CHART;

   loading: boolean = false;

   ViewType = ViewType;

   constructor(private service: FastSvsRecordsService) {}

   ngOnInit() {
      if (!this.selectedChart) {
         this.selectedChart = ChartTypes.FASTSVS_CANDIDATE_RADIO;
      }
   }

   get isCandidateChart(): boolean {
      return this.selectedChart === ChartTypes.FASTSVS_CANDIDATE_RADIO;
   }

   get isVsan2Chart(): boolean {
      return this.selectedChart === ChartTypes.VSAN2_TREND;
   }

   get datePickerRequired(): boolean {
      return this.selectedChart === ChartTypes.TEAM_DAILY_TREND ||
            this.selectedChart === ChartTypes.TEAM_TOTAL ||
            this.selectedChart === ChartTypes.VSAN_TREND ||
            this.selectedChart === ChartTypes.FASTSVS_CANDIDATE_RADIO ||
            this.selectedChart === ChartTypes.VSAN2_TREND ||
            this.selectedChart === ChartTypes.ERROR_REPORT;
   }

   get isSvsStepsCompare(): boolean {
      return this.selectedChart === ChartTypes.FAST_ORIGINAL_COMPARISON;
   }

   get isSingleSvsStepsDetail(): boolean {
      return this.selectedChart === ChartTypes.SINGLE_SVS_STEPS;
   }

   fastsvs: string;
   originalsvs: string;

   vsan2Data: any;
   candidateData: any;

   vsan2DataOnSelectedDate: any[];
   candidateDataOnSelectedDate: any[];

   private loadChart = () => {
      this.options = [];
      this.getGroupsMetricsByDateRange(null);
   }

   private async loadVsan2Trend() {
      this.loading = true;
      try {
         const params: any = {
            users: this.userFilter,
            start: this._currentDateRange.from,
            end: this._currentDateRange.to,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
         };

         const formatOpts = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
         };

         let result = await this.service.getVsan2Trend(params);
         this.vsan2Data = result;

         let series = {};
         result.forEach(dailyData => {
            const date = new Date(dailyData.date).toLocaleDateString("en", formatOpts);
            let data = series[date] || {total: 0, fastsvs: 0, notSupported: 0, candidate: 0};
            data.total += dailyData.total;
            data.fastsvs += dailyData.fastsvs;
            data.notSupported += dailyData.notSupported;
            data.candidate = (data.total - data.fastsvs - data.notSupported);
            series[date] = data;
         });

         const options: any = this.getGroupChartOptions([]);
         options.chart.type = "line";
         options.chart.zoomType = "x";
         options.title = {text: this.userFilter ? `vSAN2 statistics of ${this.userFilter}` : 'vSAN2 statistics'};
         options.yAxis = {
            title: {
               text: 'vSAN2 statistics'
            }
         };
         options.xAxis["categories"] = this.generateLabelsFromRange(params.start, params.end);
         options.xAxis["plotBands"] = this.generateWorkingDayPlotBands(params.start, params.end);
         options.plotOptions.series.point.events.click = (event) => {
            this.vsan2DataOnSelectedDate = this.getDailyDataOnSelectedPoint(event.point.category, this.vsan2Data);
         };
         options.series = [];

         // build the data series, follow the order of the xAxis categories
         const vsan2Series = [], candidateSeries = [], notSupportedSeries = [];
         options.xAxis["categories"].forEach(key => {
            const item = series[key];
            if (!item) {
               vsan2Series.push(0);
               candidateSeries.push(0);
               notSupportedSeries.push(0);
            } else {
               vsan2Series.push(item.fastsvs);
               candidateSeries.push(item.candidate);
               notSupportedSeries.push(item.notSupported);
            }
         });

         options.series.push({
            name: "FastSVS",
            data: vsan2Series
         });
         options.series.push({
            name: "Can be FastSVS",
            data: candidateSeries
         });
         options.series.push({
            name: "Not Supported",
            data: notSupportedSeries
         });
         options.legend = {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
         };
         this.options = [options];
         this.loading = false;
      } catch(error) {
         console.log(error);
      } finally {
         this.loading = false;
      }
   }

   private loadCandidateTrend = async () => {
      this.loading = true;
      try {
         const params: any = {
            users: this.userFilter,
            start: this._currentDateRange.from,
            end: this._currentDateRange.to,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
         };

         const formatOpts = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
         };

         let result = await this.service.getCandidateRatio(params);
         this.candidateData = result;
         let series = {};
         result.forEach(dailyData => {
            const date = new Date(dailyData.date).toLocaleDateString("en", formatOpts);
            let data = series[date] || {};
            data.notSupported = data.notSupported || 0, data.canBeFastSvs = data.canBeFastSvs || 0, data.fastsvs = data.fastsvs || 0;
            data.canBeFastSvs += dailyData.canBeFastSvs;
            data.fastsvs += dailyData.fastsvs;
            data.notSupported += dailyData.notSupported;
            series[date] = data;
         });
         const options: any = this.getGroupChartOptions([]);
         options.chart.type = "line";
         options.chart.zoomType = "x";
         options.title = {text: this.userFilter ? `SVS statistics of ${this.userFilter}` : 'SVS statistics of vSAN team'};
         options.yAxis = {
            title: {
               text: 'SVS statistics'
            }
         };
         options.xAxis["categories"] = this.generateLabelsFromRange(params.start, params.end);
         options.xAxis["plotBands"] = this.generateWorkingDayPlotBands(params.start, params.end);
         options.plotOptions.series.point.events.click = (event) => {
            this.candidateDataOnSelectedDate = this.getDailyDataOnSelectedPoint(event.point.category, this.candidateData);
         };
         options.series = [];

         // build the data series, follow the order of the xAxis categories
         const fastsvsSeries = [], candidateSeries = [], notSupportedSeries = [];
         options.xAxis["categories"].forEach(key => {
            const item = series[key];
            if (!item) {
               fastsvsSeries.push(0);
               candidateSeries.push(0);
               notSupportedSeries.push(0);
            } else {
               fastsvsSeries.push(item.fastsvs);
               candidateSeries.push(item.canBeFastSvs);
               notSupportedSeries.push(item.notSupported);
            }
         });

         options.series.push({
            team: "vsan",
            name: "FastSVS",
            data: fastsvsSeries
         });
         options.series.push({
            team: "vsan",
            name: "Can be FastSVS",
            data: candidateSeries
         });
         options.series.push({
            team: "vsan",
            name: "Not supported",
            data: notSupportedSeries
         });
         options.legend = {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
         };
         options.tooltip = {
            formatter: function () {
               let s = "<strong>" + this.x + "</strong><br/>";
               /**
                * this.points is the attribute from the highchart object
                */
               this.points.forEach((point): void => {
                  s += "<br/>" + point.series.name + ": " + point.y;
               });
               return s;
            },
            shared: true,
         };
         this.options = [options];
         this.loading = false;
      } catch(error) {
         console.log(error);
      }
   };

   private getDailyDataOnSelectedPoint = (date, dataSet): any[] => {
      const formatOpts = {
         year: "numeric",
         month: "2-digit",
         day: "2-digit",
         timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      return dataSet.filter(dailyData => date === new Date(dailyData.date).toLocaleDateString("en", formatOpts));
   }

   private loadDurationRatio = async () => {
      this.loading = true;
      let fullSvsTimeRatioData: any = null;
      let svsDeployTimeRatio: any = null;
      try {
         [fullSvsTimeRatioData, svsDeployTimeRatio] = await Promise.all([
            this.service.getDurationRatio(),
            this.service.getSvsDeployDurationRatio()
         ]);
         console.log("svsDeployTimeRatio = ", svsDeployTimeRatio);
         let fullTimeChartOptions = this.getRatioChartOptions(fullSvsTimeRatioData);
         fullTimeChartOptions.tooltip = {
               formatter: function () {
                  let s = "<strong>" + this.x + "</strong><br/>";
                  /**
                   * this.points is the attribute from the highchart object
                   */
                  this.points.forEach((point): void => {
                     s += "<br/>" + point.series.name + ": " + (point.y * 100 + "%");
                  });
                  return s;
               },
               shared: true,
            };
         let suiteTimeChartOptions = this.getRatioChartOptions(svsDeployTimeRatio);
         suiteTimeChartOptions.title.text = "SVS Time Duration (Without case execution time) Ratio"
         suiteTimeChartOptions.tooltip = {
               formatter: function () {
                  let s = "<strong>" + this.x + "</strong><br/>";
                  /**
                   * this.points is the attribute from the highchart object
                   */
                  this.points.forEach((point): void => {
                     s += "<br/>" + point.series.name + ": " + ((point.y * 100).toFixed(0) + "%");
                  });
                  return s;
               },
               shared: true,
            };
         this.options = [fullTimeChartOptions, suiteTimeChartOptions];
         this.loading = false;
      } catch(error) {
         this.loading = false;
         console.log(error);
      }
   };

   private getRatioChartOptions = (result: any): any => {
      let categories: string[] = Object.keys(result.fast);

      return {
         chart: {
             type: 'line'
         },
         title: {
             text: 'FastSVS vs Original SVS Time Duration Ratio'
         },
         xAxis: {
             categories: categories
         },
         yAxis: {
             title: {
                 text: 'Percentage'
             },
             max: 1,
             labels: {
                 formatter: function (){
                    return this.value * 100 + "%";
                 },
              },
         },
         plotOptions: {
             line: {
                 dataLabels: {
                     enabled: true,
                     formatter: function() {
                        return Math.floor(this.y * 100) + "%";
                     }
                 }
             }
         },
         credits: {
            enabled: false
         },
         series: [{
             name: 'FastSVS',
             data: categories.map(key => result.fast[key])
         }, {
             name: 'Original SVS',
             data: categories.map(key => result.original[key])
         }]
     }
   };

   private loadErrorStatistics = () => {
      this.loading = true;
      const params: any = {
         start: this._currentDateRange.from,
         end: this._currentDateRange.to,
         timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      this.service.getErrors(params).then(data => {
         const options: Highcharts.Options = this.getGroupChartOptions(data);
         // delete(options.plotOptions.series.point);
         options.plotOptions.series.point.events.click = (event) => {
            this.clickOnPoint.emit({
               start: this._currentDateRange.from,
               end: this._currentDateRange.to,
               error: event.point.name
            });
         }
         options.title = {text: 'FastSVS Error Statistics'};
         options.yAxis = {title: {
            text: 'Error Count'
         }};
         let otherErrCount: number = 0;
         otherErrCount = data.filter(item => item["_id"].length < 5).reduce((sum: number, item) => {
               sum += parseInt(item["count"]);
               return sum;
            }, 0);
         data.push({_id: "E_OTHERS", count: otherErrCount});
         options.series = [{
            type: "column",
            name: "Errors",
            colorByPoint: true,
            data: data.map(r => {
               return {
                  "name": r["_id"],
                  "y": r["count"]
               }
            }).filter(item => item.name.length > 3)
         }];
         this.options = [options];
         this.loading = false;
      });
   }

   private loadTeamTotalChart = (params: any) => {
      this.loading = true;
      this.service.getGroups(params).then(data => {
         const options: Highcharts.Options = this.getGroupChartOptions(data);
         delete(options.plotOptions.series.point);
         options.title = {text: 'FastSVS Total Records By Team'};
         options.yAxis = {
            title: {
               text: 'FastSVS Count'
            }
         };
         options.series = [{
             name: "Errors",
             type: "column",
             colorByPoint: true,
             data: data.map(r => {
               return {
                  "name": r["_id"],
                  "y": r["count"]
               }
            })
         }];
         this.options = [options];
         this.loading = false;
      });
   };

   private loadVsanTrendChart = (params: any) => {
      this.loading = true;
      this.service.getSvsVsanTrend(params).then(data => {
         const options: any = this.getGroupChartOptions(data);
         options.chart.type = "line";
         options.chart.zoomType = "x";
         options.title = {text: 'FastSVS Daily Ratio of vSAN team'};
         options.yAxis = {
            title: {
               text: 'FastSVS Ratio'
            }
         };
         options.xAxis["categories"] = this.generateLabelsFromRange(params.start, params.end);
         options.xAxis["plotBands"] = this.generateWorkingDayPlotBands(params.start, params.end);
         options.plotOptions.series.dataLabels = {
            enabled: true,
            format: '{point.y}%'
         }
         options.plotOptions.series.point.events = null;
         options.series = [];

         // build the data series, follow the order of the xAxis categories
         const dataSeries = [];
         options.xAxis["categories"].forEach(key => {
            const item = data[key];
            if (!item) {
               dataSeries.push(null);
            } else {
               dataSeries.push(parseFloat((item.fastsvs/item.total * 100).toFixed(0)));
            }
         });

         options.series.push({
            team: "vsan",
            name: "FastSVS",
            data: dataSeries
         });
         options.legend = {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
         };
         options.tooltip = {
            formatter: function () {
               let s = "<strong>" + this.x + "</strong><br/>";
               /**
                * this.points is the attribute from the highchart object
                */
               this.points.forEach((point): void => {
                  s += "<br/>" + point.series.name + ": " + point.y + "%";
               });
               return s;
            },
            shared: true,
         };
         this.options = [options];
         this.loading = false;
      });
   };

   private loadTrendChart = async (params: any) => {
      this.loading = true;
      let data: any, teams: string[];
      [data, teams] = await Promise.all([this.service.getGroupsTrend(params),
         this.service.getTeamList()
      ]);
      const options: any = this.getGroupChartOptions(data);
      options.chart.type = "line";
      options.chart.zoomType = "x";
      options.title = {text: 'FastSVS Daily Trend By Team'};
      options.yAxis = {
         title: {
            text: 'FastSVS Count'
         }
      };
      options.xAxis["categories"] = this.generateLabelsFromRange(params.start, params.end);
      options.xAxis["plotBands"] = this.generateWorkingDayPlotBands(params.start, params.end);
      options.series = [];

      // build the data series, follow the order of the xAxis categories
      const dataSeries = {};
      options.xAxis["categories"].forEach(key => {
         console.log("key = ", key);
         console.log("data[key] = ", data[key]);
         const item = data[key] || [];
         teams.forEach(group => {
            let groupSeriesdata = dataSeries[group] || [];
            let groupData = item.find(groupData => groupData["_id"] === group);
            groupSeriesdata.push(groupData ? groupData["count"] : 0);
            dataSeries[group] = groupSeriesdata;
         });
      });

      console.log("dataSeries = ", dataSeries)
      Object.keys(dataSeries).forEach(group => {
         options.series.push({
            name: group,
            data: dataSeries[group]
         })
      });
      console.log("options.series = ", options.series);
      options.legend = {
         layout: 'vertical',
         align: 'right',
         verticalAlign: 'middle'
      };
      options.tooltip = {
         formatter: function () {
            let s = "<strong>" + this.x + "</strong><br/>";
            /**
             * this.points is the attribute from the highchart object
             */
            this.points.forEach((point): void => {
               s += "<br/>" + point.series.name + ": " + point.y;
            });
            return s;
         },
         shared: true,
      };
      this.options = [options];
      this.loading = false;
   };

   loadCompareCharts = () => {
      this.options = [];
      let chartDataRequests: Promise<any>[] = [];
      if (window.localStorage.getItem(this.fastsvs)) {
         let fastsvsResult: any = JSON.parse(window.localStorage.getItem(this.fastsvs));
         setTimeout(() => {
               this.options.push(this.getDetailedTimeDurationChartOptions(fastsvsResult, true));
            }, 1000);
      } else {
         chartDataRequests.push(
            this.service.getSvsTimeDetail(this.fastsvs).then(result => {
               window.localStorage.setItem(this.fastsvs, JSON.stringify(result));
               return this.getDetailedTimeDurationChartOptions(result, true);
            })
         );
      }
      if (this.originalsvs) {
         if (window.localStorage.getItem(this.originalsvs)) {
            let originalResult: any = JSON.parse(window.localStorage.getItem(this.originalsvs));
            setTimeout(() => {
                  this.options.push(this.getDetailedTimeDurationChartOptions(originalResult, false));
               }, 1000);
         } else {
            chartDataRequests.push(
               this.service.getSvsTimeDetail(this.originalsvs).then(result => {
                  window.localStorage.setItem(this.originalsvs, JSON.stringify(result));
                  return this.getDetailedTimeDurationChartOptions(result, false);
               })
            );
         }
      }
      if (chartDataRequests.length) {
         this.loading = true;
         Promise.all(chartDataRequests).then(results => {
            this.options.push(...results);
            this.loading = false;
         }).catch(err => {
            this.loading = false;
            console.log(err);
         });
      }
   };

   private getTimeDuration = (time1: number, time2: number) => {
      let period = time2 - time1;
      let hours = Math.floor(period / (60 * 60 * 1000));
      let minutes = Math.floor((period % (60 * 60 * 1000)) / (60 * 1000));
      let seconds = ((period % (60 * 60 * 1000)) % (60 * 1000)) / 1000;
      return `${hours}h ${minutes}m ${seconds}s`;
   }

   private getDetailedTimeDurationChartOptions = (result: any, isFastSvs: boolean): any => {
      let total = result.series[result.series.length - 1];
      return {
            chart: {
               type: 'xrange'
            },
            title: {
               text: (isFastSvs ? "FastSVS" : "Normal SVS") + ": Total running time " + this.getTimeDuration(total.x, total.x2)
            },
            accessibility: {
               point: {
                     descriptionFormatter: function (point) {
                        var ix = point.index + 1,
                           category = point.yCategory,
                           from = new Date(point.x),
                           to = new Date(point.x2);
                        return ix + '. ' + category + ', ' + from.toDateString() +
                           ' to ' + to.toDateString() + '.';
                     }
               }
            },
            xAxis: {
               type: 'datetime',
               tickInterval: 30 * 60 * 1000
            },
            yAxis: {
               title: {
                     text: ''
               },
               categories: result.categories,
               reversed: true,
               labels: {
                  useHTML: true,
                  formatter: function() {
                     return "<div style='width: 200px;font-size: 12px;white-space: pre-wrap'>" + this.value + "</div>"
                  }
               }
            },
            series: [{
               name: isFastSvs ? 'FastSVS' : "Normal SVS",
               borderColor: 'gray',
               pointWidth: 10,
               data: result.series,
               dataLabels: {
                     enabled: false
               }
            }],
            credits: {
               enabled: false,
            }
         };
   };

   private _currentDateRange: DateRangeData;

   getGroupsMetricsByDateRange(dateRange: DateRangeData) {
      if (this.loading) {
         return;
      }
      if (dateRange) {
         this._currentDateRange = dateRange;
      }
      if (!this._currentDateRange) {
         return;
      }
      const params: any = {
         start: this._currentDateRange.from,
         end: this._currentDateRange.to,
         timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      if (this.selectedChart === ChartTypes.TEAM_TOTAL) {
         this.loadTeamTotalChart(params);
      } else if (this.selectedChart === ChartTypes.TEAM_DAILY_TREND) {
         this.loadTrendChart(params);
      } else if (this.selectedChart === ChartTypes.ERROR_REPORT) {
         this.loadErrorStatistics();
      } else if (this.selectedChart === ChartTypes.VSAN_TREND) {
         this.getVsanTrendMetricsByDateRange(dateRange);
      } else if (this.selectedChart === ChartTypes.FASTSVS_CANDIDATE_RADIO) {
         this.loadCandidateTrend();
      } else if (this.selectedChart === ChartTypes.VSAN2_TREND) {
         this.loadVsan2Trend();
      }
   }

   getVsanTrendMetricsByDateRange(dateRange: DateRangeData) {
      if (this.loading) {
         return;
      }
      if (dateRange) {
         this._currentDateRange = dateRange;
      }
      if (!this._currentDateRange) {
         return;
      }
      const params: any = {
         start: this._currentDateRange.from,
         end: this._currentDateRange.to,
         timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      this.loadVsanTrendChart(params);
   }

   private generateLabelsFromRange(from: number, to: number): string[] {
      const formatOpts = {
         year: "numeric",
         month: "2-digit",
         day: "2-digit",
         timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      let start = new Date(from);
      let end = new Date(to);
      // remove the year if the date range is in the current year
      // if (start.getFullYear() === end.getFullYear() && start.getFullYear() === new Date().getFullYear()) {
      //    delete(formatOpts.year);
      // }
      let result: string[] = [];
      while(start < end) {
         result.push(start.toLocaleDateString("en", formatOpts))
         start.setDate(start.getDate() + 1);
      }
      return result;
   }

   private generateWorkingDayPlotBands(from: number, to: number): any[] {
      let start = new Date(from);
      let end = new Date(to);
      let bands: any[] = [];
      let index: number = 0;
      while (start < end) {
         let plotBand = {color: "#FED"};
         // The plot band starts from [Sun, Mon, Tue, Wed, Thur]
         while (start.getDay() >= 5 || start.getDay() == 0) {
            index++;
            start.setDate(start.getDate() + 1);
         }
         if (start >= end) {
            break;
         }
         plotBand["from"] = index;
         while(start.getDay() <= 4 && start < end) {
            index++;
            start.setDate(start.getDate() + 1);
         }
         plotBand["to"] = index;
         bands.push(plotBand);
      }
      return bands;
   }

   private getGroupChartOptions(data: any[]): Highcharts.Options {
      let options: Highcharts.Options = {
        chart: {
            type: 'column',
        },
        credits: {
          enabled: false,
        },
        xAxis: {
            type: 'category'
        },
        tooltip: {
            pointFormat: '<br><span>FastSVS Count</span>: <b>{point.y}</b><br/>'
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                },
                point: {
                  events: {
                    click: (event) => {
                       const category: string = event.point["category"] + "";
                       const selectedDate: Date = new Date(category.length === 5 ? new Date().getFullYear() + "/" + category : category);
                       console.log("event.point.series = ", event.point.series);
                       this.clickOnPoint.emit({
                          date: selectedDate,
                          team: event.point.series["team"] || event.point.series.name
                       });
                    }
                  }
                }
            }
        }
      };
      return options;
   }

   getChartWidth(index: number): number {
      if (this.options.length === 1) {
         return 1200;
      }
      if (index === 0) {
         return 500;
      }
      return 700;
   }
}

export interface PointData {
   date: Date;
   team: string;
}

export interface ErrorFilter {
   start: number;
   end: number;
   error: string;
}

export enum ChartTypes {
   VSAN_TREND,
   TEAM_DAILY_TREND,
   TEAM_TOTAL,
   ERROR_REPORT,
   DURATION_RATIO,
   FAST_ORIGINAL_COMPARISON,
   SINGLE_SVS_STEPS,
   FASTSVS_CANDIDATE_RADIO,
   VSAN2_TREND
}

export enum ViewType {
   CHART,
   GRID
}
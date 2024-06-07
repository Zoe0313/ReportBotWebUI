(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/active-user/active-user.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/active-user/active-user.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1>\n   Active user in last 30 days ({{results?.length}})\n</h1>\n<ng-container *ngIf=\"loading\">\n   <span class=\"spinner spinner-inline\">\n      Loading...\n  </span>\n  <span>\n      Loading...\n  </span>\n</ng-container>\n\n<ul class=\"list-unstyled\" *ngIf=\"!loading\">\n   <li *ngFor=\"let userData of results\" class=\"clr-row\">\n      <span class=\"clr-col-1\">{{userData[\"_id\"]}}</span>\n      <span class=\"clr-col-2\">{{userData[\"count\"]}}</span>\n   </li>\n</ul>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<router-outlet></router-outlet>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/chart-container.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/component/chart-container.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div id=\"groups-chart\">\n   <form clrForm clrLayout=\"horizontal\">\n      <clr-select-container *ngIf=\"!isSingleSvsStepsDetail\">\n         <label>Show Chart: </label>\n         <select clrSelect name=\"supported-charts\" id=\"supported-charts\" [(ngModel)]=\"selectedChart\">\n           <option *ngFor=\"let option of availableCharts\" [value]=\"option.value\">{{option.text}}</option>\n         </select>\n      </clr-select-container>\n      <clr-input-container *ngIf=\"isCandidateChart\">\n         <label>User Id: </label>\n         <input clrInput name=\"user-filter\" id=\"user-filter\" [(ngModel)]=\"userFilter\">\n      </clr-input-container>\n      <vsan-date-range-picker\n            *ngIf=\"datePickerRequired\"\n            (changeRange)=\"getGroupsMetricsByDateRange($event)\"></vsan-date-range-picker>\n      <div *ngIf=\"isCandidateChart\" class=\"btn-group btn-sm\">\n         <button *ngFor=\"let viewType of availableViewType; let i=index\"\n                 id=\"view-{{i}}\"\n                 class=\"btn\"\n                 [class.btn-primary]=\"viewType.value === selectedViewType\"\n                 (click)=\"selectedViewType = viewType.value\">{{viewType.text}}</button>\n      </div>\n      <div class=\"container\" [class.container-tall]=\"isSingleSvsStepsDetail\" *ngIf=\"!loading && selectedViewType === ViewType.CHART\">\n         <chart *ngFor=\"let chartOption of options\" [options]=\"chartOption\"></chart>\n      </div>\n      <div class=\"container\" *ngIf=\"!loading && selectedViewType === ViewType.GRID\">\n         <svs-statistic-grid-view [dailyData]=\"candidateData\"></svs-statistic-grid-view>\n      </div>\n      <span class=\"spinner spinner-inline\" *ngIf=\"loading\">\n         Loading...\n      </span>\n      <clr-modal *ngIf=\"candidateDataOnSelectedDate\"\n                 [clrModalOpen]=\"candidateDataOnSelectedDate != null\"\n                 [clrModalClosable]=\"false\">\n         <h3 class=\"modal-title\">SVS statistics on {{candidateDataOnSelectedDate[0].date | date:'mediumDate'}}</h3>\n         <div class=\"modal-body\">\n            <svs-statistic-grid-view [dailyData]=\"candidateDataOnSelectedDate\"></svs-statistic-grid-view>\n         </div>\n         <div class=\"modal-footer\">\n             <button type=\"button\" class=\"btn btn-primary\" (click)=\"candidateDataOnSelectedDate = null\">\n                 Close\n             </button>\n         </div>\n      </clr-modal>\n      <clr-modal *ngIf=\"vsan2DataOnSelectedDate\"\n                 [clrModalOpen]=\"vsan2DataOnSelectedDate != null\"\n                 [clrModalClosable]=\"false\">\n         <h3 class=\"modal-title\">vSAN2 statistics on {{vsan2DataOnSelectedDate[0].date | date:'mediumDate'}}</h3>\n         <div class=\"modal-body\">\n            <svs-statistic-grid-view [dailyData]=\"vsan2DataOnSelectedDate\"></svs-statistic-grid-view>\n         </div>\n         <div class=\"modal-footer\">\n             <button type=\"button\" class=\"btn btn-primary\" (click)=\"vsan2DataOnSelectedDate = null\">\n                 Close\n             </button>\n         </div>\n      </clr-modal>\n   </form>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/date-range-picker.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/component/date-range-picker.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"clr-form-control clr-row\">\n   <label class=\"clr-control-label clr-col-12 clr-col-md-2\">Time Range: </label>\n   <div class=\"clr-control-container clr-col-md-10 clr-col-12\">\n      <clr-dropdown id=\"range-dropdown\">\n         <button class=\"dropdown-toggle btn btn-sm btn-link\" clrDropdownToggle>\n            {{currentStateLabel}}\n            <clr-icon shape=\"caret down\"></clr-icon>\n         </button>\n         <clr-dropdown-menu clrPosition=\"bottom-left\">\n            <button clrDropdownItem (click)=\"onRangeLastXDaysClick()\">\n               Last\n            </button>\n            <button clrDropdownItem (click)=\"onRangeCustomClick()\">\n               Custom\n            </button>\n         </clr-dropdown-menu>\n      </clr-dropdown>\n      <div *ngIf=\"currentPickerState === DateRangePickerState.LAST_X_HOURS\"\n           class=\"clr-control-container day-interval-container\"\n           [class.clr-error]=\"invalidInterval\">\n         <div class=\"clr-input-wrapper\">\n            <input id=\"day-interval\"\n                  name=\"day-interval\"\n                  [(ngModel)]=\"dayInterval\"\n                  type=\"number\"\n                  min=\"1\"\n                  max=\"30\"\n                  class=\"clr-input day-interval-input\">\n            <clr-icon class=\"clr-validate-icon\" shape=\"exclamation-circle\"></clr-icon>\n            Days\n         </div>\n      </div>\n      <ng-container *ngIf=\"currentPickerState === DateRangePickerState.CUSTOM_RANGE\">\n         <vsan-datetime-picker id=\"from-date-input\"\n                              [(datetime)]=\"fromDate\"\n                              [errorMessage]=\"fromDateError\"\n                              [disabled]=\"invalidInterval\"\n                              label=\"From\">\n         </vsan-datetime-picker>\n         <vsan-datetime-picker id=\"to-date-input\"\n                              [(datetime)]=\"toDate\"\n                              [errorMessage]=\"toDateError\"\n                              [disabled]=\"invalidInterval\"\n                              label=\"To\">\n         </vsan-datetime-picker>\n      </ng-container>\n      <button id=\"query-range-btn\"\n            (click)=\"onRefreshBtnClick()\"\n            [disabled]=\"disableRefresh\"\n            class=\"btn btn-sm\">\n         Refresh\n      </button>\n   </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/datetime-picker.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/component/datetime-picker.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Label and input filed -->\n<div class=\"horizontal-layout\">\n   <label id=\"datetime-picker-label-{{label}}\"\n          *ngIf=\"label\"\n          for=\"{{label}}\"\n          class=\"clr-control-label datetime-picker-label\">\n      {{label}}\n   </label>\n   <div class=\"clr-control-container\" [class.clr-error]=\"errorMessage\">\n      <div class=\"clr-input-wrapper\">\n         <input clrInput\n                id=\"{{label}}\"\n                ngDefaultControl\n                [(ngModel)]=\"datetime\"\n                [owlDateTime]=\"picker\"\n                [owlDateTimeTrigger]=\"picker\"\n                [selectMode]=\"selectMode\"\n                [placeholder]=\"placeholder\" />\n         <clr-icon class=\"clr-validate-icon\" shape=\"exclamation-circle\"></clr-icon>\n      </div>\n      <span class=\"clr-subtext\" *ngIf=\"errorMessage\">{{errorMessage}}</span>\n   </div>\n</div>\n<!-- Data and time picker -->\n<owl-date-time #picker ngDefaultControl [disabled]=\"disabled\" [firstDayOfWeek]=\"0\" [pickerType]=\"'calendar'\"></owl-date-time>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/grid-view.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/component/grid-view.html ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<clr-datagrid>\n   <clr-dg-column>\n      User\n      <clr-dg-string-filter [clrDgStringFilter]=\"userFilter\"></clr-dg-string-filter>\n   </clr-dg-column>\n   <clr-dg-column>Can Be FastSVS</clr-dg-column>\n   <clr-dg-column>Not Supported</clr-dg-column>\n   <clr-dg-column>FastSVS</clr-dg-column>\n\n   <clr-dg-row *clrDgItems=\"let record of gridData\">\n       <clr-dg-cell>{{record.user}}</clr-dg-cell>\n       <clr-dg-cell>\n          <div>Total: {{record.candidate}} records</div>\n          <div *ngIf=\"record.candidate > 0\" class=\"links-container\">\n            <a *ngFor=\"let svs of record.fastsvsCandidatesIds\"\n               href=\"https://svs.eng.vmware.com/api/v1.1/patchesapi/{{svs}}\"\n               target=\"_blank\">{{svs}}</a>\n          </div>\n       </clr-dg-cell>\n       <clr-dg-cell>\n         <div>Total: {{record.notSupported}} records</div>\n         <div *ngIf=\"record.notSupported > 0\" class=\"links-container\">\n           <a *ngFor=\"let svs of record.notSupportedIds\"\n              href=\"https://svs.eng.vmware.com/api/v1.1/patchesapi/{{svs}}\"\n              target=\"_blank\">{{svs}}</a>\n         </div>\n       </clr-dg-cell>\n       <clr-dg-cell>\n         <div>Total: {{record.fastsvsIds?.length}} records</div>\n         <div *ngIf=\"record.fastsvsIds?.length > 0\" class=\"links-container\">\n           <a *ngFor=\"let svs of record.fastsvsIds\"\n              href=\"https://svs.eng.vmware.com/api/v1.1/patchesapi/{{svs}}\"\n              target=\"_blank\">{{svs}}</a>\n         </div>\n       </clr-dg-cell>\n   </clr-dg-row>\n\n   <clr-dg-footer>{{gridData.length}} users</clr-dg-footer>\n</clr-datagrid>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/records.html":
/*!******************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/component/records.html ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<clr-datagrid (clrDgRefresh)=\"refresh($event)\" [clrDgLoading]=\"loading\" class=\"datagrid\">\n   <clr-dg-column>CLN</clr-dg-column>\n   <clr-dg-column>User</clr-dg-column>\n   <clr-dg-column>Type</clr-dg-column>\n   <clr-dg-column>SVS</clr-dg-column>\n   <clr-dg-column>Team</clr-dg-column>\n   <clr-dg-column>Branch</clr-dg-column>\n   <clr-dg-column>Time</clr-dg-column>\n   <clr-dg-column>Command</clr-dg-column>\n   <clr-dg-column>\n      <ng-container *clrDgHideableColumn=\"{hidden: true}\">\n         FastSVS Launched\n      </ng-container>\n   </clr-dg-column>\n   <clr-dg-row *ngFor=\"let record of records\">\n      <clr-dg-cell>\n            <a *ngIf=\"isClnValid(record.cln)\"\n               href=\"https://p4web.eng.vmware.com/{{record.cln}}?ac=10\"\n               target=\"_blank\">{{record.cln}}</a>\n            <ng-container *ngIf=\"!isClnValid(record.cln)\">{{record.cln}}</ng-container>\n      </clr-dg-cell>\n      <clr-dg-cell>{{record.user}}</clr-dg-cell>\n      <clr-dg-cell>{{record.type}}</clr-dg-cell>\n      <clr-dg-cell>\n         <span *ngIf=\"record.originSvs\">New SVS: </span>\n         <a *ngIf=\"isClnValid(record.svsid)\"\n            href=\"https://svs.esp.eng.vmware.com/#/svs/patches/{{record.svsid}}/overview\"\n            target=\"_blank\">{{record.svsid}}</a>\n         <ng-container *ngIf=\"!isClnValid(record.svsid)\">{{record.svsid}}</ng-container>\n         <div *ngIf=\"record.originSvs\">\n            Origin SVS: <a *ngIf=\"isClnValid(record.originSvs)\"\n            href=\"https://devhub.eng.vmware.com/#/svs/patches/{{record.originSvs}}\"\n            target=\"_blank\">{{record.originSvs}}</a>\n         </div>\n      </clr-dg-cell>\n\n      <clr-dg-cell>{{record.team}}</clr-dg-cell>\n      <clr-dg-cell>{{record.branch}}</clr-dg-cell>\n      <clr-dg-cell>{{record.timestamp | date: 'medium'}}</clr-dg-cell>\n      <clr-dg-cell>\n         <clr-signpost *ngIf=\"record.runCmd\">\n            <button class=\"btn btn-link btn-sm\" clrSignpostTrigger>\n               Show Command\n            </button>\n            <clr-signpost-content [clrPosition]=\"'left-bottom'\" *clrIfOpen>\n                {{getCommandText(record.runCmd)}}\n            </clr-signpost-content>\n         </clr-signpost>\n      </clr-dg-cell>\n      <clr-dg-cell [style.backgroundColor]=\"getColorIndicator(record.errorCode)\" class=\"status-cell\">\n          <div *ngIf=\"isErrorRecord(record.errorCode); else success\">\n             failed\n             <div>error code: {{record.errorCode}}</div>\n             <div *ngIf=\"record.subErrCode\">subError Code: {{record.subErrCode}}</div>\n          </div>\n      </clr-dg-cell>\n   </clr-dg-row>\n   <clr-dg-footer>\n       {{pagination.firstItem + 1}} - {{pagination.lastItem + 1}}\n       of {{total}} records\n       <clr-dg-pagination #pagination\n                          [clrDgPageSize]=\"100\"\n                          [clrDgTotalItems]=\"total\"\n                          [(clrDgPage)]=\"currentPageIndex\"></clr-dg-pagination>\n   </clr-dg-footer>\n</clr-datagrid>\n<ng-template #success>\n   <div>succeeded</div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/user-filter.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/component/user-filter.html ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<form clrForm clrLayout=\"horizontal\">\n   <div class=\"clr-row\">\n      <clr-input-container>\n         <label class=\"clr-col-md-5\">User Filter: </label>\n         <input clrInput class=\"clr-col-md-7\" placeholder=\"user id\" name=\"user-filter\" [(ngModel)]=\"username\" />\n      </clr-input-container>\n      <clr-input-container>\n         <label class=\"clr-col-md-5\">Team Filter: </label>\n         <input clrInput class=\"clr-col-md-5\" placeholder=\"team name\" name=\"team-filter\" [(ngModel)]=\"team\" />\n      </clr-input-container>\n      <clr-input-container>\n         <label class=\"clr-col-md-5\">Branch Filter: </label>\n         <input clrInput class=\"clr-col-md-5\" placeholder=\"branch name\" name=\"branch-filter\" [(ngModel)]=\"branch\" />\n      </clr-input-container>\n      <button class=\"btn btn-sm btn-link\" (click)=\"filterChange()\">Filter</button>\n   </div>\n   <clr-toggle-container>\n      <label class=\"clr-col-md-1\">Include test records</label>\n      <clr-toggle-wrapper>\n         <input type=\"checkbox\"\n                clrToggle\n                id=\"includeTestRecords\"\n                name=\"includeTestRecords\"\n                [(ngModel)]=\"includeTestRecords\"\n                (change)=\"filterChange()\" />\n         <label></label>\n      </clr-toggle-wrapper>\n   </clr-toggle-container>\n   <div class=\"clr-row\" *ngIf=\"userFilter || teamFilter || dateFilter || branchFilter\">\n      <div class=\"clr-form-control\">\n         <label class=\"clr-col-4 clr-control-label\">Applied Filter:</label>\n         <div class=\"clr-col-8\">\n            <button class=\"label label-light-blue btn-link\"\n                    *ngIf=\"userFilter\"\n                    (click)=\"dropFilter('', teamFilter, branchFilter, dateFilter)\">\n               user:\n               <span class=\"badge badge-light-blue\">{{userFilter}}</span>\n               <clr-icon shape=\"times\"\n                         class=\"btn-close\">\n               </clr-icon>\n            </button>\n            <button class=\"label label-light-blue btn-link\"\n                    *ngIf=\"teamFilter\"\n                    (click)=\"dropFilter(userFilter, '', branchFilter, dateFilter)\">\n               team:\n               <span class=\"badge badge-light-blue\">{{teamFilter}}</span>\n               <clr-icon shape=\"times\"\n                         class=\"btn-close\">\n               </clr-icon>\n            </button>\n            <button class=\"label label-light-blue btn-link\"\n                    *ngIf=\"branchFilter\"\n                    (click)=\"dropFilter(userFilter, teamFilter, '', dateFilter)\">\n               branch:\n               <span class=\"badge badge-light-blue\">{{branchFilter}}</span>\n               <clr-icon shape=\"times\"\n                         class=\"btn-close\">\n               </clr-icon>\n            </button>\n            <button *ngIf=\"dateFilter\"\n                    class=\"label label-light-blue btn-link\"\n                    (click)=\"dropFilter(userFilter, teamFilter, branchFilter, null)\">\n               Date:\n               <span class=\"badge badge-light-blue\">{{dateFilter | date:'mediumDate'}}</span>\n               <clr-icon shape=\"times\"\n                           class=\"btn-close\">\n               </clr-icon>\n            </button>\n         </div>\n      </div>\n   </div>\n </form>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/users.html":
/*!****************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/component/users.html ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"title-section\">\n   <label><a href=\"/fastsvs/activeUser\">Active Users</a> ({{userCount}})</label>\n   <clr-dropdown>\n      <button class=\"btn btn-link btn-sm\" clrDropdownTrigger>\n         <clr-icon shape=\"sort-by\"></clr-icon>\n      </button>\n      <clr-dropdown-menu clrPosition=\"bottom-right\" *clrIfOpen>\n         <label class=\"dropdown-header\" aria-hidden=\"true\">Sort By</label>\n         <button clrDropdownItem\n               (click)=\"load('user')\">User ID</button>\n\n         <button clrDropdownItem\n               (click)=\"load('count')\">Record Count</button>\n      </clr-dropdown-menu>\n   </clr-dropdown>\n</div>\n<ul class=\"list-unstyled\" *ngIf=\"users\">\n   <ng-container *ngFor=\"let user of users | keyvalue: originalOrder\">\n      <li *ngIf=\"isValidUser(user.key)\" class=\"active-user\">\n         <a href=\"javascript:void(0);\" (click)=\"applyUserFilter(user.key)\">{{user.key}}</a>\n         <span>{{user.value}}</span>\n      </li>\n   </ng-container>\n</ul>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.component.html ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<clr-tabs>\n   <clr-tab>\n       <button clrTabLink id=\"records\">FastSVS Records</button>\n       <ng-template [(clrIfActive)]=\"gridTabActive\">\n         <clr-tab-content id=\"records-container\">\n            <user-filter\n                  [userFilter]=\"filterSpec?.user\"\n                  [teamFilter]=\"filterSpec?.team\"\n                  [dateFilter]=\"filterSpec?.date\"\n                  [branchFilter]=\"filterSpec?.branch\"\n                  (userFilterChange)=\"acceptFilter($event)\"></user-filter>\n            <div class=\"record-container\">\n               <fastsvs-records-grid [filterSpec]=\"filterSpec\"></fastsvs-records-grid>\n               <user-list (userClicked)=\"acceptFilter($event)\"></user-list>\n            </div>\n         </clr-tab-content>\n       </ng-template>\n   </clr-tab>\n   <clr-tab>\n       <button clrTabLink id=\"statistics\">Statistics</button>\n       <clr-tab-content *clrIfActive>\n          <chart-container (clickOnPoint)=\"showDetailedPointData($event)\"></chart-container>\n       </clr-tab-content>\n   </clr-tab>\n</clr-tabs>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/single-svs-details/single-svs-details.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/single-svs-details/single-svs-details.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<chart-container [selectedChart]=\"ChartTypes.SINGLE_SVS_STEPS\"></chart-container>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/tot-statistics/tot-statistics.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tot-statistics/tot-statistics.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\n   <form clrForm clrLayout=\"horizontal\">\n      <vsan-date-range-picker\n            (changeRange)=\"onDateRangeChange($event)\">\n      </vsan-date-range-picker>\n\n      <div class=\"container\" *ngIf=\"!loading\">\n         <div style=\"width:700px;\">\n            <chart [options]=\"chartOptions\"></chart>\n         </div>\n      </div>\n      <span class=\"spinner spinner-inline\" *ngIf=\"loading\">\n         Loading...\n      </span>\n   </form>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/user-rank/user-rank.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/user-rank/user-rank.html ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1>\n   Biweekly user rank\n</h1>\n<ng-container *ngIf=\"loading\">\n   <span class=\"spinner spinner-inline\">\n      Loading...\n  </span>\n  <span>\n      Loading...\n  </span>\n</ng-container>\n\n<ul class=\"list-unstyled\" *ngIf=\"!loading\">\n   <li *ngFor=\"let userData of rankData\">\n      <clr-icon [attr.shape]=\"getShape(userData.change)\"\n                class=\"icon-shape is-solid\"\n                [class.green]=\"userData.change >= 0\"\n                [class.red]=\"userData.change < 0\"></clr-icon>\n      {{getRankLabel(userData)}}\n   </li>\n</ul>");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./src/app/active-user/active-user.component.ts":
/*!******************************************************!*\
  !*** ./src/app/active-user/active-user.component.ts ***!
  \******************************************************/
/*! exports provided: ActiveUserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActiveUserComponent", function() { return ActiveUserComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _service_fastsvs_records_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/fastsvs-records.service */ "./src/app/service/fastsvs-records.service.ts");



let ActiveUserComponent = class ActiveUserComponent {
    constructor(service) {
        this.service = service;
    }
    ngOnInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let startTime = new Date();
            startTime.setHours(0);
            startTime.setMinutes(0);
            startTime.setSeconds(0);
            startTime.setMilliseconds(0);
            startTime.setDate(startTime.getDate() - 30);
            const millisecondsOfMonth = 30 * 24 * 60 * 60 * 1000;
            const endTime = startTime.getTime() + millisecondsOfMonth;
            this.loading = true;
            this.results = yield this.service.getActiveUser({
                start: startTime.getTime(),
                end: endTime
            });
            this.loading = false;
        });
    }
};
ActiveUserComponent.ctorParameters = () => [
    { type: _service_fastsvs_records_service__WEBPACK_IMPORTED_MODULE_2__["FastSvsRecordsService"] }
];
ActiveUserComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        "selector": "active-user",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./active-user.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/active-user/active-user.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./active-user.scss */ "./src/app/active-user/active-user.scss")).default]
    })
], ActiveUserComponent);



/***/ }),

/***/ "./src/app/active-user/active-user.scss":
/*!**********************************************!*\
  !*** ./src/app/active-user/active-user.scss ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".list-unstyled {\n  margin: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sem9lL1Byb2plY3Qvc2xhY2tib3QtYXBwL3NyYy9hcHAvYWN0aXZlLXVzZXIvYWN0aXZlLXVzZXIuc2NzcyIsInNyYy9hcHAvYWN0aXZlLXVzZXIvYWN0aXZlLXVzZXIuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNHLFlBQUE7QUNDSCIsImZpbGUiOiJzcmMvYXBwL2FjdGl2ZS11c2VyL2FjdGl2ZS11c2VyLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubGlzdC11bnN0eWxlZCB7XG4gICBtYXJnaW46IDEycHg7XG59IiwiLmxpc3QtdW5zdHlsZWQge1xuICBtYXJnaW46IDEycHg7XG59Il19 */");

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _tot_statistics_tot_statistics_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tot-statistics/tot-statistics.component */ "./src/app/tot-statistics/tot-statistics.component.ts");
/* harmony import */ var _user_rank_user_rank_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user-rank/user-rank.component */ "./src/app/user-rank/user-rank.component.ts");
/* harmony import */ var _active_user_active_user_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./active-user/active-user.component */ "./src/app/active-user/active-user.component.ts");
/* harmony import */ var _single_svs_details_single_svs_details_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./single-svs-details/single-svs-details.component */ "./src/app/single-svs-details/single-svs-details.component.ts");








const routes = [
    { path: "fastsvs/home", pathMatch: "full", component: _home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"] },
    { path: "fastsvs/tot", pathMatch: "full", component: _tot_statistics_tot_statistics_component__WEBPACK_IMPORTED_MODULE_4__["TotStatisticsComponent"] },
    { path: "fastsvs/rank", pathMatch: "full", component: _user_rank_user_rank_component__WEBPACK_IMPORTED_MODULE_5__["UserRankComponent"] },
    { path: "fastsvs/singleSvs", pathMatch: "full", component: _single_svs_details_single_svs_details_component__WEBPACK_IMPORTED_MODULE_7__["SingleSvsDetailsComponent"] },
    { path: "fastsvs", redirectTo: "fastsvs/home", pathMatch: "full" },
    { path: "fastsvs/activeUser", pathMatch: "full", component: _active_user_active_user_component__WEBPACK_IMPORTED_MODULE_6__["ActiveUserComponent"] }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".clr-row {\n  padding-left: 12px;\n  display: flex;\n  flex-direction: column;\n}\n\n.record-container {\n  max-width: 55rem;\n  padding-left: 12px;\n  display: flex;\n  flex-direction: row;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sem9lL1Byb2plY3Qvc2xhY2tib3QtYXBwL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRyxrQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQ0NIOztBREVBO0VBQ0csZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtBQ0NIIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNsci1yb3cge1xuICAgcGFkZGluZy1sZWZ0OiAxMnB4O1xuICAgZGlzcGxheTogZmxleDtcbiAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5yZWNvcmQtY29udGFpbmVyIHtcbiAgIG1heC13aWR0aDogNTVyZW07XG4gICBwYWRkaW5nLWxlZnQ6IDEycHg7XG4gICBkaXNwbGF5OiBmbGV4O1xuICAgZmxleC1kaXJlY3Rpb246IHJvdztcbn1cbiIsIi5jbHItcm93IHtcbiAgcGFkZGluZy1sZWZ0OiAxMnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4ucmVjb3JkLWNvbnRhaW5lciB7XG4gIG1heC13aWR0aDogNTVyZW07XG4gIHBhZGRpbmctbGVmdDogMTJweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbn0iXX0= */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AppComponent = class AppComponent {
    constructor() {
        this.includeTestRecords = false;
        this.gridTabActive = true;
        this.showDetailedPointData = (point) => {
            this.gridTabActive = true;
            if (point.team) {
                this.teamFilter = point.team;
                this.dateFilter = point.date;
                this.errorFilter = null,
                    this.timeRange = null;
            }
            else {
                let errorFilter = point;
                let error = errorFilter.error;
                // let definedErrors: string[] = ["E_INVALID_CLN", "E_SVS_FAIL", "E_INVALID_PARAM"];
                this.errorFilter = error;
                this.timeRange = {
                    start: errorFilter.start,
                    end: errorFilter.end
                };
                this.teamFilter = null;
                this.dateFilter = null;
            }
        };
    }
    acceptFilter(filters) {
        this.userFilter = filters[0];
        this.teamFilter = filters[1];
        if (filters[2]) {
            this.dateFilter = new Date(parseInt(filters[2]));
        }
        else {
            this.dateFilter = null;
        }
        this.includeTestRecords = (filters[3] === "true");
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")).default]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/fesm2015/clr-angular.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _component_user_filter_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./component/user-filter.component */ "./src/app/component/user-filter.component.ts");
/* harmony import */ var _component_records_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./component/records.component */ "./src/app/component/records.component.ts");
/* harmony import */ var _component_users_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./component/users.component */ "./src/app/component/users.component.ts");
/* harmony import */ var _service_fastsvs_records_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./service/fastsvs-records.service */ "./src/app/service/fastsvs-records.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var angular2_highcharts_dist_HighchartsService__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! angular2-highcharts/dist/HighchartsService */ "./node_modules/angular2-highcharts/dist/HighchartsService.js");
/* harmony import */ var angular2_highcharts_dist_HighchartsService__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(angular2_highcharts_dist_HighchartsService__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _chart_highcharts_static_factory__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./chart/highcharts-static.factory */ "./src/app/chart/highcharts-static.factory.ts");
/* harmony import */ var _component_chart_container_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./component/chart-container.component */ "./src/app/component/chart-container.component.ts");
/* harmony import */ var angular2_highcharts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! angular2-highcharts */ "./node_modules/angular2-highcharts/index.js");
/* harmony import */ var angular2_highcharts__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(angular2_highcharts__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _component_date_range_picker_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./component/date-range-picker.component */ "./src/app/component/date-range-picker.component.ts");
/* harmony import */ var _component_datetime_picker_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./component/datetime-picker.component */ "./src/app/component/datetime-picker.component.ts");
/* harmony import */ var ng_pick_datetime__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ng-pick-datetime */ "./node_modules/ng-pick-datetime/picker.js");
/* harmony import */ var _component_datetime_picker_adapter__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./component/datetime-picker-adapter */ "./src/app/component/datetime-picker-adapter.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var highcharts_modules_xrange__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! highcharts/modules/xrange */ "./node_modules/highcharts/modules/xrange.js");
/* harmony import */ var highcharts_modules_xrange__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(highcharts_modules_xrange__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _tot_statistics_tot_statistics_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./tot-statistics/tot-statistics.component */ "./src/app/tot-statistics/tot-statistics.component.ts");
/* harmony import */ var _user_rank_user_rank_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./user-rank/user-rank.component */ "./src/app/user-rank/user-rank.component.ts");
/* harmony import */ var _active_user_active_user_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./active-user/active-user.component */ "./src/app/active-user/active-user.component.ts");
/* harmony import */ var _single_svs_details_single_svs_details_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./single-svs-details/single-svs-details.component */ "./src/app/single-svs-details/single-svs-details.component.ts");
/* harmony import */ var _component_grid_view_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./component/grid-view.component */ "./src/app/component/grid-view.component.ts");































highcharts_modules_xrange__WEBPACK_IMPORTED_MODULE_24___default()(highcharts__WEBPACK_IMPORTED_MODULE_23___default.a);
// export function highchartsFactory() {
//   return Highcharts;
// }
let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            _component_user_filter_component__WEBPACK_IMPORTED_MODULE_9__["UserFilter"],
            _component_records_component__WEBPACK_IMPORTED_MODULE_10__["FastSvsRecordsGrid"],
            _component_users_component__WEBPACK_IMPORTED_MODULE_11__["UserListComponent"],
            _component_chart_container_component__WEBPACK_IMPORTED_MODULE_16__["ChartContainer"],
            _component_grid_view_component__WEBPACK_IMPORTED_MODULE_30__["SvsStatisticsGridView"],
            _component_date_range_picker_component__WEBPACK_IMPORTED_MODULE_18__["DateRangePickerComponent"],
            _component_datetime_picker_component__WEBPACK_IMPORTED_MODULE_19__["DatetimePickerComponent"],
            _home_home_component__WEBPACK_IMPORTED_MODULE_25__["HomeComponent"],
            _tot_statistics_tot_statistics_component__WEBPACK_IMPORTED_MODULE_26__["TotStatisticsComponent"],
            _user_rank_user_rank_component__WEBPACK_IMPORTED_MODULE_27__["UserRankComponent"],
            _single_svs_details_single_svs_details_component__WEBPACK_IMPORTED_MODULE_29__["SingleSvsDetailsComponent"],
            _active_user_active_user_component__WEBPACK_IMPORTED_MODULE_28__["ActiveUserComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _clr_angular__WEBPACK_IMPORTED_MODULE_6__["ClarityModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_13__["CommonModule"],
            angular2_highcharts__WEBPACK_IMPORTED_MODULE_17__["ChartModule"],
            ng_pick_datetime__WEBPACK_IMPORTED_MODULE_20__["OwlDateTimeModule"],
            ng_pick_datetime__WEBPACK_IMPORTED_MODULE_20__["OwlNativeDateTimeModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
        ],
        providers: [
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_22__["CookieService"],
            _service_fastsvs_records_service__WEBPACK_IMPORTED_MODULE_12__["FastSvsRecordsService"],
            { provide: angular2_highcharts_dist_HighchartsService__WEBPACK_IMPORTED_MODULE_14__["HighchartsStatic"], useFactory: _chart_highcharts_static_factory__WEBPACK_IMPORTED_MODULE_15__["createDrilldownModule"] },
            { provide: ng_pick_datetime__WEBPACK_IMPORTED_MODULE_20__["OwlDateTimeIntl"], useClass: _component_datetime_picker_adapter__WEBPACK_IMPORTED_MODULE_21__["LocalizePickerLabels"] },
            { provide: ng_pick_datetime__WEBPACK_IMPORTED_MODULE_20__["OWL_DATE_TIME_FORMATS"], useValue: _component_datetime_picker_adapter__WEBPACK_IMPORTED_MODULE_21__["pickerFormats"] },
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/chart/highcharts-static.factory.ts":
/*!****************************************************!*\
  !*** ./src/app/chart/highcharts-static.factory.ts ***!
  \****************************************************/
/*! exports provided: createDrilldownModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDrilldownModule", function() { return createDrilldownModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! highcharts */ "./node_modules/highcharts/highcharts.js");
/* harmony import */ var highcharts__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(highcharts__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var highcharts_modules_drilldown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! highcharts/modules/drilldown */ "./node_modules/highcharts/modules/drilldown.js");
/* harmony import */ var highcharts_modules_drilldown__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(highcharts_modules_drilldown__WEBPACK_IMPORTED_MODULE_2__);



function createDrilldownModule() {
    highcharts_modules_drilldown__WEBPACK_IMPORTED_MODULE_2___default()(highcharts__WEBPACK_IMPORTED_MODULE_1__);
    enableRoundedBarChartExtention(highcharts__WEBPACK_IMPORTED_MODULE_1__);
    return highcharts__WEBPACK_IMPORTED_MODULE_1__;
}
/**
 * This code is copied from https://github.com/highcharts/rounded-corners/blob/master/rounded-corners.js
 * The npm install of the rounded-corners component fails due to missing "Highcharts" dependency
 * The issue is known and tracked here: https://github.com/highcharts/rounded-corners/issues/21
 * Once this gets fixed we can remove this and install the component as a regular npm package.
 */
function enableRoundedBarChartExtention(Highcharts) {
    var rel = Highcharts.relativeLength;
    Highcharts.wrap(Highcharts.seriesTypes.column.prototype, 'translate', function (proceed) {
        var options = this.options, topMargin = options.topMargin || 0, bottomMargin = options.bottomMargin || 0;
        proceed.call(this);
        Highcharts.each(this.points, function (point) {
            var shapeArgs = point.shapeArgs, w = shapeArgs.width, h = shapeArgs.height, x = shapeArgs.x, y = shapeArgs.y;
            // Get the radius
            var rTopLeft = rel(options.borderRadiusTopLeft || 0, w), rTopRight = rel(options.borderRadiusTopRight || 0, w), rBottomRight = rel(options.borderRadiusBottomRight || 0, w), rBottomLeft = rel(options.borderRadiusBottomLeft || 0, w);
            if (rTopLeft || rTopRight || rBottomRight || rBottomLeft) {
                var maxR = Math.min(w, h) / 2;
                if (rTopLeft > maxR) {
                    rTopLeft = maxR;
                }
                if (rTopRight > maxR) {
                    rTopRight = maxR;
                }
                if (rBottomRight > maxR) {
                    rBottomRight = maxR;
                }
                if (rBottomLeft > maxR) {
                    rBottomLeft = maxR;
                }
                // Preserve the box for data labels
                point.dlBox = point.shapeArgs;
                point.shapeType = 'path';
                point.shapeArgs = {
                    d: [
                        'M', x + rTopLeft, y + topMargin,
                        // top side
                        'L', x + w - rTopRight, y + topMargin,
                        // top right corner
                        'C', x + w - rTopRight / 2, y, x + w, y + rTopRight / 2, x + w, y + rTopRight,
                        // right side
                        'L', x + w, y + h - rBottomRight,
                        // bottom right corner
                        'C', x + w, y + h - rBottomRight / 2, x + w - rBottomRight / 2, y + h, x + w - rBottomRight, y + h + bottomMargin,
                        // bottom side
                        'L', x + rBottomLeft, y + h + bottomMargin,
                        // bottom left corner
                        'C', x + rBottomLeft / 2, y + h, x, y + h - rBottomLeft / 2, x, y + h - rBottomLeft,
                        // left side
                        'L', x, y + rTopLeft,
                        // top left corner
                        'C', x, y + rTopLeft / 2, x + rTopLeft / 2, y, x + rTopLeft, y,
                        'Z'
                    ]
                };
            }
        });
    });
}


/***/ }),

/***/ "./src/app/component/chart-container.component.ts":
/*!********************************************************!*\
  !*** ./src/app/component/chart-container.component.ts ***!
  \********************************************************/
/*! exports provided: ChartContainer, ChartTypes, ViewType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartContainer", function() { return ChartContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartTypes", function() { return ChartTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewType", function() { return ViewType; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _service_fastsvs_records_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/fastsvs-records.service */ "./src/app/service/fastsvs-records.service.ts");
/* harmony import */ var angular2_highcharts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular2-highcharts */ "./node_modules/angular2-highcharts/index.js");
/* harmony import */ var angular2_highcharts__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular2_highcharts__WEBPACK_IMPORTED_MODULE_3__);




let ChartContainer = class ChartContainer {
    constructor(service) {
        this.service = service;
        this.clickOnPoint = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.availableCharts = [
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
        this.availableViewType = [{
                text: "Chart",
                value: ViewType.CHART
            }, {
                text: "Datagrid",
                value: ViewType.GRID
            }];
        this.selectedViewType = ViewType.CHART;
        this.loading = false;
        this.ViewType = ViewType;
        this.loadChart = () => {
            this.options = [];
            this.getGroupsMetricsByDateRange(null);
        };
        this.loadCandidateTrend = () => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = true;
            try {
                const params = {
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
                let result = yield this.service.getCandidateRatio(params);
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
                const options = this.getGroupChartOptions([]);
                options.chart.type = "line";
                options.chart.zoomType = "x";
                options.title = { text: this.userFilter ? `SVS statistics of ${this.userFilter}` : 'SVS statistics of vSAN team' };
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
                    }
                    else {
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
                        this.points.forEach((point) => {
                            s += "<br/>" + point.series.name + ": " + point.y;
                        });
                        return s;
                    },
                    shared: true,
                };
                this.options = [options];
                this.loading = false;
            }
            catch (error) {
                console.log(error);
            }
        });
        this.getDailyDataOnSelectedPoint = (date, dataSet) => {
            const formatOpts = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };
            return dataSet.filter(dailyData => date === new Date(dailyData.date).toLocaleDateString("en", formatOpts));
        };
        this.loadDurationRatio = () => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = true;
            let fullSvsTimeRatioData = null;
            let svsDeployTimeRatio = null;
            try {
                [fullSvsTimeRatioData, svsDeployTimeRatio] = yield Promise.all([
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
                        this.points.forEach((point) => {
                            s += "<br/>" + point.series.name + ": " + (point.y * 100 + "%");
                        });
                        return s;
                    },
                    shared: true,
                };
                let suiteTimeChartOptions = this.getRatioChartOptions(svsDeployTimeRatio);
                suiteTimeChartOptions.title.text = "SVS Time Duration (Without case execution time) Ratio";
                suiteTimeChartOptions.tooltip = {
                    formatter: function () {
                        let s = "<strong>" + this.x + "</strong><br/>";
                        /**
                         * this.points is the attribute from the highchart object
                         */
                        this.points.forEach((point) => {
                            s += "<br/>" + point.series.name + ": " + ((point.y * 100).toFixed(0) + "%");
                        });
                        return s;
                    },
                    shared: true,
                };
                this.options = [fullTimeChartOptions, suiteTimeChartOptions];
                this.loading = false;
            }
            catch (error) {
                this.loading = false;
                console.log(error);
            }
        });
        this.getRatioChartOptions = (result) => {
            let categories = Object.keys(result.fast);
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
                        formatter: function () {
                            return this.value * 100 + "%";
                        },
                    },
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
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
            };
        };
        this.loadErrorStatistics = () => {
            this.loading = true;
            const params = {
                start: this._currentDateRange.from,
                end: this._currentDateRange.to,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };
            this.service.getErrors(params).then(data => {
                const options = this.getGroupChartOptions(data);
                // delete(options.plotOptions.series.point);
                options.plotOptions.series.point.events.click = (event) => {
                    this.clickOnPoint.emit({
                        start: this._currentDateRange.from,
                        end: this._currentDateRange.to,
                        error: event.point.name
                    });
                };
                options.title = { text: 'FastSVS Error Statistics' };
                options.yAxis = { title: {
                        text: 'Error Count'
                    } };
                let otherErrCount = 0;
                otherErrCount = data.filter(item => item["_id"].length < 5).reduce((sum, item) => {
                    sum += parseInt(item["count"]);
                    return sum;
                }, 0);
                data.push({ _id: "E_OTHERS", count: otherErrCount });
                options.series = [{
                        type: "column",
                        name: "Errors",
                        colorByPoint: true,
                        data: data.map(r => {
                            return {
                                "name": r["_id"],
                                "y": r["count"]
                            };
                        }).filter(item => item.name.length > 3)
                    }];
                this.options = [options];
                this.loading = false;
            });
        };
        this.loadTeamTotalChart = (params) => {
            this.loading = true;
            this.service.getGroups(params).then(data => {
                const options = this.getGroupChartOptions(data);
                delete (options.plotOptions.series.point);
                options.title = { text: 'FastSVS Total Records By Team' };
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
                            };
                        })
                    }];
                this.options = [options];
                this.loading = false;
            });
        };
        this.loadVsanTrendChart = (params) => {
            this.loading = true;
            this.service.getSvsVsanTrend(params).then(data => {
                const options = this.getGroupChartOptions(data);
                options.chart.type = "line";
                options.chart.zoomType = "x";
                options.title = { text: 'FastSVS Daily Ratio of vSAN team' };
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
                };
                options.plotOptions.series.point.events = null;
                options.series = [];
                // build the data series, follow the order of the xAxis categories
                const dataSeries = [];
                options.xAxis["categories"].forEach(key => {
                    const item = data[key];
                    if (!item) {
                        dataSeries.push(null);
                    }
                    else {
                        dataSeries.push(parseFloat((item.fastsvs / item.total * 100).toFixed(0)));
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
                        this.points.forEach((point) => {
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
        this.loadTrendChart = (params) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = true;
            let data, teams;
            [data, teams] = yield Promise.all([this.service.getGroupsTrend(params),
                this.service.getTeamList()
            ]);
            const options = this.getGroupChartOptions(data);
            options.chart.type = "line";
            options.chart.zoomType = "x";
            options.title = { text: 'FastSVS Daily Trend By Team' };
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
            console.log("dataSeries = ", dataSeries);
            Object.keys(dataSeries).forEach(group => {
                options.series.push({
                    name: group,
                    data: dataSeries[group]
                });
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
                    this.points.forEach((point) => {
                        s += "<br/>" + point.series.name + ": " + point.y;
                    });
                    return s;
                },
                shared: true,
            };
            this.options = [options];
            this.loading = false;
        });
        this.loadCompareCharts = () => {
            this.options = [];
            let chartDataRequests = [];
            if (window.localStorage.getItem(this.fastsvs)) {
                let fastsvsResult = JSON.parse(window.localStorage.getItem(this.fastsvs));
                setTimeout(() => {
                    this.options.push(this.getDetailedTimeDurationChartOptions(fastsvsResult, true));
                }, 1000);
            }
            else {
                chartDataRequests.push(this.service.getSvsTimeDetail(this.fastsvs).then(result => {
                    window.localStorage.setItem(this.fastsvs, JSON.stringify(result));
                    return this.getDetailedTimeDurationChartOptions(result, true);
                }));
            }
            if (this.originalsvs) {
                if (window.localStorage.getItem(this.originalsvs)) {
                    let originalResult = JSON.parse(window.localStorage.getItem(this.originalsvs));
                    setTimeout(() => {
                        this.options.push(this.getDetailedTimeDurationChartOptions(originalResult, false));
                    }, 1000);
                }
                else {
                    chartDataRequests.push(this.service.getSvsTimeDetail(this.originalsvs).then(result => {
                        window.localStorage.setItem(this.originalsvs, JSON.stringify(result));
                        return this.getDetailedTimeDurationChartOptions(result, false);
                    }));
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
        this.getTimeDuration = (time1, time2) => {
            let period = time2 - time1;
            let hours = Math.floor(period / (60 * 60 * 1000));
            let minutes = Math.floor((period % (60 * 60 * 1000)) / (60 * 1000));
            let seconds = ((period % (60 * 60 * 1000)) % (60 * 1000)) / 1000;
            return `${hours}h ${minutes}m ${seconds}s`;
        };
        this.getDetailedTimeDurationChartOptions = (result, isFastSvs) => {
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
                            var ix = point.index + 1, category = point.yCategory, from = new Date(point.x), to = new Date(point.x2);
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
                        formatter: function () {
                            return "<div style='width: 200px;font-size: 12px;white-space: pre-wrap'>" + this.value + "</div>";
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
    }
    set selectedChart(val) {
        if (+val !== this._selectedChart) {
            this._selectedChart = +val;
            this.selectedViewType = ViewType.CHART;
        }
        this.loading = false;
        this.loadChart();
    }
    get selectedChart() {
        return this._selectedChart;
    }
    ngOnInit() {
        if (!this.selectedChart) {
            this.selectedChart = ChartTypes.FASTSVS_CANDIDATE_RADIO;
        }
    }
    get isCandidateChart() {
        return this.selectedChart === ChartTypes.FASTSVS_CANDIDATE_RADIO;
    }
    get isVsan2Chart() {
        return this.selectedChart === ChartTypes.VSAN2_TREND;
    }
    get datePickerRequired() {
        return this.selectedChart === ChartTypes.TEAM_DAILY_TREND ||
            this.selectedChart === ChartTypes.TEAM_TOTAL ||
            this.selectedChart === ChartTypes.VSAN_TREND ||
            this.selectedChart === ChartTypes.FASTSVS_CANDIDATE_RADIO ||
            this.selectedChart === ChartTypes.VSAN2_TREND ||
            this.selectedChart === ChartTypes.ERROR_REPORT;
    }
    get isSvsStepsCompare() {
        return this.selectedChart === ChartTypes.FAST_ORIGINAL_COMPARISON;
    }
    get isSingleSvsStepsDetail() {
        return this.selectedChart === ChartTypes.SINGLE_SVS_STEPS;
    }
    loadVsan2Trend() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.loading = true;
            try {
                const params = {
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
                let result = yield this.service.getVsan2Trend(params);
                this.vsan2Data = result;
                let series = {};
                result.forEach(dailyData => {
                    const date = new Date(dailyData.date).toLocaleDateString("en", formatOpts);
                    let data = series[date] || { total: 0, fastsvs: 0, notSupported: 0, candidate: 0 };
                    data.total += dailyData.total;
                    data.fastsvs += dailyData.fastsvs;
                    data.notSupported += dailyData.notSupported;
                    data.candidate = (data.total - data.fastsvs - data.notSupported);
                    series[date] = data;
                });
                const options = this.getGroupChartOptions([]);
                options.chart.type = "line";
                options.chart.zoomType = "x";
                options.title = { text: this.userFilter ? `vSAN2 statistics of ${this.userFilter}` : 'vSAN2 statistics' };
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
                    }
                    else {
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
            }
            catch (error) {
                console.log(error);
            }
            finally {
                this.loading = false;
            }
        });
    }
    getGroupsMetricsByDateRange(dateRange) {
        if (this.loading) {
            return;
        }
        if (dateRange) {
            this._currentDateRange = dateRange;
        }
        if (!this._currentDateRange) {
            return;
        }
        const params = {
            start: this._currentDateRange.from,
            end: this._currentDateRange.to,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        if (this.selectedChart === ChartTypes.TEAM_TOTAL) {
            this.loadTeamTotalChart(params);
        }
        else if (this.selectedChart === ChartTypes.TEAM_DAILY_TREND) {
            this.loadTrendChart(params);
        }
        else if (this.selectedChart === ChartTypes.ERROR_REPORT) {
            this.loadErrorStatistics();
        }
        else if (this.selectedChart === ChartTypes.VSAN_TREND) {
            this.getVsanTrendMetricsByDateRange(dateRange);
        }
        else if (this.selectedChart === ChartTypes.FASTSVS_CANDIDATE_RADIO) {
            this.loadCandidateTrend();
        }
        else if (this.selectedChart === ChartTypes.VSAN2_TREND) {
            this.loadVsan2Trend();
        }
    }
    getVsanTrendMetricsByDateRange(dateRange) {
        if (this.loading) {
            return;
        }
        if (dateRange) {
            this._currentDateRange = dateRange;
        }
        if (!this._currentDateRange) {
            return;
        }
        const params = {
            start: this._currentDateRange.from,
            end: this._currentDateRange.to,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        this.loadVsanTrendChart(params);
    }
    generateLabelsFromRange(from, to) {
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
        let result = [];
        while (start < end) {
            result.push(start.toLocaleDateString("en", formatOpts));
            start.setDate(start.getDate() + 1);
        }
        return result;
    }
    generateWorkingDayPlotBands(from, to) {
        let start = new Date(from);
        let end = new Date(to);
        let bands = [];
        let index = 0;
        while (start < end) {
            let plotBand = { color: "#FED" };
            // The plot band starts from [Sun, Mon, Tue, Wed, Thur]
            while (start.getDay() >= 5 || start.getDay() == 0) {
                index++;
                start.setDate(start.getDate() + 1);
            }
            if (start >= end) {
                break;
            }
            plotBand["from"] = index;
            while (start.getDay() <= 4 && start < end) {
                index++;
                start.setDate(start.getDate() + 1);
            }
            plotBand["to"] = index;
            bands.push(plotBand);
        }
        return bands;
    }
    getGroupChartOptions(data) {
        let options = {
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
                                const category = event.point["category"] + "";
                                const selectedDate = new Date(category.length === 5 ? new Date().getFullYear() + "/" + category : category);
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
    getChartWidth(index) {
        if (this.options.length === 1) {
            return 1200;
        }
        if (index === 0) {
            return 500;
        }
        return 700;
    }
};
ChartContainer.ctorParameters = () => [
    { type: _service_fastsvs_records_service__WEBPACK_IMPORTED_MODULE_2__["FastSvsRecordsService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], ChartContainer.prototype, "clickOnPoint", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(angular2_highcharts__WEBPACK_IMPORTED_MODULE_3__["ChartComponent"], { static: false })
], ChartContainer.prototype, "chartComponent", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ChartContainer.prototype, "selectedChart", null);
ChartContainer = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "chart-container",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./chart-container.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/chart-container.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./chart-container.scss */ "./src/app/component/chart-container.scss")).default]
    })
], ChartContainer);

var ChartTypes;
(function (ChartTypes) {
    ChartTypes[ChartTypes["VSAN_TREND"] = 0] = "VSAN_TREND";
    ChartTypes[ChartTypes["TEAM_DAILY_TREND"] = 1] = "TEAM_DAILY_TREND";
    ChartTypes[ChartTypes["TEAM_TOTAL"] = 2] = "TEAM_TOTAL";
    ChartTypes[ChartTypes["ERROR_REPORT"] = 3] = "ERROR_REPORT";
    ChartTypes[ChartTypes["DURATION_RATIO"] = 4] = "DURATION_RATIO";
    ChartTypes[ChartTypes["FAST_ORIGINAL_COMPARISON"] = 5] = "FAST_ORIGINAL_COMPARISON";
    ChartTypes[ChartTypes["SINGLE_SVS_STEPS"] = 6] = "SINGLE_SVS_STEPS";
    ChartTypes[ChartTypes["FASTSVS_CANDIDATE_RADIO"] = 7] = "FASTSVS_CANDIDATE_RADIO";
    ChartTypes[ChartTypes["VSAN2_TREND"] = 8] = "VSAN2_TREND";
})(ChartTypes || (ChartTypes = {}));
var ViewType;
(function (ViewType) {
    ViewType[ViewType["CHART"] = 0] = "CHART";
    ViewType[ViewType["GRID"] = 1] = "GRID";
})(ViewType || (ViewType = {}));


/***/ }),

/***/ "./src/app/component/chart-container.scss":
/*!************************************************!*\
  !*** ./src/app/component/chart-container.scss ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  display: flex;\n  flex-direction: column;\n  flex: 1 0 0rem;\n}\n\n.container {\n  display: flex;\n  flex-direction: row;\n  flex: 1 0 auto;\n  width: 1200px;\n  height: 600px;\n  margin: 12px 12px;\n}\n\n.container-tall {\n  height: 1000px;\n}\n\n::ng-deep chart {\n  width: 100%;\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sem9lL1Byb2plY3Qvc2xhY2tib3QtYXBwL3NyYy9hcHAvY29tcG9uZW50L2NoYXJ0LWNvbnRhaW5lci5zY3NzIiwic3JjL2FwcC9jb21wb25lbnQvY2hhcnQtY29udGFpbmVyLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRyxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0FDQ0g7O0FERUE7RUFDRyxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtBQ0NIOztBREVBO0VBQ0csY0FBQTtBQ0NIOztBREVBO0VBQ0csV0FBQTtFQUNBLGNBQUE7QUNDSCIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9jaGFydC1jb250YWluZXIuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgIGRpc3BsYXk6IGZsZXg7XG4gICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgZmxleDogMSAwIDByZW07XG59XG5cbi5jb250YWluZXIge1xuICAgZGlzcGxheTogZmxleDtcbiAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICBmbGV4OiAxIDAgYXV0bztcbiAgIHdpZHRoOiAxMjAwcHg7XG4gICBoZWlnaHQ6IDYwMHB4O1xuICAgbWFyZ2luOiAxMnB4IDEycHg7XG59XG5cbi5jb250YWluZXItdGFsbCB7XG4gICBoZWlnaHQ6IDEwMDBweDtcbn1cblxuOjpuZy1kZWVwIGNoYXJ0IHtcbiAgIHdpZHRoOiAxMDAlO1xuICAgZGlzcGxheTogYmxvY2s7XG59IiwiOmhvc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4OiAxIDAgMHJlbTtcbn1cblxuLmNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZsZXg6IDEgMCBhdXRvO1xuICB3aWR0aDogMTIwMHB4O1xuICBoZWlnaHQ6IDYwMHB4O1xuICBtYXJnaW46IDEycHggMTJweDtcbn1cblxuLmNvbnRhaW5lci10YWxsIHtcbiAgaGVpZ2h0OiAxMDAwcHg7XG59XG5cbjo6bmctZGVlcCBjaGFydCB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBibG9jaztcbn0iXX0= */");

/***/ }),

/***/ "./src/app/component/date-range-picker.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/component/date-range-picker.component.ts ***!
  \**********************************************************/
/*! exports provided: DateRangePickerComponent, DateRangePickerState, DateRangeData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateRangePickerComponent", function() { return DateRangePickerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateRangePickerState", function() { return DateRangePickerState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateRangeData", function() { return DateRangeData; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
var DateRangePickerComponent_1;

/* Copyright 2018 VMware, Inc. All rights reserved. -- VMware Confidential */


let DateRangePickerComponent = DateRangePickerComponent_1 = class DateRangePickerComponent {
    constructor(cookie) {
        this.cookie = cookie;
        this.DateRangePickerState = DateRangePickerState;
        this.enabled = true;
        this.changeRange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"](true);
        this._dayInterval = 7;
        this.updateCurrentDateRange = (rangeData) => {
            if (rangeData) {
                this.currentDateRange = rangeData;
            }
            else {
                this.currentDateRange = this.createDateRange(this.fromDate);
            }
            this.cookie.set(DateRangePickerComponent_1.SAVED_RANGE_KEY, JSON.stringify(this.currentDateRange));
        };
        this.createStartDate = () => {
            const startTime = new Date();
            startTime.setHours(0 - (this.dayInterval - 1) * 24);
            startTime.setMinutes(0);
            startTime.setSeconds(0);
            startTime.setMilliseconds(0);
            return startTime;
        };
        this.createEndDate = () => {
            return this.createNoTimeDate();
        };
        this.createDateRange = (startTime, endTime) => {
            let endDate;
            if (this.currentPickerState === DateRangePickerState.LAST_X_HOURS || !endTime) {
                endDate = startTime.getTime() + DateRangePickerComponent_1.DAY_IN_MILLISECONDS * this.dayInterval;
            }
            else {
                endDate = endTime.getTime();
            }
            // -1 to prevent the date number increasing
            endDate -= 1;
            return new DateRangeData(startTime.getTime(), endDate, this.currentPickerState);
        };
        this.validateDate = () => {
            this.fromDateError = "";
            this.toDateError = "";
            this.invalidInterval = false;
            if (this.currentPickerState === DateRangePickerState.LAST_X_HOURS) {
                if (this.dayInterval <= 0) {
                    this.invalidInterval = true;
                    return;
                }
            }
            else {
                if (!this.fromDate) {
                    this.fromDateError = "Start time is required";
                    return;
                }
                if (!this.toDate) {
                    this.toDateError = "End time is required";
                    return;
                }
                const currentTime = this.createNoTimeDate().getTime();
                const startTime = this.fromDate.getTime();
                const endTime = this.toDate.getTime();
                if (endTime - currentTime > 0) {
                    // The end time can not be greater than the current time.
                    this.toDateError = "End time should not be greater than current time";
                }
                else if (endTime - startTime <= 0) {
                    // The end time should be greater than the start time.
                    this.fromDateError = "End time should be greater than start time";
                }
            }
        };
        this.createNoTimeDate = () => {
            const date = new Date();
            date.setHours(24);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        };
        this.onRangeLastXDaysClick = () => {
            this.currentPickerState = DateRangePickerState.LAST_X_HOURS;
        };
        this.onRangeCustomClick = () => {
            this.currentPickerState = DateRangePickerState.CUSTOM_RANGE;
            // this.dayInterval = 7;
        };
        this.onRefreshBtnClick = () => {
            if (this.currentPickerState === DateRangePickerState.CUSTOM_RANGE) {
                const startTime = new Date(this.fromDate);
                const endTime = new Date(this.toDate);
                // increase one day so it won't miss today
                endTime.setHours(24);
                this.updateCurrentDateRange(this.createDateRange(startTime, endTime));
            }
            else if (this.currentPickerState === DateRangePickerState.LAST_X_HOURS) {
                /**
                 * have to reset the current time range because the time range is not correct
                 * if user clicks the query button 30 minutes later after the page opened.
                 */
                this.fromDate = this.createStartDate();
                this.updateCurrentDateRange();
            }
            this.changeRange.emit(this.currentDateRange);
        };
    }
    get dayInterval() {
        return this._dayInterval;
    }
    set dayInterval(value) {
        this._dayInterval = value;
        this.validateDate();
    }
    get fromDate() {
        return this._fromDate;
    }
    set fromDate(value) {
        this._fromDate = value;
        this.validateDate();
    }
    get toDate() {
        return this._toDate;
    }
    set toDate(value) {
        this._toDate = value;
        this.validateDate();
    }
    get currentPickerState() {
        return this._currentPickerState;
    }
    set currentPickerState(value) {
        if (this._currentPickerState === value) {
            return;
        }
        this._currentPickerState = value;
        switch (value) {
            case DateRangePickerState.LAST_X_HOURS:
                this.currentStateLabel = "Last";
                break;
            case DateRangePickerState.CUSTOM_RANGE:
                this.currentStateLabel = "Custom";
                break;
        }
        this.validateDate();
    }
    ngOnInit() {
        const savedRange = this.cookie.get(DateRangePickerComponent_1.SAVED_RANGE_KEY);
        if (savedRange) {
            this.currentDateRange = JSON.parse(savedRange);
            this.currentPickerState = this.currentDateRange.state;
            if (this.currentPickerState === DateRangePickerState.LAST_X_HOURS) {
                this.dayInterval = Math.round((this.currentDateRange.to - this.currentDateRange.from) / DateRangePickerComponent_1.DAY_IN_MILLISECONDS);
            }
            this.fromDate = new Date(this.currentDateRange.from);
            this.toDate = new Date(this.currentDateRange.to);
        }
        else {
            if (!this.currentPickerState) {
                this.currentPickerState = DateRangePickerState.LAST_X_HOURS;
            }
            this.fromDate = this.createStartDate();
            this.toDate = this.createEndDate();
            this.updateCurrentDateRange();
        }
        this.changeRange.emit(this.currentDateRange);
    }
    get disableRefresh() {
        return !this.enabled || !!this.fromDateError || !!this.toDateError || this.invalidInterval;
    }
};
DateRangePickerComponent.DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
DateRangePickerComponent.SAVED_RANGE_KEY = "saved-date-range";
DateRangePickerComponent.ctorParameters = () => [
    { type: ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__["CookieService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], DateRangePickerComponent.prototype, "enabled", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], DateRangePickerComponent.prototype, "changeRange", void 0);
DateRangePickerComponent = DateRangePickerComponent_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "vsan-date-range-picker",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./date-range-picker.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/date-range-picker.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./date-range-picker.scss */ "./src/app/component/date-range-picker.scss")).default]
    })
], DateRangePickerComponent);

/**
 * date range picker states enum to indicate what option is selected
 */
var DateRangePickerState;
(function (DateRangePickerState) {
    DateRangePickerState[DateRangePickerState["LAST_X_HOURS"] = 0] = "LAST_X_HOURS";
    DateRangePickerState[DateRangePickerState["CUSTOM_RANGE"] = 1] = "CUSTOM_RANGE";
})(DateRangePickerState || (DateRangePickerState = {}));
class DateRangeData {
    constructor(from, to, state) {
        this.from = from;
        this.to = to;
        this.state = state;
    }
}


/***/ }),

/***/ "./src/app/component/date-range-picker.scss":
/*!**************************************************!*\
  !*** ./src/app/component/date-range-picker.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/* Copyright 2019 VMware, Inc. All rights reserved. -- VMware Confidential */\n:host {\n  display: flex;\n  flex: 0 0 auto;\n  height: 2rem;\n  margin-bottom: 24px;\n}\n#range-dropdown {\n  height: 1rem;\n}\n#query-range-btn {\n  margin: 0;\n}\n.clr-form-control {\n  width: 100%;\n}\n.clr-control-container {\n  display: flex;\n}\n.day-interval-container {\n  width: 6.5rem;\n}\n.day-interval-container .day-interval-input {\n  width: 3rem;\n}\nspan,\nlabel {\n  white-space: nowrap;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sem9lL1Byb2plY3Qvc2xhY2tib3QtYXBwL3NyYy9hcHAvY29tcG9uZW50L2RhdGUtcmFuZ2UtcGlja2VyLnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudC9kYXRlLXJhbmdlLXBpY2tlci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRFQUFBO0FBTUE7RUFDRyxhQUFBO0VBQ0EsY0FBQTtFQUVBLFlBVGE7RUFVYixtQkFBQTtBQ0xIO0FEUUE7RUFDRyxZQWJxQjtBQ1F4QjtBRFFBO0VBQ0csU0FBQTtBQ0xIO0FEUUE7RUFDRyxXQUFBO0FDTEg7QURRQTtFQUNHLGFBQUE7QUNMSDtBRFFBO0VBQ0csYUE1QjRCO0FDdUIvQjtBRE1HO0VBQ0csV0E3QnFCO0FDeUIzQjtBRFFBOztFQUVHLG1CQUFBO0FDTEgiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvZGF0ZS1yYW5nZS1waWNrZXIuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE5IFZNd2FyZSwgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLiAtLSBWTXdhcmUgQ29uZmlkZW50aWFsICovXG4kcGlja2VyLWhlaWdodDogMnJlbTtcbiRyYW5nZS1kcm9wZG93bi1oZWlnaHQ6IDFyZW07XG4kZGF5LWludGVydmFsLWNvbnRhaW5lci13aWR0aDogNi41cmVtO1xuJGRheS1pbnRlcnZhbC1pbnB1dC13aWR0aDogM3JlbTtcblxuOmhvc3Qge1xuICAgZGlzcGxheTogZmxleDtcbiAgIGZsZXg6IDAgMCBhdXRvO1xuICAgLy8gRml4ZWQgaGVpZ2h0IHRvIHJlc2VydmUgc3BhY2UgZm9yIGlucHV0IGZpbGVkIGVycm9yIG1lc3NhZ2UuXG4gICBoZWlnaHQ6ICRwaWNrZXItaGVpZ2h0O1xuICAgbWFyZ2luLWJvdHRvbTogMjRweDtcbn1cblxuI3JhbmdlLWRyb3Bkb3duIHtcbiAgIGhlaWdodDogJHJhbmdlLWRyb3Bkb3duLWhlaWdodDtcbn1cblxuI3F1ZXJ5LXJhbmdlLWJ0biB7XG4gICBtYXJnaW46IDA7XG59XG5cbi5jbHItZm9ybS1jb250cm9sIHtcbiAgIHdpZHRoOiAxMDAlO1xufVxuXG4uY2xyLWNvbnRyb2wtY29udGFpbmVyIHtcbiAgIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5kYXktaW50ZXJ2YWwtY29udGFpbmVyIHtcbiAgIHdpZHRoOiAkZGF5LWludGVydmFsLWNvbnRhaW5lci13aWR0aDtcbiAgIC5kYXktaW50ZXJ2YWwtaW5wdXQge1xuICAgICAgd2lkdGg6ICRkYXktaW50ZXJ2YWwtaW5wdXQtd2lkdGg7XG4gICB9XG59XG5cbnNwYW4sXG5sYWJlbCB7XG4gICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufSIsIi8qIENvcHlyaWdodCAyMDE5IFZNd2FyZSwgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLiAtLSBWTXdhcmUgQ29uZmlkZW50aWFsICovXG46aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXg6IDAgMCBhdXRvO1xuICBoZWlnaHQ6IDJyZW07XG4gIG1hcmdpbi1ib3R0b206IDI0cHg7XG59XG5cbiNyYW5nZS1kcm9wZG93biB7XG4gIGhlaWdodDogMXJlbTtcbn1cblxuI3F1ZXJ5LXJhbmdlLWJ0biB7XG4gIG1hcmdpbjogMDtcbn1cblxuLmNsci1mb3JtLWNvbnRyb2wge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmNsci1jb250cm9sLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5kYXktaW50ZXJ2YWwtY29udGFpbmVyIHtcbiAgd2lkdGg6IDYuNXJlbTtcbn1cbi5kYXktaW50ZXJ2YWwtY29udGFpbmVyIC5kYXktaW50ZXJ2YWwtaW5wdXQge1xuICB3aWR0aDogM3JlbTtcbn1cblxuc3BhbixcbmxhYmVsIHtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/component/datetime-picker-adapter.ts":
/*!******************************************************!*\
  !*** ./src/app/component/datetime-picker-adapter.ts ***!
  \******************************************************/
/*! exports provided: LocalizePickerLabels, pickerFormats */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalizePickerLabels", function() { return LocalizePickerLabels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pickerFormats", function() { return pickerFormats; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var ng_pick_datetime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-pick-datetime */ "./node_modules/ng-pick-datetime/picker.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");



let LocalizePickerLabels = class LocalizePickerLabels extends ng_pick_datetime__WEBPACK_IMPORTED_MODULE_1__["OwlDateTimeIntl"] {
    constructor() {
        super(...arguments);
        // Localize Set and Calcel button.
        this.setBtnLabel = "OK";
        this.cancelBtnLabel = "Cancel";
    }
};
LocalizePickerLabels = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])()
], LocalizePickerLabels);

;
/**
 * TODO: using the string bundle to handle the locale based datetime format
 * for the time being(e.g. while Clarity provide their component)
 * the vIP service (from i10n team) does not help on this issue
 */
const pickerFormats = {
    // TODO: Use this implementation when ng-pick-datetime-moment supports Angular8.
    // ng-pick-datetime-moment is used to localized the date and time that are displayed in input filed.
    // https://daniel-projects.firebaseapp.com/owlng/date-time-picker
    // fullPickerInput: VsanUiUtils.getString("vsan.common.custom.date.format"),
    // monthYearLabel: 'MM YYYY'
    fullPickerInput: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },
    monthYearLabel: { year: 'numeric', month: 'numeric' },
};


/***/ }),

/***/ "./src/app/component/datetime-picker.component.ts":
/*!********************************************************!*\
  !*** ./src/app/component/datetime-picker.component.ts ***!
  \********************************************************/
/*! exports provided: DatetimePickerComponent, DateTimeSelectMode, DateRangeData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatetimePickerComponent", function() { return DatetimePickerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateTimeSelectMode", function() { return DateTimeSelectMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateRangeData", function() { return DateRangeData; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ng_pick_datetime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-pick-datetime */ "./node_modules/ng-pick-datetime/picker.js");

/* Copyright 2017-2019 VMware, Inc. All rights reserved. -- VMware Confidential */


let DatetimePickerComponent = class DatetimePickerComponent {
    constructor(dateTimeAdapter) {
        this.selectMode = DateTimeSelectMode.SINGLE;
        /**
         * Triggered when new datetime is picked by the user
         */
        this.datetimeChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        // Set time picker language.
        dateTimeAdapter.setLocale("en");
    }
    set datetime(val) {
        // validate input value
        if (this.selectMode === DateTimeSelectMode.SINGLE && val && !(val instanceof Date)) {
            return;
        }
        if (this.selectMode === DateTimeSelectMode.RANGE && val && !(val instanceof DateRangeData) &&
            !(val instanceof Array)) {
            return;
        }
        if (val == this.datetimeValue) {
            return;
        }
        if (!val) {
            this.datetimeValue = null;
        }
        if (val instanceof DateRangeData) {
            val = [new Date(val.from), new Date(val.to)];
        }
        this.datetimeValue = val;
        if (val instanceof Array) {
            this.datetimeChange.emit(this.createDateRangeData(val));
        }
        else {
            this.datetimeChange.emit(val);
        }
    }
    get datetime() {
        return this.datetimeValue;
    }
    ngOnInit() {
        if (!this.placeholder) {
            this.placeholder = "MM/DD/YYYY, h:mm A ~ MM/DD/YYYY, h:mm A";
        }
    }
    createDateRangeData(dates) {
        const from = (dates && dates.length > 0 && dates[0]) ? dates[0].getTime() : null;
        const to = (dates && dates.length > 1 && dates[1]) ? dates[1].getTime() : null;
        return new DateRangeData(from, to);
    }
};
DatetimePickerComponent.ctorParameters = () => [
    { type: ng_pick_datetime__WEBPACK_IMPORTED_MODULE_2__["DateTimeAdapter"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], DatetimePickerComponent.prototype, "selectMode", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], DatetimePickerComponent.prototype, "label", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], DatetimePickerComponent.prototype, "disabled", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], DatetimePickerComponent.prototype, "placeholder", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], DatetimePickerComponent.prototype, "errorMessage", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], DatetimePickerComponent.prototype, "datetime", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], DatetimePickerComponent.prototype, "datetimeChange", void 0);
DatetimePickerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'vsan-datetime-picker',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./datetime-picker.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/datetime-picker.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./datetime-picker.scss */ "./src/app/component/datetime-picker.scss")).default]
    })
], DatetimePickerComponent);

/**
 * Available date time picker modes
 */
var DateTimeSelectMode;
(function (DateTimeSelectMode) {
    // ref https://daniel-projects.firebaseapp.com/owlng/date-time-picker
    DateTimeSelectMode["SINGLE"] = "single";
    DateTimeSelectMode["RANGE"] = "range";
})(DateTimeSelectMode || (DateTimeSelectMode = {}));
class DateRangeData {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.from = from;
        this.to = to;
    }
}


/***/ }),

/***/ "./src/app/component/datetime-picker.scss":
/*!************************************************!*\
  !*** ./src/app/component/datetime-picker.scss ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("@charset \"UTF-8\";\n/* Copyright 2019 VMware, Inc. All rights reserved. -- VMware Confidential */\n:host[ng-reflect-select-mode=range] .clr-control-container {\n  width: 14rem !important;\n}\n.horizontal-layout {\n  display: flex;\n  flex: 1 0 0rem;\n  flex-direction: row !important;\n  flex-wrap: wrap;\n}\n.horizontal-layout .clr-form-control {\n  flex-direction: row !important;\n}\n::ng-deep .clr-form-control {\n  margin-top: 0;\n}\n.clr-control-label {\n  margin: 8px 8px 0 0;\n}\n.clr-control-container {\n  margin-right: 12px;\n}\n.datetime-picker-label {\n  white-space: nowrap;\n}\n.clr-control-container {\n  width: 7rem;\n}\n.clr-control-container .clr-input-wrapper {\n  display: flex;\n}\n.clr-control-container .clr-input-wrapper ::ng-deep .clr-form-control {\n  flex: 1 0 0rem;\n}\n.clr-control-container .clr-input-wrapper ::ng-deep .clr-form-control * {\n  width: 100%;\n}\n::ng-deep .owl-dt-container {\n  font-size: 1em;\n}\n::ng-deep .owl-dt-container owl-date-time-calendar {\n  height: 18em !important;\n}\n::ng-deep .owl-dt-container .owl-dt-calendar-control {\n  padding: 0 0.5em;\n}\n::ng-deep .owl-dt-container .owl-dt-weekdays th {\n  line-height: 1em !important;\n  padding-bottom: 0 !important;\n}\n::ng-deep .owl-dt-container .owl-dt-calendar-table-divider {\n  display: none;\n}\n::ng-deep .owl-dt-container .owl-dt-timer-content {\n  align-items: baseline;\n}\n::ng-deep .owl-dt-container .owl-dt-timer-input {\n  height: 1.3em;\n  font-size: 1em !important;\n}\n::ng-deep .owl-dt-container .owl-dt-timer {\n  padding: 0;\n  height: 4.5em;\n}\n::ng-deep .owl-dt-container .owl-dt-timer .owl-dt-timer-divider::before, ::ng-deep .owl-dt-container .owl-dt-timer .owl-dt-timer-divider::after {\n  width: 0;\n  height: 0;\n  content: \"•\";\n}\n::ng-deep .owl-dt-container .owl-dt-timer .owl-dt-timer-divider:before {\n  top: 20%;\n}\n::ng-deep .owl-dt-container .owl-dt-timer .owl-dt-timer-divider:after {\n  bottom: 60%;\n}\n::ng-deep .owl-dt-container .owl-dt-timer .owl-dt-control-arrow-button {\n  display: flex;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50L2RhdGV0aW1lLXBpY2tlci5zY3NzIiwiL1VzZXJzL2x6b2UvUHJvamVjdC9zbGFja2JvdC1hcHAvc3JjL2FwcC9jb21wb25lbnQvZGF0ZXRpbWUtcGlja2VyLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FDQWhCLDRFQUFBO0FBaUJHO0VBQ0csdUJBQUE7QURkTjtBQ2tCQTtFQUNHLGFBQUE7RUFDQSxjQUFBO0VBQ0EsOEJBQUE7RUFDQSxlQUFBO0FEZkg7QUNnQkc7RUFDRyw4QkFBQTtBRGROO0FDa0JBO0VBQ0csYUFBQTtBRGZIO0FDa0JBO0VBQ0csbUJBQUE7QURmSDtBQ2tCQTtFQUNHLGtCQUFBO0FEZkg7QUNrQkE7RUFDRyxtQkFBQTtBRGZIO0FDa0JBO0VBQ0csV0EvQ1c7QURnQ2Q7QUNnQkc7RUFDRyxhQUFBO0FEZE47QUNlTTtFQUNHLGNBQUE7QURiVDtBQ2NTO0VBQ0csV0FBQTtBRFpaO0FDa0JBO0VBRUcsY0F6RGE7QUR5Q2hCO0FDa0JHO0VBQ0csdUJBQUE7QURoQk47QUNrQkc7RUFDRyxnQkFBQTtBRGhCTjtBQ2tCRztFQUNHLDJCQUFBO0VBQ0EsNEJBQUE7QURoQk47QUNrQkc7RUFDRyxhQUFBO0FEaEJOO0FDa0JHO0VBQ0cscUJBQUE7QURoQk47QUNrQkc7RUFDRyxhQXhFa0I7RUF5RWxCLHlCQUFBO0FEaEJOO0FDa0JHO0VBQ0csVUFBQTtFQUNBLGFBM0VZO0FEMkRsQjtBQ21CUztFQUdDLFFBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtBRG5CVjtBQ3NCTTtFQUNHLFFBQUE7QURwQlQ7QUNzQk07RUFDRyxXQUFBO0FEcEJUO0FDc0JNO0VBQ0csYUFBQTtBRHBCVCIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC9kYXRldGltZS1waWNrZXIuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBjaGFyc2V0IFwiVVRGLThcIjtcbi8qIENvcHlyaWdodCAyMDE5IFZNd2FyZSwgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLiAtLSBWTXdhcmUgQ29uZmlkZW50aWFsICovXG46aG9zdFtuZy1yZWZsZWN0LXNlbGVjdC1tb2RlPXJhbmdlXSAuY2xyLWNvbnRyb2wtY29udGFpbmVyIHtcbiAgd2lkdGg6IDE0cmVtICFpbXBvcnRhbnQ7XG59XG5cbi5ob3Jpem9udGFsLWxheW91dCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXg6IDEgMCAwcmVtO1xuICBmbGV4LWRpcmVjdGlvbjogcm93ICFpbXBvcnRhbnQ7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cbi5ob3Jpem9udGFsLWxheW91dCAuY2xyLWZvcm0tY29udHJvbCB7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3cgIWltcG9ydGFudDtcbn1cblxuOjpuZy1kZWVwIC5jbHItZm9ybS1jb250cm9sIHtcbiAgbWFyZ2luLXRvcDogMDtcbn1cblxuLmNsci1jb250cm9sLWxhYmVsIHtcbiAgbWFyZ2luOiA4cHggOHB4IDAgMDtcbn1cblxuLmNsci1jb250cm9sLWNvbnRhaW5lciB7XG4gIG1hcmdpbi1yaWdodDogMTJweDtcbn1cblxuLmRhdGV0aW1lLXBpY2tlci1sYWJlbCB7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi5jbHItY29udHJvbC1jb250YWluZXIge1xuICB3aWR0aDogN3JlbTtcbn1cbi5jbHItY29udHJvbC1jb250YWluZXIgLmNsci1pbnB1dC13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbn1cbi5jbHItY29udHJvbC1jb250YWluZXIgLmNsci1pbnB1dC13cmFwcGVyIDo6bmctZGVlcCAuY2xyLWZvcm0tY29udHJvbCB7XG4gIGZsZXg6IDEgMCAwcmVtO1xufVxuLmNsci1jb250cm9sLWNvbnRhaW5lciAuY2xyLWlucHV0LXdyYXBwZXIgOjpuZy1kZWVwIC5jbHItZm9ybS1jb250cm9sICoge1xuICB3aWR0aDogMTAwJTtcbn1cblxuOjpuZy1kZWVwIC5vd2wtZHQtY29udGFpbmVyIHtcbiAgZm9udC1zaXplOiAxZW07XG59XG46Om5nLWRlZXAgLm93bC1kdC1jb250YWluZXIgb3dsLWRhdGUtdGltZS1jYWxlbmRhciB7XG4gIGhlaWdodDogMThlbSAhaW1wb3J0YW50O1xufVxuOjpuZy1kZWVwIC5vd2wtZHQtY29udGFpbmVyIC5vd2wtZHQtY2FsZW5kYXItY29udHJvbCB7XG4gIHBhZGRpbmc6IDAgMC41ZW07XG59XG46Om5nLWRlZXAgLm93bC1kdC1jb250YWluZXIgLm93bC1kdC13ZWVrZGF5cyB0aCB7XG4gIGxpbmUtaGVpZ2h0OiAxZW0gIWltcG9ydGFudDtcbiAgcGFkZGluZy1ib3R0b206IDAgIWltcG9ydGFudDtcbn1cbjo6bmctZGVlcCAub3dsLWR0LWNvbnRhaW5lciAub3dsLWR0LWNhbGVuZGFyLXRhYmxlLWRpdmlkZXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuOjpuZy1kZWVwIC5vd2wtZHQtY29udGFpbmVyIC5vd2wtZHQtdGltZXItY29udGVudCB7XG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcbn1cbjo6bmctZGVlcCAub3dsLWR0LWNvbnRhaW5lciAub3dsLWR0LXRpbWVyLWlucHV0IHtcbiAgaGVpZ2h0OiAxLjNlbTtcbiAgZm9udC1zaXplOiAxZW0gIWltcG9ydGFudDtcbn1cbjo6bmctZGVlcCAub3dsLWR0LWNvbnRhaW5lciAub3dsLWR0LXRpbWVyIHtcbiAgcGFkZGluZzogMDtcbiAgaGVpZ2h0OiA0LjVlbTtcbn1cbjo6bmctZGVlcCAub3dsLWR0LWNvbnRhaW5lciAub3dsLWR0LXRpbWVyIC5vd2wtZHQtdGltZXItZGl2aWRlcjo6YmVmb3JlLCA6Om5nLWRlZXAgLm93bC1kdC1jb250YWluZXIgLm93bC1kdC10aW1lciAub3dsLWR0LXRpbWVyLWRpdmlkZXI6OmFmdGVyIHtcbiAgd2lkdGg6IDA7XG4gIGhlaWdodDogMDtcbiAgY29udGVudDogXCLigKJcIjtcbn1cbjo6bmctZGVlcCAub3dsLWR0LWNvbnRhaW5lciAub3dsLWR0LXRpbWVyIC5vd2wtZHQtdGltZXItZGl2aWRlcjpiZWZvcmUge1xuICB0b3A6IDIwJTtcbn1cbjo6bmctZGVlcCAub3dsLWR0LWNvbnRhaW5lciAub3dsLWR0LXRpbWVyIC5vd2wtZHQtdGltZXItZGl2aWRlcjphZnRlciB7XG4gIGJvdHRvbTogNjAlO1xufVxuOjpuZy1kZWVwIC5vd2wtZHQtY29udGFpbmVyIC5vd2wtZHQtdGltZXIgLm93bC1kdC1jb250cm9sLWFycm93LWJ1dHRvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG59IiwiLyogQ29weXJpZ2h0IDIwMTkgVk13YXJlLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIC0tIFZNd2FyZSBDb25maWRlbnRpYWwgKi9cblxuJGlucHV0LXdpZHRoOiA3cmVtO1xuJHJhbmdlLWlucHV0LXdpZHRoOiAkaW5wdXQtd2lkdGggKiAyO1xuLy9vd2wtZGF0ZS10aW1lIGlzIGEgdGhpcmQtcGFydHkgcGx1Z2luIHdob3NlIGVsZW1lbnRzIGFyZSBiYXNlZCBvbiB0aGUgZm9udCBzaXplIG9mIHRoaXMgY29tcG9uZW50LFxuLy9zbyBoZXJlIHdlIHVzZSBcImVtXCIgaW5zdGVhZCBvZiBcInJlbVwiIHRvIGRlZmluZSBpdHMgZWxlbWVudCBzaXplLlxuJGR0LWJhc2lzLXNpemU6IDFlbTsgLy8gMTNweFxuJGR0LWNhbGVuZGFyLWhlaWdodDogMThlbTtcbiRkdC1jYWxlbmRhci1jb250cm9sLXBhZGRpbmc6IDAuNWVtO1xuJGR0LXdlZWtkYXlzLXRoLWhlaWdodDogMWVtO1xuJGR0LXRpbWVyLWlucHV0LWhlaWdodDogMS4zZW07XG4kZHQtdGltZXItaW5wdXQtZm9udC1zaXplOiAxZW07XG4kZHQtdGltZXItaGVpZ2h0OiA0LjVlbTtcbiRkdC10aW1lci1kaXZpZGVyLXdpZHRoOiAwLjJlbTtcblxuOmhvc3Qge1xuICAgLy8gaWYgdGhlIGRhdGUgcGlja2VyIGlzIGZvciBhIHBlcmlvZCwgbWFrZSB0aGUgaW5wdXQgdHdpY2Ugd2lkZXJcbiAgICZbbmctcmVmbGVjdC1zZWxlY3QtbW9kZT1cInJhbmdlXCJdIC5jbHItY29udHJvbC1jb250YWluZXIge1xuICAgICAgd2lkdGg6ICRyYW5nZS1pbnB1dC13aWR0aCAhaW1wb3J0YW50O1xuICAgfVxufVxuXG4uaG9yaXpvbnRhbC1sYXlvdXQge1xuICAgZGlzcGxheTogZmxleDtcbiAgIGZsZXg6IDEgMCAwcmVtO1xuICAgZmxleC1kaXJlY3Rpb246IHJvdyAhaW1wb3J0YW50O1xuICAgZmxleC13cmFwOiB3cmFwO1xuICAgLmNsci1mb3JtLWNvbnRyb2wge1xuICAgICAgZmxleC1kaXJlY3Rpb246IHJvdyAhaW1wb3J0YW50O1xuICAgfVxufVxuXG46Om5nLWRlZXAgLmNsci1mb3JtLWNvbnRyb2wge1xuICAgbWFyZ2luLXRvcDogMDtcbn1cblxuLmNsci1jb250cm9sLWxhYmVsIHtcbiAgIG1hcmdpbjogOHB4IDhweCAwIDA7XG59XG5cbi5jbHItY29udHJvbC1jb250YWluZXIge1xuICAgbWFyZ2luLXJpZ2h0OiAxMnB4O1xufVxuXG4uZGF0ZXRpbWUtcGlja2VyLWxhYmVsIHtcbiAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi5jbHItY29udHJvbC1jb250YWluZXIge1xuICAgd2lkdGg6ICRpbnB1dC13aWR0aDtcbiAgIC5jbHItaW5wdXQtd3JhcHBlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgOjpuZy1kZWVwIC5jbHItZm9ybS1jb250cm9sIHtcbiAgICAgICAgIGZsZXg6IDEgMCAwcmVtO1xuICAgICAgICAgKiB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgIH1cbiAgICAgIH1cbiAgIH1cbn1cblxuOjpuZy1kZWVwIC5vd2wtZHQtY29udGFpbmVyIHtcbiAgIC8vIEFkanVzdCB0aGUgcGlja2VyIHRvIG5vcm1hbCBzaXplLlxuICAgZm9udC1zaXplOiAkZHQtYmFzaXMtc2l6ZTtcblxuICAgb3dsLWRhdGUtdGltZS1jYWxlbmRhciB7XG4gICAgICBoZWlnaHQ6ICRkdC1jYWxlbmRhci1oZWlnaHQgIWltcG9ydGFudDtcbiAgIH1cbiAgIC5vd2wtZHQtY2FsZW5kYXItY29udHJvbHtcbiAgICAgIHBhZGRpbmc6IDAgJGR0LWNhbGVuZGFyLWNvbnRyb2wtcGFkZGluZztcbiAgIH1cbiAgIC5vd2wtZHQtd2Vla2RheXMgdGgge1xuICAgICAgbGluZS1oZWlnaHQ6ICRkdC13ZWVrZGF5cy10aC1oZWlnaHQgIWltcG9ydGFudDtcbiAgICAgIHBhZGRpbmctYm90dG9tOiAwICFpbXBvcnRhbnQ7XG4gICB9XG4gICAub3dsLWR0LWNhbGVuZGFyLXRhYmxlLWRpdmlkZXIge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgIH1cbiAgIC5vd2wtZHQtdGltZXItY29udGVudCB7XG4gICAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG4gICB9XG4gICAub3dsLWR0LXRpbWVyLWlucHV0IHtcbiAgICAgIGhlaWdodDogJGR0LXRpbWVyLWlucHV0LWhlaWdodDtcbiAgICAgIGZvbnQtc2l6ZTogJGR0LXRpbWVyLWlucHV0LWZvbnQtc2l6ZSAhaW1wb3J0YW50O1xuICAgfVxuICAgLm93bC1kdC10aW1lciB7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgICAgaGVpZ2h0OiAkZHQtdGltZXItaGVpZ2h0O1xuICAgICAgLm93bC1kdC10aW1lci1kaXZpZGVyIHtcbiAgICAgICAgICRkdC10aW1lci1kaXZpZGVyLXdpZHRoOiAwLjJlbTtcbiAgICAgICAgICY6OmJlZm9yZSwgJjo6YWZ0ZXIge1xuICAgICAgICAgIC8vIFRoZSB0aGlyZCBwbHVnaW4gdXNlIGNzcyB0byBhZGQgXCI6XCIgYmV0d2VlbiBob3VyIGFuZCBtaW51dGUsXG4gICAgICAgICAgLy8gYnV0IHRoZSBkb3Qgc2hhcGUgY2hhbmdlcyB3aXRoIGJyb3dzZXIgdHlwZSBhbmQgcmVzb2x1dGlvbiwgc28gaGVyZSB3ZSB1c2UgXCLigKJcIiB0byBkaXNwbGF5IGNvbG9uLlxuICAgICAgICAgIHdpZHRoOiAwO1xuICAgICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgICBjb250ZW50OiBcIuKAolwiO1xuICAgICAgICAgfVxuICAgICAgfVxuICAgICAgLm93bC1kdC10aW1lci1kaXZpZGVyOmJlZm9yZSB7XG4gICAgICAgICB0b3A6IDIwJTtcbiAgICAgIH1cbiAgICAgIC5vd2wtZHQtdGltZXItZGl2aWRlcjphZnRlciB7XG4gICAgICAgICBib3R0b206IDYwJTtcbiAgICAgIH1cbiAgICAgIC5vd2wtZHQtY29udHJvbC1hcnJvdy1idXR0b24ge1xuICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIH1cbiAgfVxufSJdfQ== */");

/***/ }),

/***/ "./src/app/component/grid-view.component.ts":
/*!**************************************************!*\
  !*** ./src/app/component/grid-view.component.ts ***!
  \**************************************************/
/*! exports provided: SvsStatisticsGridView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SvsStatisticsGridView", function() { return SvsStatisticsGridView; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let SvsStatisticsGridView = class SvsStatisticsGridView {
    constructor() {
        this.userFilter = new UserFilter();
    }
    ngOnInit() {
        if (this.dailyData && this.dailyData.length) {
            let userData = {};
            this.dailyData.forEach(daily => {
                console.log(daily);
                const username = daily.username;
                userData[username] = userData[username] || {};
                userData[username].user = username;
                userData[username].allSvsIds = userData[username].allSvsIds || [];
                userData[username].fastsvsIds = userData[username].fastsvsIds || [];
                userData[username].fastsvsCandidatesIds = userData[username].fastsvsCandidatesIds || [];
                userData[username].notSupportedIds = userData[username].notSupportedIds || [];
                userData[username].total = userData[username].total || 0;
                userData[username].fastsvs = userData[username].fastsvs || 0;
                userData[username].candidate = userData[username].candidate || 0;
                userData[username].notSupported = userData[username].notSupported || 0;
                userData[username].total += daily.total;
                userData[username].allSvsIds.push(...daily.allSvsId);
                userData[username].fastsvs += daily.fastsvs;
                userData[username].fastsvsIds.push(...daily.fastsvsId);
                userData[username].candidate += daily.canBeFastSvs;
                userData[username].fastsvsCandidatesIds.push(...daily.candidateId);
                userData[username].notSupported += daily.notSupported;
                userData[username].notSupportedIds.push(...daily.allSvsId.filter(svs => daily.fastsvsId.indexOf(svs) === -1 && daily.candidateId.indexOf(svs) === -1));
            });
            this.gridData = Object.values(userData);
        }
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], SvsStatisticsGridView.prototype, "dailyData", void 0);
SvsStatisticsGridView = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "svs-statistic-grid-view",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./grid-view.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/grid-view.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./grid-view.scss */ "./src/app/component/grid-view.scss")).default]
    })
], SvsStatisticsGridView);

class UserFilter {
    accepts(record, search) {
        return record.user.toLowerCase().indexOf(search) >= 0;
    }
}


/***/ }),

/***/ "./src/app/component/grid-view.scss":
/*!******************************************!*\
  !*** ./src/app/component/grid-view.scss ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".links-container {\n  display: flex;\n  max-width: 20rem;\n  flex-wrap: wrap;\n  margin-top: 6px;\n}\n.links-container a {\n  margin-right: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sem9lL1Byb2plY3Qvc2xhY2tib3QtYXBwL3NyYy9hcHAvY29tcG9uZW50L2dyaWQtdmlldy5zY3NzIiwic3JjL2FwcC9jb21wb25lbnQvZ3JpZC12aWV3LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRyxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBQ0NIO0FEQ0c7RUFDRyxrQkFBQTtBQ0NOIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50L2dyaWQtdmlldy5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxpbmtzLWNvbnRhaW5lciB7XG4gICBkaXNwbGF5OiBmbGV4O1xuICAgbWF4LXdpZHRoOiAyMHJlbTtcbiAgIGZsZXgtd3JhcDogd3JhcDtcbiAgIG1hcmdpbi10b3A6IDZweDtcblxuICAgYSB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDEycHg7XG4gICB9XG59IiwiLmxpbmtzLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIG1heC13aWR0aDogMjByZW07XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgbWFyZ2luLXRvcDogNnB4O1xufVxuLmxpbmtzLWNvbnRhaW5lciBhIHtcbiAgbWFyZ2luLXJpZ2h0OiAxMnB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/component/records.component.ts":
/*!************************************************!*\
  !*** ./src/app/component/records.component.ts ***!
  \************************************************/
/*! exports provided: FastSvsRecordsGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FastSvsRecordsGrid", function() { return FastSvsRecordsGrid; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _service_fastsvs_records_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/fastsvs-records.service */ "./src/app/service/fastsvs-records.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let FastSvsRecordsGrid = class FastSvsRecordsGrid {
    constructor(service) {
        this.service = service;
        this._filterSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this._filterSpec = {};
        this.loading = true;
        this.currentPageIndex = 1;
        this.startIndex = 0;
        this.sort = "timestamp";
        this.order = "desc";
        this.loadData = () => {
            this._filterSubject.next();
        };
    }
    set filterSpec(val) {
        this._filterSpec = val;
        this.startIndex = 0;
        this.currentPageIndex = 1;
        this.loadData();
    }
    get filterSpec() {
        return this._filterSpec;
    }
    set selectedRange(val) {
        this._timeRange = val;
        this.startIndex = 0;
        this.currentPageIndex = 1;
        this.loadData();
    }
    ngOnInit() {
        this._filterSubject
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(() => this.service.query(this.getQueryParams())))
            .subscribe((records) => {
            this.records = records.record;
            this.total = records.total;
            this.loading = false;
        });
    }
    getQueryParams() {
        const params = {
            user: this.filterSpec.user || "",
            team: this.filterSpec.team || "",
            branch: this.filterSpec.branch || "",
            start: this.startIndex,
            date: this.filterSpec.date ? this.filterSpec.date.getTime() : null,
            length: 100,
            sort: this.sort,
            order: this.order,
            includeTestRecords: this.filterSpec.includeTestRecords,
            startTime: this._timeRange ? this._timeRange.start : null,
            endTime: this._timeRange ? this._timeRange.end : null,
        };
        return params;
    }
    refresh(state) {
        this.loading = true;
        // We convert the filters from an array to a map,
        // because that's what our backend-calling service is expecting
        let filters = {};
        if (state.filters) {
            for (let filter of state.filters) {
                let { property, value } = filter;
                filters[property] = [value];
            }
        }
        if (state.page) {
            this.startIndex = state.page.from;
        }
        if (state.sort) {
            this.order = state.sort.reverse ? "desc" : "asc";
            this.sort = state.sort.by;
        }
        this.loadData();
    }
    isErrorRecord(errCode) {
        const err = errCode && errCode.trim();
        return err && ["0", "null"].indexOf(err) === -1;
    }
    getColorIndicator(errCode) {
        if (this.isErrorRecord(errCode)) {
            return "#F52F22";
        }
        return "#48960C";
    }
    isClnValid(cln) {
        return cln && cln !== "0";
    }
    getCommandText(cmd) {
        if (cmd) {
            return this.decodeCommand(cmd);
        }
        return "No Command Avaiable";
    }
    decodeCommand(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
};
FastSvsRecordsGrid.ctorParameters = () => [
    { type: _service_fastsvs_records_service__WEBPACK_IMPORTED_MODULE_2__["FastSvsRecordsService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], FastSvsRecordsGrid.prototype, "filterSpec", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], FastSvsRecordsGrid.prototype, "selectedRange", null);
FastSvsRecordsGrid = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "fastsvs-records-grid",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./records.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/records.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./records.scss */ "./src/app/component/records.scss")).default]
    })
], FastSvsRecordsGrid);



/***/ }),

/***/ "./src/app/component/records.scss":
/*!****************************************!*\
  !*** ./src/app/component/records.scss ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  flex: 1 0 auto;\n}\n\n.datagrid {\n  height: auto !important;\n}\n\n.status-cell {\n  color: #fff;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sem9lL1Byb2plY3Qvc2xhY2tib3QtYXBwL3NyYy9hcHAvY29tcG9uZW50L3JlY29yZHMuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50L3JlY29yZHMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNHLGNBQUE7QUNDSDs7QURFQTtFQUNHLHVCQUFBO0FDQ0g7O0FERUE7RUFDRyxXQUFBO0FDQ0giLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnQvcmVjb3Jkcy5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICAgZmxleDogMSAwIGF1dG87XG59XG5cbi5kYXRhZ3JpZCB7XG4gICBoZWlnaHQ6IGF1dG8gIWltcG9ydGFudDtcbn1cblxuLnN0YXR1cy1jZWxsIHtcbiAgIGNvbG9yOiAjZmZmO1xufSIsIjpob3N0IHtcbiAgZmxleDogMSAwIGF1dG87XG59XG5cbi5kYXRhZ3JpZCB7XG4gIGhlaWdodDogYXV0byAhaW1wb3J0YW50O1xufVxuXG4uc3RhdHVzLWNlbGwge1xuICBjb2xvcjogI2ZmZjtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/component/user-filter.component.ts":
/*!****************************************************!*\
  !*** ./src/app/component/user-filter.component.ts ***!
  \****************************************************/
/*! exports provided: UserFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserFilter", function() { return UserFilter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let UserFilter = class UserFilter {
    constructor() {
        this.includeTestRecords = false;
        this.userFilterChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.filterChange = () => {
            const filterSpec = {
                user: this.username,
                team: this.team,
                branch: this.branch,
                date: this.dateFilter,
                includeTestRecords: this.includeTestRecords,
            };
            this.userFilterChange.emit(filterSpec);
        };
        this.dropFilter = (user, team, branch, date) => {
            const filterSpec = {
                user: user,
                team: team,
                branch: branch,
                date: date,
                includeTestRecords: this.includeTestRecords,
            };
            this.userFilterChange.emit(filterSpec);
        };
    }
    set userFilter(val) {
        this._userFilter = val;
    }
    get userFilter() {
        return this._userFilter;
    }
    set dateFilter(val) {
        this._dateFilter = val;
    }
    get dateFilter() {
        return this._dateFilter;
    }
    set teamFilter(val) {
        this._teamFilter = val;
    }
    get teamFilter() {
        return this._teamFilter;
    }
    set branchFilter(val) {
        this._branchFilter = val;
    }
    get branchFilter() {
        return this._branchFilter;
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], UserFilter.prototype, "userFilterChange", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], UserFilter.prototype, "userFilter", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], UserFilter.prototype, "dateFilter", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], UserFilter.prototype, "teamFilter", null);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], UserFilter.prototype, "branchFilter", null);
UserFilter = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "user-filter",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./user-filter.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/user-filter.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./user-filter.scss */ "./src/app/component/user-filter.scss")).default]
    })
], UserFilter);



/***/ }),

/***/ "./src/app/component/user-filter.scss":
/*!********************************************!*\
  !*** ./src/app/component/user-filter.scss ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".clr-form {\n  padding-left: 0;\n}\n.clr-form .clr-form-control {\n  margin-top: 6px;\n}\n.clr-form .clr-form-control .clr-control-label {\n  min-width: 150px;\n}\n.clr-form .clr-row {\n  margin-left: 0;\n}\n.clr-form .btn-close {\n  margin-left: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sem9lL1Byb2plY3Qvc2xhY2tib3QtYXBwL3NyYy9hcHAvY29tcG9uZW50L3VzZXItZmlsdGVyLnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudC91c2VyLWZpbHRlci5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0csZUFBQTtBQ0NIO0FEQ0c7RUFDRyxlQUFBO0FDQ047QURDTTtFQUNHLGdCQUFBO0FDQ1Q7QURHRztFQUNHLGNBQUE7QUNETjtBRElHO0VBQ0csaUJBQUE7QUNGTiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC91c2VyLWZpbHRlci5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNsci1mb3JtIHtcbiAgIHBhZGRpbmctbGVmdDogMDtcblxuICAgLmNsci1mb3JtLWNvbnRyb2wge1xuICAgICAgbWFyZ2luLXRvcDogNnB4O1xuXG4gICAgICAuY2xyLWNvbnRyb2wtbGFiZWwge1xuICAgICAgICAgbWluLXdpZHRoOiAxNTBweDtcbiAgICAgIH1cbiAgIH1cblxuICAgLmNsci1yb3cge1xuICAgICAgbWFyZ2luLWxlZnQ6IDA7XG4gICB9XG5cbiAgIC5idG4tY2xvc2Uge1xuICAgICAgbWFyZ2luLWxlZnQ6IDEycHg7XG4gICB9XG59IiwiLmNsci1mb3JtIHtcbiAgcGFkZGluZy1sZWZ0OiAwO1xufVxuLmNsci1mb3JtIC5jbHItZm9ybS1jb250cm9sIHtcbiAgbWFyZ2luLXRvcDogNnB4O1xufVxuLmNsci1mb3JtIC5jbHItZm9ybS1jb250cm9sIC5jbHItY29udHJvbC1sYWJlbCB7XG4gIG1pbi13aWR0aDogMTUwcHg7XG59XG4uY2xyLWZvcm0gLmNsci1yb3cge1xuICBtYXJnaW4tbGVmdDogMDtcbn1cbi5jbHItZm9ybSAuYnRuLWNsb3NlIHtcbiAgbWFyZ2luLWxlZnQ6IDEycHg7XG59Il19 */");

/***/ }),

/***/ "./src/app/component/users.component.ts":
/*!**********************************************!*\
  !*** ./src/app/component/users.component.ts ***!
  \**********************************************/
/*! exports provided: UserListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserListComponent", function() { return UserListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _service_fastsvs_records_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/fastsvs-records.service */ "./src/app/service/fastsvs-records.service.ts");
var UserListComponent_1;



let UserListComponent = UserListComponent_1 = class UserListComponent {
    constructor(service) {
        this.service = service;
        this.sortByOpts = ["user", "count"];
        this.currentSort = "user";
        this.userClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.load = (sort) => {
            if (sort) {
                this.currentSort = sort;
                this.users = null;
            }
            this.service.getUsers(this.currentSort).then(userData => {
                this.users = userData;
            });
        };
        // Preserve original property order
        this.originalOrder = (a, b) => {
            return 0;
        };
    }
    ngOnInit() {
        this.load();
    }
    isValidUser(user) {
        return !UserListComponent_1.FAKE_USERS.some(u => u === user);
    }
    get userCount() {
        if (!this.users) {
            return null;
        }
        let count = 0;
        Object.keys(this.users).forEach(item => {
            if (this.isValidUser(item)) {
                count++;
            }
        });
        return count;
    }
    applyUserFilter(user) {
        this.userClicked.emit(user);
    }
};
UserListComponent.FAKE_USERS = ["lanny", "rogerw", "svc.vsan-er", "mts-automation", "zxinyu"];
UserListComponent.ctorParameters = () => [
    { type: _service_fastsvs_records_service__WEBPACK_IMPORTED_MODULE_2__["FastSvsRecordsService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], UserListComponent.prototype, "userClicked", void 0);
UserListComponent = UserListComponent_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "user-list",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./users.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/component/users.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./users.scss */ "./src/app/component/users.scss")).default]
    })
], UserListComponent);



/***/ }),

/***/ "./src/app/component/users.scss":
/*!**************************************!*\
  !*** ./src/app/component/users.scss ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  margin: 12px;\n}\n\nlabel {\n  white-space: nowrap;\n}\n\n.title-section {\n  display: flex;\n}\n\n.active-user {\n  display: flex;\n  justify-content: space-between;\n  min-width: 160px;\n  margin-bottom: 8px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sem9lL1Byb2plY3Qvc2xhY2tib3QtYXBwL3NyYy9hcHAvY29tcG9uZW50L3VzZXJzLnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudC91c2Vycy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0csWUFBQTtBQ0NIOztBRENBO0VBQ0csbUJBQUE7QUNFSDs7QURBQTtFQUNHLGFBQUE7QUNHSDs7QUREQTtFQUNHLGFBQUE7RUFDQSw4QkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUNJSCIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudC91c2Vycy5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICAgbWFyZ2luOiAxMnB4O1xufVxubGFiZWwge1xuICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cbi50aXRsZS1zZWN0aW9uIHtcbiAgIGRpc3BsYXk6IGZsZXg7XG59XG4uYWN0aXZlLXVzZXIge1xuICAgZGlzcGxheTogZmxleDtcbiAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgIG1pbi13aWR0aDogMTYwcHg7XG4gICBtYXJnaW4tYm90dG9tOiA4cHg7XG59IiwiOmhvc3Qge1xuICBtYXJnaW46IDEycHg7XG59XG5cbmxhYmVsIHtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLnRpdGxlLXNlY3Rpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4uYWN0aXZlLXVzZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIG1pbi13aWR0aDogMTYwcHg7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/home/home.component.scss":
/*!******************************************!*\
  !*** ./src/app/home/home.component.scss ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".clr-row {\n  padding-left: 12px;\n  display: flex;\n  flex-direction: column;\n}\n\n.record-container {\n  max-width: 55rem;\n  padding-left: 12px;\n  display: flex;\n  flex: 1 0 auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sem9lL1Byb2plY3Qvc2xhY2tib3QtYXBwL3NyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9ob21lL2hvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRyxrQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBQ0NIOztBREVBO0VBQ0csZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0FDQ0giLCJmaWxlIjoic3JjL2FwcC9ob21lL2hvbWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2xyLXJvdyB7XG4gICBwYWRkaW5nLWxlZnQ6IDEycHg7XG4gICBkaXNwbGF5OiBmbGV4O1xuICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLnJlY29yZC1jb250YWluZXIge1xuICAgbWF4LXdpZHRoOiA1NXJlbTtcbiAgIHBhZGRpbmctbGVmdDogMTJweDtcbiAgIGRpc3BsYXk6IGZsZXg7XG4gICBmbGV4OiAxIDAgYXV0bztcbn1cbiIsIi5jbHItcm93IHtcbiAgcGFkZGluZy1sZWZ0OiAxMnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4ucmVjb3JkLWNvbnRhaW5lciB7XG4gIG1heC13aWR0aDogNTVyZW07XG4gIHBhZGRpbmctbGVmdDogMTJweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleDogMSAwIGF1dG87XG59Il19 */");

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let HomeComponent = class HomeComponent {
    constructor() {
        this.filterSpec = {};
        this.gridTabActive = true;
        this.showDetailedPointData = (point) => {
            this.gridTabActive = true;
            if (point.team) {
                this.filterSpec = {
                    team: point.team,
                    date: point.date,
                };
            }
        };
    }
    acceptFilter(filterSpec) {
        this.filterSpec = filterSpec;
    }
};
HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./home.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./home.component.scss */ "./src/app/home/home.component.scss")).default]
    })
], HomeComponent);



/***/ }),

/***/ "./src/app/service/fastsvs-records.service.ts":
/*!****************************************************!*\
  !*** ./src/app/service/fastsvs-records.service.ts ***!
  \****************************************************/
/*! exports provided: FastSvsRecordsService, HttpOptions, HttpHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FastSvsRecordsService", function() { return FastSvsRecordsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpOptions", function() { return HttpOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpHeader", function() { return HttpHeader; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");



let FastSvsRecordsService = class FastSvsRecordsService {
    constructor(http) {
        this.http = http;
        this.query = (params) => {
            const queryUrl = "/fastsvs/queryjson" + this.toUrlParams(params);
            return this._get(queryUrl).then((results) => {
                const records = results.data.map(item => {
                    const record = {
                        cln: item["cln"] || "",
                        user: item["user"],
                        type: item["type"],
                        team: item["plugin"],
                        branch: item["branch"],
                        svsid: item["svsid"],
                        timestamp: item["timestamp"],
                        originSvs: item["originsvs"],
                        errorCode: item["errCode"],
                        subErrCode: item["subErrCode"],
                        runCmd: item["runCmd"]
                    };
                    return record;
                });
                const data = {
                    record: records,
                    total: results["querynum"],
                };
                return data;
            });
        };
        this.getUsers = (sort) => {
            return this._get("/fastsvs/topjson" + this.toUrlParams({ sort: sort }));
        };
        this.getGroups = (params = {}) => {
            return this._get("/fastsvs/groups" + this.toUrlParams(params));
        };
        this.getGroupsTrend = (params = {}) => {
            return this._get("/fastsvs/groups/trend" + this.toUrlParams(params));
        };
        this.getErrors = (params = {}) => {
            return this._get("/fastsvs/errors" + this.toUrlParams(params));
        };
        this.getDrillDown = (errCode) => {
            return this._get("/fastsvs/drilldown?errCode=" + errCode);
        };
        this.getSvsTimeDetail = (svsid) => {
            return this._get("/fastsvs/analyser?svsid=" + svsid);
        };
        this.getDurationRatio = () => {
            return this._get("/fastsvs/durationRatio");
        };
        this.getTeamList = () => {
            return this._get("/fastsvs/team/list");
        };
        this.getCandidateRatio = (params = {}) => {
            return this._get("fastsvs/fastsvs/candidates" + this.toUrlParams(params));
        };
        this.getVsan2Trend = (params = {}) => {
            return this._get("fastsvs/fastsvs/vsan2" + this.toUrlParams(params));
        };
        this.getUserRecordCount = (params = {}) => {
            return this._get("fastsvs/personal/recent" + this.toUrlParams(params));
        };
        this.getActiveUser = (params = {}) => {
            return this._get("fastsvs/user/active" + this.toUrlParams(params));
        };
        this.getSvsDeployDurationRatio = () => {
            return this._get("/fastsvs/suitesDuration").then((data) => {
                let normalRecords = data.filter(record => !record.fastsvs);
                let fastsvsRecords = data.filter(record => record.fastsvs);
                return {
                    fast: this.calculateRatio(fastsvsRecords),
                    original: this.calculateRatio(normalRecords)
                };
            });
        };
        this.getSvsVsanTrend = (params = {}) => {
            return this._get("fastsvs/vsanTrend" + this.toUrlParams(params));
        };
        this.getTotData = (params = {}) => {
            return this._get("/fastsvs/totStatistics" + this.toUrlParams(params));
        };
        this._get = (url) => {
            return this.http.get(url, this.getNoCacheRequestOptions()).toPromise();
        };
    }
    calculateRatio(svsRecords) {
        const groups = [15, 30, 45, 60, 75];
        let result = {};
        const totalRecords = svsRecords.length;
        groups.forEach((group, index) => {
            if (index === 0) {
                result[`${group}m`] = ((svsRecords.filter(record => record.minutes <= group).length / totalRecords));
            }
            else {
                result[`${group}m`] = ((svsRecords.filter(record => record.minutes <= group && record.minutes > groups[index - 1]).length / totalRecords));
            }
        });
        return result;
    }
    /**
     * Returns HttpOptions preconfigured with headers that imply no caching.
     */
    getNoCacheRequestOptions() {
        const options = new HttpOptions();
        let headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]();
        // Add cache control headers to avoid data caching in IE browser
        headers = headers.append(HttpHeader.CACHE_CONTROL, HttpHeader.NO_CACHE);
        headers = headers.append(HttpHeader.PRAGMA, HttpHeader.NO_CACHE);
        headers = headers.append(HttpHeader.EXPIRES, "Sat, 01 Jan 2000 00:00:00 GMT");
        options.headers = headers;
        return options;
    }
    /**
     * Converts the given object to a string that can be used directly as part of the HTTP GET URL request.
     * @param body
     */
    toUrlParams(body) {
        let requestParams = "";
        if (body) {
            const chunks = [];
            for (const prop in body) {
                if (!body.hasOwnProperty(prop)) {
                    continue;
                }
                const value = body[prop];
                if (value) {
                    chunks.push(`${prop}=${value}`);
                }
            }
            requestParams = encodeURI("?" + chunks.join("&"));
        }
        return requestParams;
    }
};
FastSvsRecordsService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
FastSvsRecordsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])()
], FastSvsRecordsService);

/**
 * Options passed
 */
class HttpOptions {
}
/**
 * Standardized and VMware-specific HTTP headers.
 */
class HttpHeader {
}
HttpHeader.CONTENT_TYPE = "Content-Type";
HttpHeader.APPLICATION_JSON = "application/json";
HttpHeader.ACCEPT = "Accept";
HttpHeader.AUTHORIZATION = "Authorization";
HttpHeader.VMWARE_USER_HEADER_AUTHN = "vmware-use-header-authn";
HttpHeader.VAPI_HEADER_API_SESSION_ID = "vmware-api-session-id";
HttpHeader.VSPHERE_UI_XSRF_TOKEN = "X-VSPHERE-UI-XSRF-TOKEN";
HttpHeader.CACHE_CONTROL = "Cache-Control";
HttpHeader.NO_CACHE = "no-cache";
HttpHeader.PRAGMA = "Pragma";
HttpHeader.EXPIRES = "Expires";
HttpHeader.WEB_CLIENT_SESSION_ID = "webClientSessionId";
HttpHeader.SIGN_TOKEN = (tokenValue) => {
    return `SIGN token = "${tokenValue}"`;
};


/***/ }),

/***/ "./src/app/single-svs-details/single-svs-details.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/single-svs-details/single-svs-details.component.ts ***!
  \********************************************************************/
/*! exports provided: SingleSvsDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SingleSvsDetailsComponent", function() { return SingleSvsDetailsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _component_chart_container_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component/chart-container.component */ "./src/app/component/chart-container.component.ts");



let SingleSvsDetailsComponent = class SingleSvsDetailsComponent {
    constructor() {
        this.ChartTypes = _component_chart_container_component__WEBPACK_IMPORTED_MODULE_2__["ChartTypes"];
    }
};
SingleSvsDetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: "single-svs-details",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./single-svs-details.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/single-svs-details/single-svs-details.html")).default
    })
], SingleSvsDetailsComponent);



/***/ }),

/***/ "./src/app/tot-statistics/tot-statistics.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/tot-statistics/tot-statistics.component.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".container {\n  display: flex;\n}\n\n::ng-deep chart {\n  width: 100%;\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sem9lL1Byb2plY3Qvc2xhY2tib3QtYXBwL3NyYy9hcHAvdG90LXN0YXRpc3RpY3MvdG90LXN0YXRpc3RpY3MuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3RvdC1zdGF0aXN0aWNzL3RvdC1zdGF0aXN0aWNzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0csYUFBQTtBQ0NIOztBREVBO0VBQ0csV0FBQTtFQUNBLGNBQUE7QUNDSCIsImZpbGUiOiJzcmMvYXBwL3RvdC1zdGF0aXN0aWNzL3RvdC1zdGF0aXN0aWNzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lciB7XG4gICBkaXNwbGF5OiBmbGV4O1xufVxuXG46Om5nLWRlZXAgY2hhcnQge1xuICAgd2lkdGg6IDEwMCU7XG4gICBkaXNwbGF5OiBibG9jaztcbn0iLCIuY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuOjpuZy1kZWVwIGNoYXJ0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGJsb2NrO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/tot-statistics/tot-statistics.component.ts":
/*!************************************************************!*\
  !*** ./src/app/tot-statistics/tot-statistics.component.ts ***!
  \************************************************************/
/*! exports provided: TotStatisticsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TotStatisticsComponent", function() { return TotStatisticsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _service_fastsvs_records_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/fastsvs-records.service */ "./src/app/service/fastsvs-records.service.ts");



let TotStatisticsComponent = class TotStatisticsComponent {
    constructor(service) {
        this.service = service;
        this.loading = false;
        this.chartOptions = null;
        this.onDateRangeChange = (dateRange) => {
            this.fetch(dateRange);
        };
    }
    ngOnInit() {
    }
    fetch(dateRange) {
        const params = {
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
    getChartOptions(totData) {
        let total = totData.total;
        let tot = totData.tot;
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
                            y: parseFloat(((total - tot) / total).toFixed(2)),
                            sliced: true,
                            selected: true
                        }, {
                            name: 'TOT',
                            y: parseFloat(((tot) / total).toFixed(2))
                        }]
                }]
        };
    }
};
TotStatisticsComponent.ctorParameters = () => [
    { type: _service_fastsvs_records_service__WEBPACK_IMPORTED_MODULE_2__["FastSvsRecordsService"] }
];
TotStatisticsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-tot-statistics',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./tot-statistics.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/tot-statistics/tot-statistics.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./tot-statistics.component.scss */ "./src/app/tot-statistics/tot-statistics.component.scss")).default]
    })
], TotStatisticsComponent);



/***/ }),

/***/ "./src/app/user-rank/user-rank.component.ts":
/*!**************************************************!*\
  !*** ./src/app/user-rank/user-rank.component.ts ***!
  \**************************************************/
/*! exports provided: UserRankComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRankComponent", function() { return UserRankComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _service_fastsvs_records_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/fastsvs-records.service */ "./src/app/service/fastsvs-records.service.ts");



let UserRankComponent = class UserRankComponent {
    constructor(service) {
        this.service = service;
        this.toFlat = (data) => {
            let result = {};
            data.forEach(record => {
                result[record._id] = record.count;
            });
            return result;
        };
        this.calculateRank = (data1, data2, reverse) => {
            console.log(data1);
            console.log(data2);
            let result = [];
            Object.keys(data1).forEach(key => {
                result.push({
                    user: key,
                    change: data1[key] - (data2[key] || 0)
                });
            });
            result.sort((a, b) => a.change - b.change);
            if (reverse) {
                result.reverse();
            }
            return result;
        };
        this.getRankLabel = (data) => {
            return `${data.user} (${data.change})`;
        };
        this.getShape = (change) => {
            if (change >= 0) {
                return "check-circle";
            }
            return "error";
        };
    }
    ngOnInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let startTime = new Date();
            startTime.setHours(0);
            startTime.setMinutes(0);
            startTime.setSeconds(0);
            startTime.setMilliseconds(0);
            startTime.setDate(startTime.getDate() - 14);
            const millisecondsOfWeek = 7 * 24 * 60 * 60 * 1000;
            const middleTime = startTime.getTime() + millisecondsOfWeek;
            this.loading = true;
            let promises = [];
            promises.push(this.service.getUserRecordCount({
                start: startTime.getTime(),
                end: middleTime
            }));
            promises.push(this.service.getUserRecordCount({
                start: middleTime,
                end: middleTime + millisecondsOfWeek
            }));
            [this.earlyWeekData, this.recentWeekData] = yield Promise.all(promises);
            let earlyWeekJson = this.toFlat(this.earlyWeekData);
            let recentWeekJson = this.toFlat(this.recentWeekData);
            this.rankData = this.calculateRank(recentWeekJson, earlyWeekJson, true);
            this.loading = false;
        });
    }
};
UserRankComponent.ctorParameters = () => [
    { type: _service_fastsvs_records_service__WEBPACK_IMPORTED_MODULE_2__["FastSvsRecordsService"] }
];
UserRankComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        "selector": "user-rank",
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./user-rank.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/user-rank/user-rank.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./user-rank.scss */ "./src/app/user-rank/user-rank.scss")).default]
    })
], UserRankComponent);



/***/ }),

/***/ "./src/app/user-rank/user-rank.scss":
/*!******************************************!*\
  !*** ./src/app/user-rank/user-rank.scss ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".green {\n  fill: #5aa220;\n}\n\n.red {\n  fill: #f51b00;\n}\n\n.list-unstyled {\n  margin: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9sem9lL1Byb2plY3Qvc2xhY2tib3QtYXBwL3NyYy9hcHAvdXNlci1yYW5rL3VzZXItcmFuay5zY3NzIiwic3JjL2FwcC91c2VyLXJhbmsvdXNlci1yYW5rLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRyxhQUFBO0FDQ0g7O0FERUE7RUFDRyxhQUFBO0FDQ0g7O0FERUE7RUFDRyxZQUFBO0FDQ0giLCJmaWxlIjoic3JjL2FwcC91c2VyLXJhbmsvdXNlci1yYW5rLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZ3JlZW4ge1xuICAgZmlsbDogIzVhYTIyMDtcbn1cblxuLnJlZCB7XG4gICBmaWxsOiAjZjUxYjAwO1xufVxuXG4ubGlzdC11bnN0eWxlZCB7XG4gICBtYXJnaW46IDEycHg7XG59IiwiLmdyZWVuIHtcbiAgZmlsbDogIzVhYTIyMDtcbn1cblxuLnJlZCB7XG4gIGZpbGw6ICNmNTFiMDA7XG59XG5cbi5saXN0LXVuc3R5bGVkIHtcbiAgbWFyZ2luOiAxMnB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/lzoe/Project/slackbot-app/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map
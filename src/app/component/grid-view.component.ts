import { Component, Input, OnInit} from '@angular/core';
import {ClrDatagridStringFilterInterface} from "@clr/angular";

@Component({
   selector: "svs-statistic-grid-view",
   templateUrl: "./grid-view.html",
   styleUrls: ["grid-view.scss"]
})
export class SvsStatisticsGridView implements OnInit {
   @Input()
   dailyData: any[];

   gridData: any[];

   userFilter: UserFilter = new UserFilter();

   ngOnInit() {
      if (this.dailyData && this.dailyData.length) {
         let userData = {};
         this.dailyData.forEach(daily => {
            console.log(daily)
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
}

class UserFilter implements ClrDatagridStringFilterInterface<any> {
   accepts(record: any, search: string):boolean {
      return record.user.toLowerCase().indexOf(search) >= 0;
   }
}
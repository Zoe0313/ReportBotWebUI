import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FastSvsRecordsService} from '../service/fastsvs-records.service';

@Component({
   selector: "user-list",
   templateUrl: "users.html",
   styleUrls: ["users.scss"]
})
export class UserListComponent implements OnInit {
   users: any;

   sortByOpts: string[] = ["user", "count"];

   currentSort: string = "user";

   @Output()
   userClicked: EventEmitter<string> = new EventEmitter<string>();

   private static readonly FAKE_USERS: string[] = ["lanny", "rogerw", "svc.vsan-er", "mts-automation", "zxinyu"];

   constructor(private service: FastSvsRecordsService) {}

   ngOnInit() {
      this.load();
   }

   isValidUser(user: string): boolean {
      return !UserListComponent.FAKE_USERS.some(u => u === user);
   }

   load = (sort?: string) => {
      if (sort) {
         this.currentSort = sort;
         this.users = null;
      }
      this.service.getUsers(this.currentSort).then(userData => {
         this.users = userData;
      });
   }

   get userCount(): number {
      if (!this.users) {
         return null;
      }
      let count: number = 0;
      Object.keys(this.users).forEach(item => {
         if (this.isValidUser(item)) {
            count++;
         }
      });
      return count;
   }

   applyUserFilter(user: string) {
      this.userClicked.emit(user);
   }

   // Preserve original property order
   originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
      return 0;
   }
}

export interface KeyValue<K, V> {
   key: K,
   value: V,
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cow } from '../models/cow.model';
@Injectable({ providedIn: 'root' })
export class CowService {
 private cows: Cow[] = [];
 private cowsSubject = new BehaviorSubject<Cow[]>(this.cows);
 cows$ = this.cowsSubject.asObservable();
 private filterTag = new BehaviorSubject<string>('');
 private filterPen = new BehaviorSubject<string>('');
 private filterStatus = new BehaviorSubject<string>('');

 filterTag$ = this.filterTag.asObservable();
 filterPen$ = this.filterPen.asObservable();
 filterStatus$ = this.filterStatus.asObservable();
 addCow(cow: Cow) {
cow.id = Date.now();
   this.cows.push(cow);
   this.cowsSubject.next(this.cows);
 }
 getCows() {
   return this.cowsSubject.asObservable();
 }
 getCowById(id: number): Cow | undefined {
   return this.cows.find(c => c.id === id);
 }
 searchAndFilter(tag: string, pen: string, status: string) {
   this.filterTag.next(tag);
   this.filterPen.next(pen);
   this.filterStatus.next(status);
   return this.cows.filter(c =>
     (tag ? c.earTag.toLowerCase().includes(tag.toLowerCase()) : true) &&
     (pen ? c.pen.toLowerCase().includes(pen.toLowerCase()) : true) &&
     (status ? c.status.toLowerCase().includes(status.toLowerCase()) : true)
   );
 }
 getSavedFilters() {
   return {
     tag: this.filterTag.value,
     pen: this.filterPen.value,
     status: this.filterStatus.value
   };
 }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CowService } from '../../services/cow.service';
import { Cow } from '../../models/cow.model';
import { CowDetailComponent } from '../cow-detail/cow-detail.component';
import { CowFormComponent } from '../cow-form/cow-form.component';
@Component({
 selector: 'app-cow-list',
 standalone: true,
 imports: [CommonModule, FormsModule, CowFormComponent, CowDetailComponent],
 templateUrl: './cow-list.component.html',
 styleUrls: ['./cow-list.component.scss']
})
export class CowListComponent implements OnInit {
 cows: Cow[] = [];
 searchTag = '';
 filterPen = '';
 filterStatus = '';
selectedCow: Cow | null = null;
showForm = false;                
constructor(private readonly cowService: CowService) {}
 ngOnInit() {
   this.cowService.getCows().subscribe(data => (this.cows = data));
   const saved = this.cowService.getSavedFilters();
   this.searchTag = saved.tag;
   this.filterPen = saved.pen;
   this.filterStatus = saved.status;
   if (saved.tag || saved.pen || saved.status) {
     this.search();
   }
 }

 search() {
   if (!this.searchTag && !this.filterPen && !this.filterStatus) {
     this.cowService.getCows().subscribe(data => (this.cows = data));
   } else {
     this.cows = this.cowService.searchAndFilter(this.searchTag, this.filterPen, this.filterStatus);
     if (this.cows.length === 0) {
       alert('There is no data matching your search/filter.');
     }
   }
 }
 applySavedFilters() {
   if (this.searchTag || this.filterPen || this.filterStatus) this.search();
 }
 toggleForm() {
   this.showForm = !this.showForm;
 }
 openDetail(cow: Cow) {
   this.selectedCow = cow;
 }
 closeDetail() {
   this.selectedCow = null;
   this.applySavedFilters();
 }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cow } from '../../models/cow.model';
@Component({
 selector: 'app-cow-detail',
 standalone: true,
 imports: [CommonModule],
 templateUrl: './cow-detail.component.html',
 styleUrls: ['./cow-detail.component.scss']
})
export class CowDetailComponent {
 @Input() cow: Cow | null = null;
}

import { Component } from '@angular/core';
import { CowListComponent } from './components/cow-list/cow-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CowListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cow-catlog';
}

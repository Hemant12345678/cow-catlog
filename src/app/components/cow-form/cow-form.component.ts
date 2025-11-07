import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CowService } from '../../services/cow.service';
import { Cow } from '../../models/cow.model';

@Component({
  selector: 'app-cow-form',
  standalone: true,
imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cow-form.component.html',
  styleUrl: './cow-form.component.scss'
})
export class CowFormComponent {
  @Input() closeParentForm?: () => void;
  @Input() refreshList?: () => void;
  form: FormGroup;
  constructor(private readonly cowService: CowService, private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      earTag: ['', Validators.required],
      sex: ['', Validators.required],
      pen: ['', Validators.required],
      status: ['Active', Validators.required],
      weight: [null, [Validators.min(1)]],
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Required fields missing or invalid');
      return;
    }
    const cow: Cow = {
      ...this.form.value,
      lastEventDate: new Date().toISOString(),
      id: 0
    };
    this.cowService.addCow(cow);
  this.form.reset({ sex: '', status: 'Active', weight: null });
    if (this.refreshList) this.refreshList();
    if (this.closeParentForm) this.closeParentForm();
  }
}

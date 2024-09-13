import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-2',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.css',
})
export class Step2Component {
  @Input() formGroup!: FormGroup;
}

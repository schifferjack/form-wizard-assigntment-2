import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-3',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.css',
})
export class Step3Component {
  @Input() formGroup!: FormGroup;
}

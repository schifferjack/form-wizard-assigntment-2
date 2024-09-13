import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.css',
})
export class Step1Component {
  @Input() formGroup!: FormGroup;
}

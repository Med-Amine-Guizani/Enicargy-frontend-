import { Component, Output ,EventEmitter } from '@angular/core';
import { FormBuilder, Validators , FormGroup} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Rapport } from '../../models/rapport';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RapportUploadPayload } from '../../models/rapportuploadplayload';
@Component({
  selector: 'app-rapport-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './rapport-form.component.html',
  styleUrl: './rapport-form.component.css'
})

export class RapportFormComponent {

@Output() rapportAdded = new EventEmitter<RapportUploadPayload>();


  reportForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reportForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      file: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      const formData = new FormData();
      formData.append('title', this.reportForm.value.title);
      formData.append('file', this.reportForm.value.file);
      formData.forEach((val, key) => console.log(key, val));
      this.rapportAdded.emit(
        {
          title: this.reportForm.value.title,
          file: this.reportForm.value.file
        } as RapportUploadPayload
      );
      this.reportForm.reset(); 
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file && file.type === 'application/pdf') {
      this.reportForm.patchValue({ file });
      this.reportForm.get('file')?.updateValueAndValidity();
      
    } else {
      // Handle error: not a PDF
    }
  }
}

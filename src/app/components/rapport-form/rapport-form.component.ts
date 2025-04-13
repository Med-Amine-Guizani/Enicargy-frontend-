import { Component, Output ,EventEmitter } from '@angular/core';
import { FormBuilder, Validators , FormGroup} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Rapport } from '../../models/rapport';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rapport-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './rapport-form.component.html',
  styleUrl: './rapport-form.component.css'
})
export class RapportFormComponent {

@Output() rapportAdded = new EventEmitter<Rapport>();


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
      formData.append('id', uuidv4());
      formData.append('title', this.reportForm.value.title);
      formData.append('file', this.reportForm.value.file);
  
      // For now, just log or store locally
      console.log('Submitting report:', formData);
      // e.g., Save to localStorage or simulate upload
      

      //this article ( new article gonna be the one returned from the backend ( with a real id )  not a temporary one )
      const newReport: Rapport = {
        id: this.reportForm.value.id,
        title: this.reportForm.value.title!,
        date: new Date().toISOString(),
      };

      this.rapportAdded.emit(newReport); 
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

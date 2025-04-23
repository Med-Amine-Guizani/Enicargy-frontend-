import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  result = "";
  registerForm: FormGroup;

  constructor(private fb: FormBuilder , private authService: AuthService) {
    this.registerForm = this.fb.group({
      role: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      
      const formData = this.registerForm.value;
      console.log("Formulaire valide", formData);
      this.authService.register(formData).subscribe(
        response => {
          console.log("Inscription réussie", response);
          this.result="Inscription réussie"
        },
        error => {
          console.error("Erreur lors de l'inscription", error);
          this.result="Erreur lors de l'inscription"
        }
      );
    } else {
      console.log("Formulaire invalide");
      this.result="Erreur"
    }
  }
  
  goToSeConncter() {
    this.authService.goToSeConnecter();

  }
}

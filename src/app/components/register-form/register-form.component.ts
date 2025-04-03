import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      statut: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log("Formulaire soumis avec succès !");
      this.result = "Formulaire soumis avec succès !"; // Affichez ce message dans le template si nécessaire
    } else {
      console.log("Formulaire invalide");
      this.result="Erreur"
    }
  }
  inscrireAvecGoogle(){

  }
  inscrireAvecApple(){
    
  }
}

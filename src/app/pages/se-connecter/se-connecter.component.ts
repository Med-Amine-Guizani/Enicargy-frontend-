import { Component } from '@angular/core';
import{  FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-se-connecter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './se-connecter.component.html',
  styleUrl: './se-connecter.component.css'
})
export class SeConnecterComponent {
  result = "";
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log("connexion soumis avec succès !");
      this.result = "connexion soumis avec succès !"; // Affichez ce message dans le template si nécessaire
    } else {
      console.log("connexion invalide");
      this.result="Erreur"
    }
  }
  inscrireAvecGoogle(){

  }
  inscrireAvecApple(){
    
  }

}

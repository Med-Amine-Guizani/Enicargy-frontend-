import { Component } from '@angular/core';
import{  FormBuilder, FormGroup, Validators ,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Token } from '@angular/compiler';
import { TokenService } from '../../services/TokenService';



@Component({
  selector: 'app-se-connecter',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './se-connecter.component.html',
  styleUrl: './se-connecter.component.css'
})
export class SeConnecterComponent implements OnInit {
  result = "";
  registerForm: FormGroup= new FormGroup({});

  constructor(private fb: FormBuilder , private authService: AuthService , private tokenService:TokenService) {
  }



  ngOnInit(): void {
    this.tokenService.clearToken();
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      terms: [false]
    });
  }


  submit() {
    if (this.registerForm.valid) {
      this.authService.login(this.registerForm.value.email, this.registerForm.value.password).subscribe(
        response => {
          console.log("connexion valide", response);
          this.result="Connexion réussie"
        }
      );
    } else {
      console.log("connexion invalide");
      this.result="Erreur"
    }
  }

  
  goToRegister(){
    this.authService.goToRegister();

  }

}

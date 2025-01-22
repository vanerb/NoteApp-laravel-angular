import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
 form!: FormGroup;



  constructor(
    private readonly authService: AuthServiceService,
  ) {}

  ngOnInit() {
    this.formBuilder();
  }

  formBuilder() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', Validators.required),
    });
  }

  register() {
    let user = {
      name:  this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      password_confirmation: this.form.get('password_confirmation')?.value
    };

    this.authService.register(user).subscribe({
      next: (response) => {
        window.location.href = window.location.origin +"/login"
      },
      error: (err) => {
        console.error('Error al crear el producto:', err);
      },
    });
  }
}

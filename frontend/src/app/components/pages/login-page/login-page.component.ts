import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
 form!: FormGroup;



  constructor(
    private readonly authService: AuthServiceService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.formBuilder();
  }

  formBuilder() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', Validators.required),
    });
  }

  login() {
    let user = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      password_confirmation: this.form.get('password_confirmation')?.value
    };

    this.authService.login(user).subscribe({
      next: (response) => {
        this.authService.saveToken(response.data.token)
        window.location.href = window.location.origin +"/"

      },
      error: (err) => {
        console.error('Error al crear el producto:', err);
      },
    });
  }


}

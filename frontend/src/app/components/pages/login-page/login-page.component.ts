import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { ModalComponentComponent } from '../../general/modal-component/modal-component.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  form!: FormGroup;



  constructor(
    private readonly authService: AuthServiceService,
    private readonly router: Router,
    private readonly modalService: ModalService
  ) { }

  ngOnInit() {
    this.formBuilder();
  }

  formBuilder() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    let user = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };

    this.authService.login(user).subscribe({
      next: (response) => {
        this.authService.saveToken(response.data.token)
        this.authService.saveUser(response.data.user)
        window.location.href = window.location.origin + "/"
      },
      error: (err) => {
        console.error('Error al crear el producto:', err);
        this.modalService.openModal(ModalComponentComponent, {
          data: {
            title: 'Error',
            content: 'El usuario o contraseña no son correctos.',
            isAction: false,
            actionName: 'Aceptar',
            acceptAction: () => {

            },
            cancelAction: () => {
              this.modalService.closeModal()
            }

          },
        });
      },
    });
  }


}

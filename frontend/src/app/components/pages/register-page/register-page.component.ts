import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { ModalComponentComponent } from '../../general/modal-component/modal-component.component';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  form!: FormGroup;



  constructor(
    private readonly authService: AuthServiceService,
    private readonly modalService: ModalService
  ) { }

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
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      role: 'customer',
      password: this.form.get('password')?.value,
      password_confirmation: this.form.get('password_confirmation')?.value
    };

    if (user.password === user.password_confirmation) {
      this.authService.register(user).subscribe({
        next: (response) => {
          window.location.href = window.location.origin + "/login"
        },
        error: (err) => {
          console.log(err)
          if (err.response.data.errors.email) {
            this.modalService.openModal(ModalComponentComponent, {
              data: {
                title: 'Error',
                content: 'Ya existe una cuenta asociado a este correo. Pruebe con otro.',
                isAction: false,
                actionName: 'Aceptar',
                acceptAction: () => {

                },
                cancelAction: () => {
                  this.modalService.closeModal()
                }

              },
            });
          }
          else if (err.response.data.errors.password) {
            this.modalService.openModal(ModalComponentComponent, {
              data: {
                title: 'Error',
                content: 'La contraseña tiene que tener al menos 8 caracteres.',
                isAction: false,
                actionName: 'Aceptar',
                acceptAction: () => {

                },
                cancelAction: () => {
                  this.modalService.closeModal()
                }

              },
            });
          }

        },
      });
    }
    else {
      this.modalService.openModal(ModalComponentComponent, {
        data: {
          title: 'Error',
          content: 'La contraseña debe coincidir',
          isAction: false,
          actionName: 'Aceptar',
          acceptAction: () => {

          },
          cancelAction: () => {
            this.modalService.closeModal()
          }

        },
      });
    }




  }
}

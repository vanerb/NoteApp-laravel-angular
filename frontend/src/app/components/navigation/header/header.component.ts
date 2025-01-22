import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HeaderGeneral } from '../../../commands/general';
import { AuthServiceService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnChanges {
  pagesLeft: HeaderGeneral[] = [
    {
      name: 'Inicio',
      url: '',
      isEnabled: true,
    },
    {
      name: 'Notas',
      url: '/notes',
      isEnabled: false,
    },
    {
      name: 'Categorias',
      url: '/categories',
      isEnabled: false,
    },
  ];

  pagesRight: HeaderGeneral[] = [
    {
      name: 'Registrarse',
      url: '/register',
      isEnabled: false,
    },
    {
      name: 'Login',
      url: '/login',
      isEnabled: false,
    },
  ];

  constructor(private readonly authService: AuthServiceService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.pagesLeft = [
      {
        name: 'Inicio',
        url: '',
        isEnabled: true,
      },
      {
        name: 'Notas',
        url: '/notes',
        isEnabled: this.authService.isAuthenticated(),
      },
      {
        name: 'Categorias',
        url: '/categories',
        isEnabled: this.authService.isAuthenticated(),
      },
    ];

    this.pagesRight = [
      {
        name: 'Registrarse',
        url: '/register',
        isEnabled: !this.authService.isAuthenticated(),
      },
      {
        name: 'Iniciar Sesión',
        url: '/login',
        isEnabled: !this.authService.isAuthenticated(),
      },
      {
        name: 'Cerrar sesión',
        url: '/logout',
        isEnabled: this.authService.isAuthenticated(),
      },
    ];
  }

  ngOnInit(): void {
    this.pagesLeft = [
      {
        name: 'Inicio',
        url: '',
        isEnabled: true,
      },
      {
        name: 'Notas',
        url: '/notes',
        isEnabled: this.authService.isAuthenticated(),
      },
      {
        name: 'Categorias',
        url: '/categories',
        isEnabled: this.authService.isAuthenticated(),
      },
    ];

    this.pagesRight = [
      {
        name: 'Registrarse',
        url: '/register',
        isEnabled: !this.authService.isAuthenticated(),
      },
      {
        name: 'Iniciar Sesión',
        url: '/login',
        isEnabled: !this.authService.isAuthenticated(),
      },
      {
        name: 'Cerrar sesión',
        url: '',
        isEnabled: this.authService.isAuthenticated(),
        action: () => {
          this.authService.logout();
          window.location.href = window.location.origin + '/';
        },
      },
    ];
  }
}

import { Component } from '@angular/core';
import { CategoriesServiceService } from '../../../services/categories-service.service';
import { Category } from '../../../models/category';
import { AuthServiceService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css',
})
export class CategoriesPageComponent {
  categories: Category[] = [];

  constructor(
    private categoriesService: CategoriesServiceService,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.update();
  }

  update() {
    this.categoriesService.byUserId(this.authService.getUser().id).subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      },
    });
  }

  action(data: { key: string; id: string }) {
    if (data.key === 'delete') {
      this.categoriesService.delete(data.id).subscribe({
        next: (response) => {
          this.update();
        },
        error: (err) => {
          console.error('Error al obtener categorias:', err);
        },
      });
    }
  }

  formatDate(dateStr: string) {
    const isoDate = dateStr;

    // Crear un objeto Date
    let date = new Date(isoDate);

    // Opciones para el formato
    let options: Intl.DateTimeFormatOptions = {
      year: 'numeric', 
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short', 
    };

    // Convertir a formato local
    return date.toLocaleString('es-ES', options);
  }
}

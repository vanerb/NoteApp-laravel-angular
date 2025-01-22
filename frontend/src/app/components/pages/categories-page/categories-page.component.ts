import { Component } from '@angular/core';
import { CategoriesServiceService } from '../../../services/categories-service.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css'
})
export class CategoriesPageComponent {
 categories: {
    id: string;
    name: string;
    user_id: string;
    created_at: string;
    updated_at: string;
  }[] = [];

  constructor(private categoriesService: CategoriesServiceService) {}

  ngOnInit() {
    this.categoriesService.all().subscribe({
      next: (response) => {
        this.categories = response.data
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }
}

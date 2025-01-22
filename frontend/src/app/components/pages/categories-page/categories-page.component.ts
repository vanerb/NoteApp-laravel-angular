import { Component } from '@angular/core';
import { CategoriesServiceService } from '../../../services/categories-service.service';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css'
})
export class CategoriesPageComponent {
 categories: Category[] = [];

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

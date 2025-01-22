import { Component } from '@angular/core';
import { CategoriesServiceService } from '../../../../../services/categories-service.service';
import { NotesServiceService } from '../../../../../services/notes-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../../models/category';
import { AuthServiceService } from '../../../../../services/auth-service.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css',
})
export class AdminCategoriesComponent {
  form!: FormGroup;

  categories: Category[] = [];

  categoryId: string | null = null;
  isEdit: boolean = false;

  constructor(
    private readonly categoriesService: CategoriesServiceService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.formBuilder();

    if (this.activatedRoute.snapshot.paramMap.get('id') === null) {
      this.isEdit = false;
    } else if (this.activatedRoute.snapshot.paramMap.get('id') !== null) {
      this.isEdit = true;
      this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    }

    this.categoriesService.all().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (err) => {
        console.error('Error al obtener categorias:', err);
      },
    });

    if (this.isEdit) {
      if (this.categoryId !== null) {
        this.categoriesService.byId(this.categoryId).subscribe({
          next: (response) => {
            this.form.get('name')?.setValue(response.data.name);
          },
          error: (err) => {
            console.error('Error al obtener categorias:', err);
          },
        });
      }
    }
  }

  formBuilder() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  addNote() {
    let note = {
      name: this.form.get('name')?.value ?? '',
      user_id: this.authService.getUser().id,
    };

    this.categoriesService.create(note).subscribe({
      next: (response) => {
        console.log('Producto creado con éxito:', response.data);
        alert('Producto creado correctamente.');
      },
      error: (err) => {
        console.error('Error al crear el producto:', err);
        alert('Hubo un error al crear el producto.');
      },
    });
  }

  editNote() {
    let note = {
      name: this.form.get('name')?.value ?? '',
      user_id: this.authService.getUser().id,
    };

    if (this.categoryId !== null) {
      this.categoriesService.update(this.categoryId, note).subscribe({
        next: (response) => {
          console.log('Producto editado con éxito:', response.data);
          alert('Producto creado correctamente.');
        },
        error: (err) => {
          console.error('Error al crear el producto:', err);
          alert('Hubo un error al crear el producto.');
        },
      });
    }
  }
}

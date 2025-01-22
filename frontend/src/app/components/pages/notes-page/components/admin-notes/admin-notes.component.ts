import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesServiceService } from '../../../../../services/categories-service.service';
import { NotesServiceService } from '../../../../../services/notes-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-notes',
  templateUrl: './admin-notes.component.html',
  styleUrl: './admin-notes.component.css',
})
export class AdminNotesComponent implements OnInit {
  form!: FormGroup;

  categories: {
    id: string;
    name: string;
    user_id: string;
    created_at: string;
    updated_at: string;
  }[] = [];

  noteId: string | null = null;
  isEdit: boolean = false;

  constructor(
    private readonly categoriesService: CategoriesServiceService,
    private readonly notesService: NotesServiceService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.formBuilder();

    if (this.activatedRoute.snapshot.paramMap.get('id') === null) {
      this.isEdit = false;
    } else if (this.activatedRoute.snapshot.paramMap.get('id') !== null) {
      this.isEdit = true;
      this.noteId = this.activatedRoute.snapshot.paramMap.get('id');
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
      if (this.noteId !== null) {
        this.notesService.byId(this.noteId).subscribe({
          next: (response) => {
            this.form.get('name')?.setValue(response.data.name);
            this.form.get('description')?.setValue(response.data.description);
            this.form.get('category')?.setValue(response.data.category_id);
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
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
  }

  addNote() {
    let note = {
      name: this.form.get('name')?.value ?? '',
      description: this.form.get('description')?.value,
      user_id: '1',
      category_id: this.form.get('category')?.value,
    };

    this.notesService.create(note).subscribe({
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
      description: this.form.get('description')?.value,
      user_id: '1',
      category_id: this.form.get('category')?.value,
    };

    if (this.noteId !== null) {
      this.notesService.update(this.noteId, note).subscribe({
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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesServiceService } from '../../../../../services/categories-service.service';
import { NotesServiceService } from '../../../../../services/notes-service.service';
import { ActivatedRoute } from '@angular/router';
import { AddNote, UpdateNote } from '../../../../../commands/note';
import { Category } from '../../../../../models/category';
import { AuthServiceService } from '../../../../../services/auth-service.service';
import { Note } from '../../../../../models/note';

@Component({
  selector: 'app-admin-notes',
  templateUrl: './admin-notes.component.html',
  styleUrl: './admin-notes.component.css',
})
export class AdminNotesComponent implements OnInit {
  form!: FormGroup;

  categories: Category[] = [];

  noteId: string | null = null;
  isEdit: boolean = false;
  images: File[] = [];

  note!: Note

  imagesToUpload: File[] = [];
  imagesToDelete: number[] = [];

  constructor(
    private readonly categoriesService: CategoriesServiceService,
    private readonly notesService: NotesServiceService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthServiceService
  ) { }

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

    this.getNote()
  }

  markImageForDeletion(imageId: number): void {
    this.imagesToDelete.push(imageId);
    this.note.images = this.note.images.filter((img: any) => img.id !== imageId);
  }


  getNote() {
    if (this.noteId !== null) {
      this.notesService.byId(this.noteId).subscribe({
        next: (response) => {

          this.note = response.data
        },
        error: (err) => {
          console.error('Error al obtener categorias:', err);
        },
      });
    }
  }

  formBuilder() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
  }

  onFileChange(event: any): void {
    this.images = Array.from(event.target.files);
  }

  addNote() {
    const formData = new FormData();

    formData.append('name', this.form.get('name')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('user_id', this.authService.getUser().id);
    formData.append('category_id', this.form.get('category')?.value);

    this.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    console.log(formData, this.form)
    this.notesService.create(formData).subscribe({
      next: (response) => {
        window.location.href = window.location.origin + "/notes"
      },
      error: (err) => {
        console.error('Error al crear el producto:', err);
      },
    });
  }

  editNote() {
    const formData = new FormData()

    formData.append('name', this.form.get('name')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('user_id', this.authService.getUser().id);
    formData.append('category_id', this.form.get('category')?.value);

    this.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    this.imagesToDelete.forEach((id) =>
      formData.append('deleted_images[]', id.toString())
    );

    this.notesService.update(this.noteId, formData).subscribe({
      next: (response) => {
        window.location.href = window.location.origin + "/notes"
      },
      error: (err) => {
        console.error('Error al crear el producto:', err);
      },
    });

  }
}

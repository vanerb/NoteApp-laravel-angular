import { Component } from '@angular/core';
import { CategoriesServiceService } from '../../../services/categories-service.service';
import { Category } from '../../../models/category';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Note } from '../../../models/note';
import { NotesServiceService } from '../../../services/notes-service.service';
import { ModalComponentComponent } from '../../general/modal-component/modal-component.component';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css',
})
export class CategoriesPageComponent {
  categories: Category[] = [];

  notes: Note[] = []

  constructor(
    private categoriesService: CategoriesServiceService,
    private noteService: NotesServiceService,
    private authService: AuthServiceService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.update();
    this.getNotes()
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

  getByCategoryId(id: string) {
    return this.notes.filter(note => note.category_id === id)
  }

  getNotes() {
    this.noteService.byUserId(this.authService.getUser().id).subscribe({
      next: (response) => {
        this.notes = response.data;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      },
    });
  }

  action(data: { key: string; id: string }) {
    if (data.key === 'delete') {
      if (this.getByCategoryId(data.id).length > 0) {
        this.modalService.openModal(ModalComponentComponent, {
          data: {
            title: 'Error',
            content: 'No se puede eliminar la categoria con notas asignadas',
            isAction: false,
            actionName: 'Ok',
            acceptAction: () => {
            },
            cancelAction: () => {
              this.modalService.closeModal()
            }

          },
        });
      }
      else {
        this.modalService.openModal(ModalComponentComponent, {
          data: {
            title: 'Aviso',
            content: '¿Está seguro de que quiere eliminar el elemento?',
            isAction: true,
            actionName: 'Aceptar',
            acceptAction: () => {
              this.categoriesService.delete(data.id).subscribe({
                next: (response) => {
                  this.update();
                  this.modalService.closeModal()
                },
                error: (err) => {
                  console.error('Error al obtener categorias:', err);
                  this.modalService.closeModal()
                },
              });
            },
            cancelAction: () => {

              this.modalService.closeModal()
            }

          },
        });
      }





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

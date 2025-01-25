import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from '../../../services/notes-service.service';
import { Note } from '../../../models/note';
import { AuthServiceService } from '../../../services/auth-service.service';
import { ModalService } from '../../../services/modal.service';
import { ModalComponentComponent } from '../../general/modal-component/modal-component.component';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.css',
})
export class NotesPageComponent implements OnInit {
  notes: Note[] = [];

  constructor(private notesService: NotesServiceService, private authService: AuthServiceService, private modalService: ModalService) { }

  ngOnInit() {

    this.update()
  }

  action(data: { key: string; id: string }) {
    if (data.key === 'delete') {

      this.modalService.openModal(ModalComponentComponent, {
        data: {
          title: 'Aviso',
          content: '¿Esta seguro de que quiere eliminar el elemento?',
          isAction: true,
          actionName: 'Aceptar',
          acceptAction: () => {
            this.notesService.delete(data.id).subscribe({
              next: (response) => {
                this.update()
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

    if (data.key === 'open') {
      window.location.href = window.location.origin + "/details/" + data.id
    }
  }


  update() {
    this.notesService.byUserId(this.authService.getUser().id).subscribe({
      next: (response) => {
        this.notes = response.data
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }

  openModal() {

  }
}

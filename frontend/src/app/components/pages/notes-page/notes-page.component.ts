import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from '../../../services/notes-service.service';
import { Note } from '../../../models/note';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.css',
})
export class NotesPageComponent implements OnInit {
  notes: Note[] = [];

  constructor(private notesService: NotesServiceService) {}

  ngOnInit() {
   
    this.update()
  }

  action(data: { key: string; id: string }) {
    if (data.key === 'delete') {
      this.notesService.delete(data.id).subscribe({
        next: (response) => {
          this.update()
        },
        error: (err) => {
          console.error('Error al obtener categorias:', err);
        },
      });
    }
  }


  update(){
    this.notesService.all().subscribe({
      next: (response) => {
        this.notes = response.data
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      }
    });
  }
}

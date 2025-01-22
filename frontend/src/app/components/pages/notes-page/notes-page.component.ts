import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from '../../../services/notes-service.service';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.css',
})
export class NotesPageComponent implements OnInit {
  notes: {
    id: string;
    name: string;
    description: string;
    user_id: string;
    category_id: string;
    created_at: string;
    updated_at: string;
  }[] = [];

  constructor(private notesService: NotesServiceService) {}

  ngOnInit() {
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

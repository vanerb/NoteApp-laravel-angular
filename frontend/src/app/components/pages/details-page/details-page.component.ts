import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from '../../../services/notes-service.service';
import { Note } from '../../../models/note';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements OnInit {

  note!: Note
  noteId: string = ""
  constructor(private readonly notesService: NotesServiceService, private readonly activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('id') !== null){
     this.noteId = this.activatedRoute.snapshot.paramMap.get('id') ?? ""
    }

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

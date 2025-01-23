import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { AddNote, UpdateNote } from '../commands/note';

@Injectable({
  providedIn: 'root',
})
export class NotesServiceService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor() {}

  all() {
    return from(axios.get(`${this.baseUrl}/notes`));
  }

  byId(id: string) {
    return from(axios.get(`${this.baseUrl}/notes/${id}`));
  }

  byUserId(id: string) {
    return from(axios.get(`${this.baseUrl}/notes/user/${id}`));
  }

  create(note: AddNote){
    return from(axios.post(`${this.baseUrl}/notes`, note))
  }

  update(id: string, note: UpdateNote){
    return from(axios.put(`${this.baseUrl}/notes/${id}`, note))
  }

  delete(id: string){
    return from(axios.delete(`${this.baseUrl}/notes/${id}`))
  }
}

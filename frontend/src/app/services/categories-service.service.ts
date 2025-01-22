import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { AddCategory, UpdateCategory } from '../commands/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {

  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor() {}

  all() {
    return from(axios.get(`${this.baseUrl}/categories`));
  }

  byId(id: string) {
    return from(axios.get(`${this.baseUrl}/categories/${id}`));
  }

  create(category: AddCategory){
    return from(axios.post(`${this.baseUrl}/categories`, category))
  }

  update(id: string, category: UpdateCategory){
    return from(axios.put(`${this.baseUrl}/categories/${id}`, category))
  }

  delete(id: string){
    return from(axios.delete(`${this.baseUrl}/categories/${id}`))
  }
}

import { Component } from '@angular/core';
import { HeaderGeneral } from '../../../commands/general';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  pages: HeaderGeneral[] = [
    {
      name: "Inicio",
      url: ""
    },
    {
      name: "Notas",
      url:"/notes"
    },
    {
      name: "Categorias",
      url:"/categories"
    }
  ];
}

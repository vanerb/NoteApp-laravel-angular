import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrl: './card-component.component.css'
})
export class CardComponentComponent {

  @Input() item!: {
    id: string;
    name: string;
    description: string;
    url: string
  }




}

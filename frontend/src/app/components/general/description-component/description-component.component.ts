import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-description-component',
  templateUrl: './description-component.component.html',
  styleUrl: './description-component.component.css'
})
export class DescriptionComponentComponent {

  @Input() details!: {
    title: string,
    description: string
  }

}

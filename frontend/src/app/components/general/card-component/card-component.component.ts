import { Component, Input } from '@angular/core';
import { CardGeneral } from '../../../commands/general';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrl: './card-component.component.css'
})
export class CardComponentComponent {

  @Input() item!: CardGeneral




}

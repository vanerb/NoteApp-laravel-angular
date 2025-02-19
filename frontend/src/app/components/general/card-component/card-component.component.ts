import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardGeneral } from '../../../commands/general';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrl: './card-component.component.css',
})
export class CardComponentComponent {
  @Input() item!: CardGeneral;
  @Output() action = new EventEmitter<{ key: string; id: string }>();

  delete(id: string) {
    this.action.emit({
      key: 'delete',
      id: id,
    });
  }

  open(id: string) {
    this.action.emit({
      key: 'open',
      id: id,
    });
  }
}

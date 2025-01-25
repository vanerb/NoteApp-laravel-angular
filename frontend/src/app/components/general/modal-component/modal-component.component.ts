import { OverlayRef } from '@angular/cdk/overlay';
import { Component, Inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrl: './modal-component.component.css'
})
export class ModalComponentComponent {

  @Input() props!: {
    title: string,
    content: string,
    isAction: boolean,
    actionName: string,
    acceptAction: ()=>void,
    cancelAction: ()=> void
  }

  constructor(@Inject('MODAL_DATA') public data: any, private overlayRef: OverlayRef) {}

  close() {
    this.overlayRef.dispose(); // Cierra el modal
  }

}

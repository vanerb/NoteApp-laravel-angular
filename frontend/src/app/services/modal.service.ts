import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay, private injector: Injector) { }

  openModal(component: any, config: { data?: any } = {}): void {
    const overlayConfig = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    this.overlayRef = this.overlay.create({
      positionStrategy: overlayConfig,
      hasBackdrop: true,
      backdropClass: 'fixed inset-0 bg-black/50 z-40', // Fondo oscuro translúcido
      panelClass: 'fixed inset-0 flex items-center justify-center z-50', // Flex para centrar
    });

    this.overlayRef.backdropClick().subscribe(() => this.closeModal());

    const portal = new ComponentPortal(
      component,
      null,
      this.createInjector(config.data, this.overlayRef)
    );
    this.overlayRef.attach(portal);
  }

  closeModal(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  private createInjector(data: any, overlayRef: OverlayRef): Injector {
    return Injector.create({
      providers: [
        { provide: 'MODAL_DATA', useValue: data },
        { provide: OverlayRef, useValue: overlayRef }
      ],
      parent: this.injector,
    });
  }
}

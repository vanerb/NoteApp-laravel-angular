import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './components/pages/welcome-page/welcome-page.component';
import { NotesPageComponent } from './components/pages/notes-page/notes-page.component';
import { CardComponentComponent } from './components/general/card-component/card-component.component';
import { ModalComponentComponent } from './components/general/modal-component/modal-component.component';
import { AdminNotesComponent } from './components/pages/notes-page/components/admin-notes/admin-notes.component';
import { ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule
import { ServerModule } from '@angular/platform-server';
import { CategoriesPageComponent } from './components/pages/categories-page/categories-page.component';
import { AdminCategoriesComponent } from './components/pages/categories-page/components/admin-categories/admin-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    NotesPageComponent,
    CardComponentComponent,
    ModalComponentComponent,
    AdminNotesComponent,
    CategoriesPageComponent,
    AdminCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ServerModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './components/pages/welcome-page/welcome-page.component';
import { NotesPageComponent } from './components/pages/notes-page/notes-page.component';
import { AdminNotesComponent } from './components/pages/notes-page/components/admin-notes/admin-notes.component';
import { AdminCategoriesComponent } from './components/pages/categories-page/components/admin-categories/admin-categories.component';
import { CategoriesPageComponent } from './components/pages/categories-page/categories-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';


const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'notes', component: NotesPageComponent },
  { path: 'admin-notes', component: AdminNotesComponent },
  { path: 'admin-notes/:id', component: AdminNotesComponent },

  { path: 'categories', component: CategoriesPageComponent },
  { path: 'admin-categories', component: AdminCategoriesComponent },
  { path: 'admin-categories/:id', component: AdminCategoriesComponent },

  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

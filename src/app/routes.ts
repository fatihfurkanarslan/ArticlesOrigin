import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { Resolve } from '@angular/router';
import { HomeNotes } from './resolvers/homenotes';
import { NotePageComponent } from './notes/note-page/note-page.component';
import { CategoryNoteComponent } from './notes/category-note/category-note.component';
import { Categorynoteresolver } from './resolvers/categorynoteresolver';
import { CreatecategoryComponent } from './managerpanel/createcategory/createcategory.component';
import { CreatenoteComponent } from './managerpanel/createnote/createnote.component';
import { UsernotesComponent } from './managerpanel/usernotes/usernotes.component';
import { AllcategoriesComponent } from './managerpanel/allcategories/allcategories.component';
import { EditcategoryComponent } from './managerpanel/editcategory/editcategory.component';
import { EditnoteComponent } from './managerpanel/editnote/editnote.component';
import { ProfileComponent } from './managerpanel/profile/profile.component';
import { EditprofileComponent } from './managerpanel/editprofile/editprofile.component';
import { LoginComponent } from './login/login.component';
import { ActivateuserComponent } from './user/activateuser/activateuser.component';
import { CreatetagsComponent } from './managerpanel/createtags/createtags.component';
import { SearchednotesComponent } from './notes/searchednotes/searchednotes.component';
import { NavComponent } from './nav/nav.component';
import { NotesbyuserComponent } from './notes/notesbyuser/notesbyuser.component';
import { CategoriesComponent } from './categories/categories.component';
import { UserAgreementComponent } from './user-agreement/user-agreement.component';


export const Routes = [

  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, resolve: {notes: HomeNotes}},
  { path: 'notes/:id', component: CategoryNoteComponent, resolve: {notes: Categorynoteresolver} },
  { path: 'usernotes', component: UsernotesComponent },
  { path: 'note/:id', component: NotePageComponent },
  { path: 'createcategory', component: CreatecategoryComponent },
  { path: 'createnote', component: CreatenoteComponent },
  { path: 'allcategories', component: AllcategoriesComponent },
  { path: 'editcategory', component: EditcategoryComponent },
  { path: 'editnote', component: EditnoteComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'editprofile', component: EditprofileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'useractivate/:id', component: ActivateuserComponent },
  { path: 'createtags', component: CreatetagsComponent },
  { path: 'searchednotes', component: SearchednotesComponent },
  { path: 'nav', component: NavComponent },
  { path: 'notesbyuser/:id', component: NotesbyuserComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: '**', component: HomeComponent },
  { path: 'user-agreement', component: UserAgreementComponent }


];

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ChangeDetectorRef } from '@angular/core';

// formsmodule used for data binding in html like register or login
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// güncellemeden sonra hata alıyor
// import { MatOptionModule} from '@angular/material/';

import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';



// import {MatSelect} from '@angular/material/select';




import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryComponent } from './category/category.component';
import { NoteCardComponent } from './notes/note-card/note-card.component';
import { NotePageComponent } from './notes/note-page/note-page.component';
import { CategoryNoteComponent } from './notes/category-note/category-note.component';
import { CreatecategoryComponent } from './managerpanel/createcategory/createcategory.component';
import { CreatenoteComponent } from './managerpanel/createnote/createnote.component';
import { UsernotesComponent } from './managerpanel/usernotes/usernotes.component';
import { AllcategoriesComponent } from './managerpanel/allcategories/allcategories.component';
import { EditcategoryComponent } from './managerpanel/editcategory/editcategory.component';
import { PopularNotesComponent } from './notes/popular-notes/popular-notes.component';
import { EditnoteComponent } from './managerpanel/editnote/editnote.component';
import { DeleteDialogComponent } from './managerpanel/DeleteDialog/DeleteDialog.component';
import { ProfileComponent } from './managerpanel/profile/profile.component';
import { EditprofileComponent } from './managerpanel/editprofile/editprofile.component';
import { ActivateuserComponent } from './user/activateuser/activateuser.component';
import { SearchednotesComponent } from './notes/searchednotes/searchednotes.component';
import { NotesbyuserComponent } from './notes/notesbyuser/notesbyuser.component';
import { CategoriesComponent } from './categories/categories.component';
import { UserAgreementComponent } from './user-agreement/user-agreement.component';



// hammerjs

import 'hammerjs';

// infinite scroll

import { InfiniteScrollModule } from 'ngx-infinite-scroll';


// angular editor

 //import {AngularEditorModule } from '@kolkov/angular-editor';


// ng2-fileuplouder
// import { FileUploadModule } from 'ng2-file-upload';

// froala editor
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

// tinymce

//import { EditorModule } from '@tinymce/tinymce-angular';

// resolvers
import { HomeNotes } from './resolvers/homenotes';
import { Categorynoteresolver } from './resolvers/categorynoteresolver';

// app routes
import { RouterModule } from '@angular/router';
import { Routes } from './routes';

// font awesome
// import { AngularFontAwesomeModule } from 'angular-font-awesome';

// devextreme
// import { DxButtonModule, DxFormModule } from 'devextreme-angular';

// sharebuttons

// import { ShareButtonsModule } from '@ngx-share/buttons';
// 2022 version
// import { ShareButtonsModule  } from 'ngx-sharebuttons/buttons';
// import { ShareIconsModule } from 'ngx-sharebuttons/icons';

// md bootstrap - no need anymore
//import { MDBBootstrapModule } from 'angular-bootstrap-md';

// // flex-layout
// import { FlexLayoutModule } from '@angular/flex-layout';

// fontawsome

 import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';





// services
import { AuthService } from '../app/services/auth.service';
import { CategoryService } from './services/category.service';
import { NoteService } from './services/note.service';
import { ProfileService } from './services/profile.service';


// import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { NotecommentsComponent } from './comment/notecomments/notecomments.component';
import { LoginComponent } from './login/login.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { PhotobarComponent } from './photobar/photobar.component';

import { TagInputModule } from 'ngx-chips';
import { CreatetagsComponent } from './managerpanel/createtags/createtags.component';
import { TagService } from './services/tag.service';
import { SearchService } from './services/search.service';
import { CommentService } from './services/comment.service';
import { PhotoService } from './services/photo.service';
import { LikeService } from './services/like.service';
import { ErrorphotobarComponent } from './errorphotobar/errorphotobar.component';
import { ArrayFixPipe } from './array-fix.pipe';

// import { angularEditorConfig } from '@kolkov/angular-editor/lib/config';



@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      RegisterComponent,
      HomeComponent,
      FooterComponent,
      CategoryComponent,
      NoteCardComponent,
      NotePageComponent,
      CategoryNoteComponent,
      CreatecategoryComponent,
      CreatenoteComponent,
      UsernotesComponent,
      AllcategoriesComponent,
      EditcategoryComponent,
      PopularNotesComponent,
      EditnoteComponent,
      DeleteDialogComponent,
      ProfileComponent,
      EditprofileComponent,
      NotecommentsComponent,
      LoginComponent,
      SnackbarComponent,
      ActivateuserComponent,
      CreatetagsComponent,
      SearchednotesComponent,
      PhotobarComponent,
      ErrorphotobarComponent,
      NotesbyuserComponent,
      CategoriesComponent,
      CategoriesComponent,
      ArrayFixPipe,
      UserAgreementComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
     // DxFormModule,
      HttpClientModule,
     // DxButtonModule,
      RouterModule.forRoot(Routes),
      // AngularFontAwesomeModule,
      //FileUploadModule,
      //AngularEditorModule,
      // FroalaEditorModule.forRoot(),
      // FroalaViewModule.forRoot(),
      InfiniteScrollModule,
      MatTabsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      TagInputModule,
      MatIconModule,
      MatMenuModule,
      MatButtonModule,
      MatTableModule,
      MatSelectModule,
      MatIconModule,
      MatDialogModule,
      MatInputModule,
      MatGridListModule,
      MatMenuModule,
      MatFormFieldModule,
      MatSortModule,
      MatSnackBarModule,
      MatChipsModule,
      MatAutocompleteModule,
      //bunlara bakılacak 13.07.2023
      FontAwesomeModule,
      MatCardModule
   ],
   providers: [
      AuthService,
      CategoryService,
      NoteService,
      HomeNotes,
      Categorynoteresolver,
      ProfileService,
      TagService,
      SearchService,
      CommentService,
      PhotoService,
      LikeService,
      NavComponent
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      DeleteDialogComponent,
      SnackbarComponent,
      PhotobarComponent
   ]
})
export class AppModule { }
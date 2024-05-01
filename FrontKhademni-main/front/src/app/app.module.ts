import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegisterComponent } from './register/register.component';

import { OffreComponent } from './offre/offre.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AjoutReclamationComponent } from './components/ajout-reclamation/ajout-reclamation.component';
import { PopupComponent } from './components/ajout-reclamation/popupconfirmation/popup/popup.component';
import { ModifierReclamationComponent } from './components/modifier-reclamation/modifier-reclamation.component';
import { ReclamationsComponent } from './components/reclamations copy/reclamations.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminheaderComponent } from './components/admin/adminheader/adminheader.component';
import { AdminmainComponent } from './components/admin/adminmain/adminmain.component';
import { AdminsidebarComponent } from './components/admin/adminsidebar/adminsidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { PopupsuccessComponent } from './components/modifier-reclamation/popupsuccess/popupsuccess/popupsuccess.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ChatBubbleComponent } from './components/chat-bubble/chat-bubble.component'; // Import MatButtonModule for triggering menus


@NgModule({
  declarations: [
    AppComponent, 
    RegisterComponent,
    OffreComponent,
    ReclamationsComponent,
    AjoutReclamationComponent,
    ModifierReclamationComponent,
    PopupComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AdminmainComponent,
    AdminsidebarComponent,
    AdminheaderComponent,
    PopupComponent,
    PopupsuccessComponent,
    ChatBubbleComponent,

  
  
  ],
    
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RichTextEditorAllModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule, 
    MatPaginatorModule,
    MatDialogModule,
    NgxChartsModule,
    MatMenuModule,
    MatButtonModule,

   

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }

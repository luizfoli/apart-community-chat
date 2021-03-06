import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { InfoComponent } from './info/info.component';
import { ChatComponent } from './chat/chat.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SocketService } from './service/socket.service';
import { MessageComponent } from './chat/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    InfoComponent,
    ChatComponent,
    HeaderComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

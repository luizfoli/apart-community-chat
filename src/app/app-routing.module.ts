import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'info', component: InfoComponent },
  { path: 'chat', component: ChatComponent }
  ];

@NgModule({
  exports: [RouterModule] ,
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
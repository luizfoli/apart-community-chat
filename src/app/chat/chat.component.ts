import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../environments/environment';

import { SocketService } from '../service/socket.service';
import { MessageModel } from './model/MessageModel';
import { Message } from "@stomp/stompjs";

const SEND_MESSAGE = "/send/message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  private socketService: SocketService;
  messages: MessageModel[] = [];

  @ViewChild('messagesPanel') messagesPanel: ElementRef;
  @ViewChild('inputMessage') inputMessage: ElementRef;

  constructor() {

    // Inicia uma conexão com o WebSocket.
    this.socketService = new SocketService(environment.urlSocket, SEND_MESSAGE);

    // Me 'inscrevo' no WebSocket para sempre receber atualizações de Mensagens.
    this.socketService.stream().subscribe((message: Message) => {
      //this.messages.push(this.prepareToReceiveNewMessage(message));
      console.log(message.body);
    });

  }

  ngOnInit() {

    /**
      * Depois de renderizar a tela, desce o elemento scroll da div
      * 'messages-panel' o máximo possível.
      */

    document.getElementById('messagesPanel').scrollTop = 9999999999999;
  }

  /**
   * Método responsável por preparar as messagens do tipo
   * Message em um objeto do tipo MessageModel.
   */

  private prepareToReceiveNewMessage(message: Message): MessageModel {

    let receivedMessage = new MessageModel();
    let messageInJson = JSON.parse(JSON.stringify(message.body));
    receivedMessage.author = JSON.parse(JSON.stringify(message.body)).author;
    receivedMessage.message = messageInJson.message;
    receivedMessage.dtSend = messageInJson.dtSend;

    return receivedMessage;
  }

  sendMessage(messageAuthor: string, messageContent: string) {
    let newMessage = new MessageModel();
    newMessage.author = messageAuthor;
    newMessage.dtSend = new Date();
    newMessage.message = messageContent;
    this.socketService.send(newMessage);
    this.afterSendMessage();
  }

  /**
   * Método responsável por realizar ações necessárias 
   * no layout depois do envio da mensagem.
   */

  private afterSendMessage() {
    this.inputMessage.nativeElement.value = "";
  }

}

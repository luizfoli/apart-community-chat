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
      if (!message.body.includes('null')) {
        this.messages.push(this.prepareToReceiveNewMessage(message));
        this.scrollDownMessages();
      }
    });

    console.log(this.messages)

  }

  ngOnInit() {
    this.scrollDownMessages();
  }

  /**
   * Método responsável por preparar as messagens do tipo
   * Message em um objeto do tipo MessageModel.
   */

  private prepareToReceiveNewMessage(message: Message): MessageModel {

    let messageInJson;

    try {
      messageInJson = JSON.parse(JSON.parse(JSON.stringify(message.body)));

      let receivedMessage = new MessageModel();
      receivedMessage.author = messageInJson.author;
      receivedMessage.message = messageInJson.message;
      receivedMessage.dtSend =
        new Date(messageInJson.dtSend).toLocaleDateString() + ' ' + messageInJson.timeDtSend;

      return receivedMessage;

    } catch (e) {
      console.log('Erro: ' + e)
    }
  }

  sendMessage(messageAuthor: string, messageContent: string) {
    let newMessage = new MessageModel();
    newMessage.author = messageAuthor;
    newMessage.dtSend = new Date().toLocaleDateString()
    newMessage.timeDtSend = new Date().toLocaleTimeString();
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

  /**
  * Depois de renderizar a tela, desce o elemento scroll da div
  * 'messages-panel' o máximo possível.
  */

  private scrollDownMessages() {
    document.getElementById('messagesPanel').scrollTop = 9999999999999;
  }

}

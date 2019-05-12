import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from '../../environments/environment';

import { SocketService } from '../service/socket.service';
import { MessageModel } from './model/MessageModel';
import { Message } from "@stomp/stompjs";

import { DateFormat } from '../date/DateFormat';

const SEND_MESSAGE = "/send/message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  private socketService: SocketService;
  messages: MessageModel[] = [];
  dateFormat = new DateFormat; 

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
  }

  ngOnInit() {  }

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
      receivedMessage.dtSend = messageInJson.dtSend + ' ' + messageInJson.timeDtSend;

      return receivedMessage;

    } catch (e) {
      console.log('Erro: ' + e)
    }
  }

  sendMessage(messageAuthor: string, messageContent: string) {

    if(!this.verifyMessageCanBeSend(messageAuthor, messageContent)) {
      return;
    }

    const date = new Date();

    let newMessage = new MessageModel();
    newMessage.author = messageAuthor;
    newMessage.dtSend = this.dateFormat.returnDateFormat(date);
    newMessage.timeDtSend = this.dateFormat.returnTimeFormat(date);
    newMessage.message = messageContent;
    this.socketService.send(newMessage);
    this.afterSendMessage();
  }

  private verifyMessageCanBeSend(messageAuthor: string, messageContent: string) {
    return (messageAuthor.length > 0 && messageContent.length > 0);
  }

  /**
   * Método responsável por realizar ações necessárias 
   * no layout depois do envio da mensagem.
   */

  private afterSendMessage() {
    this.inputMessage.nativeElement.value = "";
    this.inputMessage.nativeElement.focus();
  }

  /**
  * Depois de renderizar a tela, desce o elemento scroll da div
  * 'messages-panel' o máximo possível.
  */

  private scrollDownMessages() {
    setTimeout(function () {
      document.getElementById('messagesPanel').scrollTop = 99999999999;
    }, 250);
  }

}

import { Component, OnInit } from '@angular/core';

import { SocketService } from '../service/socket.service';
import { MessageModel } from './model/MessageModel';
import { Message } from "@stomp/stompjs";

const WEBSOCKET_URL = "ws://localhost:9090/socket";
const EXAMPLE_URL = "/send/message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private socketService: SocketService;
  messages: MessageModel[] = [];

  constructor() {

    // Inicia uma conexão com o WebSocket.
    this.socketService = new SocketService(WEBSOCKET_URL, EXAMPLE_URL);

    // Me 'inscrevo' no WebSocket para sempre receber atualizações de Mensagens.
    this.socketService.stream().subscribe((message: Message) => {
      this.messages.push(this.prepareToReceiveNewMessage(message));
      console.log(this.messages);
    });

  }

  ngOnInit() {
  }

  /**
   * Método responsável por preparar as messagens do tipo
   * Message em um objeto do tipo MessageModel.
   */

  private prepareToReceiveNewMessage(message:Message):MessageModel {
    
    let receivedMessage = new MessageModel();
    let messageInJson = JSON.parse(JSON.stringify(message.body));

    console.log("JSON: " + messageInJson)
    console.log(typeof(messageInJson))

    receivedMessage.author = JSON.parse(JSON.stringify(message.body)).author;
    receivedMessage.message = messageInJson.message;  
    receivedMessage.dtSend  = messageInJson.dtSend;

    return receivedMessage;
  }

  sendMessage(messageContent:string) {
    let newMessage = new MessageModel();
    newMessage.author = "Luiz";
    newMessage.dtSend = new Date();
    newMessage.message = messageContent;
    this.socketService.send(newMessage);
  }

}

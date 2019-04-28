import { StompService, StompConfig, StompState } from "@stomp/ng2-stompjs";
import { Message } from "@stomp/stompjs";
import { Observable, BehaviorSubject } from "rxjs";

import { MessageModel } from '../chat/model/MessageModel';

const SERVER_URL = 'http://localhost:8090';

export class SocketService {
  private messages: Observable<Message>;
  private stompService: StompService;

  constructor(socketUrl: string, streamUrl: string) {
    let stompConfig: StompConfig = {
      url: socketUrl,
      headers: {
        login: "",
        passcode: ""
      },
      heartbeat_in: 0,
      heartbeat_out: 20000,
      reconnect_delay: 5000,
      debug: true
    };

    this.stompService = new StompService(stompConfig);
    this.messages = this.stompService.subscribe(streamUrl);
  }

  public stream(): Observable<Message> {
    return this.messages;
  }

  /**
   * Método responsável por enviar um contato para o WebSocket contento o objeto 'MessageModel'.
   */

  public send(message: MessageModel) {
    return this.stompService.publish("/receive/message", JSON.stringify(message));
  }

  public state(): BehaviorSubject<StompState> {
    return this.stompService.state;
  }
}
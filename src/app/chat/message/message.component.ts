import { Component, OnInit, Input } from '@angular/core';

import { MessageModel } from '../model/MessageModel';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message: MessageModel;

  constructor() {
   }

  ngOnInit() {
  }

}

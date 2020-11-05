import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message/message.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() { }

  public messageEmitter = new EventEmitter<Message>();
}

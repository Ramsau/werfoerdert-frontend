import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Message } from './message.model';
import {faTimes, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  @ViewChild('errorMessage') errorMessage: ElementRef;
  messages: Message[];
  dummyMessages = [
    Message.error('AAAA ERROR'),
    Message.info('Nua zur Info'),
    Message.warn('Jetz miass ma bissi aufpassn')
  ];
  subM: any;
  fAtimescircle = faTimesCircle;
  private message: Message[];
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
     this.subM = this.sharedService.messageEmitter.subscribe(
      messages => {
        this.messages = messages;
      }
    );
  }

  ngOnDestroy(): void {
    this.subM.unsubscribe();
  }

  closeMessage(timestampMessage: number): void {
    const message = this.messages.find(x => x.timestamp === timestampMessage);
    const index: number = this.messages.indexOf(message);
    if (index !== -1) {
      this.messages.splice(index, 1);
    }
  }
}

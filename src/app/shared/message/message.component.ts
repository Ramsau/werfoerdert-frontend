import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Message } from './message.model';
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent implements OnInit, OnDestroy {
  @ViewChild('errorMessage') errorMessage: ElementRef;
  @Input() type: any;
  messages: Message[] = [];
  subM: any;
  fAtimescircle = faTimesCircle;
  constructor(private sharedService: SharedService) {
  }

  ngOnInit(): void {
     this.subM = this.sharedService.messageEmitter.subscribe(
      message => {
        setTimeout(() => {this.closeMessage(message.timestamp); }, 15000);
        this.messages.push(message);
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

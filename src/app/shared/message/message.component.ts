import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Message} from './message.model';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @ViewChild('errorMessage') errorMessage: ElementRef;
  messageDummies: Message[];

 fAtimescircle = faTimesCircle;

  constructor() { }

  ngOnInit(): void {
  }

  showMessage(): void {
    this.errorMessage.nativeElement.classList.toggle('active');
  }
}

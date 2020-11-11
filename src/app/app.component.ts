import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SharedService } from './shared/shared.service';
import {Message} from './shared/message/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private titleService: Title,
    private sharedService: SharedService
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('werFördert');
    this.sharedService.messageEmitter.subscribe((message: Message) => {
    });
  }
}

import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Grant } from '../../../shared/grant.model';
import { AdminService } from '../../admin.service';
import { Question } from '../../../shared/question.model';
import {Message} from '../../../shared/message/message.model';
import {SharedService} from '../../../shared/shared.service';

@Component({
  selector: 'app-admin-grant',
  templateUrl: './admin-grant.component.html',
  styleUrls: ['./admin-grant.component.scss']
})
export class AdminGrantComponent implements OnInit {
  @Input() grant: Grant;
  @Input() question: Question[];
  @Input() questionsLoading: boolean;
  @ViewChild('collapseContent') collapseContent: ElementRef;
  @ViewChild('collapseQuestion') collapseQuestion: ElementRef;

  constructor(private adminService: AdminService,
              private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.grant.requirements.map(requirement => {
      console.log(requirement);
      const subQ = this.adminService.getQuestion(requirement.question as number).subscribe(
      (question: Question) => {
          requirement.question = question;
          subQ.unsubscribe();
      },
      error => {
        this.sharedService.messageEmitter.emit(Message.error('Ein Fehler ist aufgetreten!'));
      });
    });
  }

  onClick(): void {
    this.collapseContent.nativeElement.classList.toggle('active');
  }

  onClick_addQ(): void {
    this.collapseQuestion.nativeElement.classList.toggle('active_addQ');
  }
}



import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Grant } from '../../../shared/grant.model';
import { AdminService } from '../../admin.service';
import { Question, Requirement } from '../../../shared/question.model';
import { Message } from '../../../shared/message/message.model';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-admin-grant',
  templateUrl: './admin-grant.component.html',
  styleUrls: ['./admin-grant.component.scss']
})
export class AdminGrantComponent implements OnInit {
  @Input() grant: Grant;
  @Input() question: Question[];
  @Input() questionsLoading: boolean;
  @Input() requirement: Requirement[];

  @ViewChild('collapseContent') collapseContent: ElementRef;
  @ViewChild('collapseQuestion') collapseQuestion: ElementRef;
  @ViewChild('collapseRequirement') collapseRequirement: ElementRef;

  constructor(private adminService: AdminService,
              private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.grant.requirements.map(requirement => {
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

  onCreateRequirement(requirement: Requirement[]){
    const  postR = this.adminService.postRequirement(requirement).subscribe(
      returnRequirements => {
        this.requirement = returnRequirements.slice();
      },
      error => {
        this.sharedService.messageEmitter.emit(Message.warn('Der Server konnte nicht erreicht werden.'));
      }
    );
  }

  onClick(): void {
    this.collapseContent.nativeElement.classList.toggle('active');
  }

  onClick_addQ(): void {
    this.collapseQuestion.nativeElement.classList.toggle('active_addQ');
  }
}

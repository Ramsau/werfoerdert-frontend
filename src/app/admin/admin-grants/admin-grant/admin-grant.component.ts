import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Grant } from '../../../shared/grant.model';
import { AdminService } from '../../admin.service';
import { Question } from '../../../shared/question.model';

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

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.grant.requirements.map(requirement => {
      console.log(requirement);
      // get actual question by id
      const subQ = this.adminService.getQuestion(requirement.question as number).subscribe(
      (question: Question) => {
          requirement.question = question;
          subQ.unsubscribe();
      },
      error => {
        console.log(error);
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



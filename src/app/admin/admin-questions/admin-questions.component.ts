import {Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';
import { AdminService } from '../admin.service';
import {Question} from '../../shared/question.model';

@Component({
  selector: 'app-admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.scss', ]
})
export class AdminQuestionsComponent implements OnInit {
  questions: Question[];
  @ViewChild('collapseQuestionEdit') collapseQuestionEdit: ElementRef;

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    const subQ = this.adminService.getQuestions().subscribe(
      questions => {
        this.questions = questions;
        subQ.unsubscribe();
      },
      error => {
        console.log(error);
      }
    );
  }

  onCreateQuestion(question: unknown): void {
    const postQ = this.adminService.postQuestion(question).subscribe(
      returnQuestion => {
        this.questions.push(returnQuestion);
      }
    );
  }

  onQuestionEditCollapsible(question): void {
    question.is_edit = !(question.is_edit === true);
  }

  onQuestionEdit(question: unknown): void {
    this.adminService.postQuestion(question).subscribe(
      returnQuestion => {
        this.questions.push(returnQuestion);
      }
    );
  }
}

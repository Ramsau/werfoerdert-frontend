import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { AdminService } from '../admin.service';
import { Question, QuestionType } from '../../shared/question.model';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.scss', ]
})
export class AdminQuestionsComponent implements OnInit {
  questions: Question[];
  questionTypes: QuestionType[];
  @ViewChild('collapseQuestionEdit') collapseQuestionEdit: ElementRef;

  faEdit = faEdit;
  faTrash = faTrash;

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
    const subQt = this.adminService.getQuestionTypes().subscribe(
        questionTypes => {
          this.questionTypes = questionTypes;
          subQt.unsubscribe();
        }
      );
  }

  onCreateQuestion(question: unknown): void {
    const postQ = this.adminService.postQuestion(question).subscribe(
      returnQuestions => {
        this.questions = returnQuestions.slice();
      },
      error => {
        console.log(error);
      }
    );
  }

  onQuestionEditCollapsible(question): void {
    question.is_edit = !(question.is_edit === true);
  }

  onQuestionEdit(question: unknown): void {
    this.adminService.postQuestion(question).subscribe(
      returnQuestions => {
        this.questions = returnQuestions.slice();
      },
      error => {
        console.log(error);
      }
    );
  }

  onDeleteQuestion(question): void {
    this.adminService.deleteQuestion(question).subscribe(
      returnQuestions => {
        this.questions = returnQuestions.slice();
      },
      error => {
        console.log(error);
      }
    );
  }
}

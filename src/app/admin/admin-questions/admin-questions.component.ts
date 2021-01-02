import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { Question, QuestionType } from '../../shared/question.model';
import { Message } from '../../shared/message/message.model';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.scss', ]
})
export class AdminQuestionsComponent implements OnInit {
  questions: Question[];
  questionTypes: QuestionType[];
  @ViewChild('collapseQuestionEdit') collapseQuestionEdit: ElementRef;

  showCreateQuestion = false;

  constructor(
    private adminService: AdminService,
    private sharedService: SharedService
  ) {
  }

  ngOnInit(): void {
    const subQ = this.adminService.getQuestions().subscribe(
      questions => {
        this.questions = questions;
        subQ.unsubscribe();
      },
      () => {
        this.sharedService.messageEmitter.emit(Message.warn('Der Server konnte nicht erreicht werden.'));
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
    this.adminService.postQuestion(question).subscribe(
      returnQuestions => {
        this.questions = returnQuestions.slice();
      },
      () => {
        this.sharedService.messageEmitter.emit(Message.warn('Der Server konnte nicht erreicht werden.'));
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
      () => {
        this.sharedService.messageEmitter.emit(Message.warn('Der Server konnte nicht erreicht werden.'));
      }
    );
  }

  onDeleteQuestion(question): void {
    this.adminService.deleteQuestion(question).subscribe(
      returnQuestions => {
        this.questions = returnQuestions.slice();
      },
      () => {
        this.sharedService.messageEmitter.emit(Message.warn('Der Server konnte nicht erreicht werden.'));
      }
    );
  }

  // Error Test functions
  emitError(): void{
    this.sharedService.messageEmitter.emit(Message.error('Ein Fehler ist aufgetreten!'));
  }
  emitInfo(): void{
    this.sharedService.messageEmitter.emit(Message.info('Ey INFO!'));
  }
  emitSuccess(): void{
    this.sharedService.messageEmitter.emit(Message.success('Guade Partie, hot funktioniert'));
  }
  emitWarn(): void{
    this.sharedService.messageEmitter.emit(Message.warn('Dir sei verziehen!'));
  }

}





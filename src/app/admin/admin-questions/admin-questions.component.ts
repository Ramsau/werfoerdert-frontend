import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import {Question} from '../../shared/question.model';

@Component({
  selector: 'app-admin-questions',
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.scss', ]
})
export class AdminQuestionsComponent implements OnInit {
  questions: Question[];

  constructor(private adminService: AdminService) { }

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
        console.log(returnQuestion);
        this.questions.push(returnQuestion);

      }
    );
  }
}

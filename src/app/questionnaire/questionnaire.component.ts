import {Component, OnInit} from '@angular/core';
import { Question } from './question/question.model';
import { QuestionnaireService } from './questionnaire.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  providers: [ QuestionnaireService ],
})
export class QuestionnaireComponent implements OnInit {
  questions: Question[] = [];
  questionsForm: FormGroup;
  questionsAnswered: {[id: number]: any} = {};
  loading = true;

  constructor(private questionnaireService: QuestionnaireService) { }

  updateQuestions(questions: Question[]): void {
    this.questions = questions;
    // create a Form control instance for each Question
    const formControls = questions.reduce((accumulator, question) => {
      const key = question.id;
      const value = new FormControl('');
      Object.assign(accumulator, {[key]: value});
      return accumulator;
    }, {});
    // update questions Form group
    this.questionsForm = new FormGroup(formControls);
    // disable loading/show form
    this.loading = false;
  }

  ngOnInit(): void {
    const sub = this.questionnaireService.getQuestions().subscribe(
      questions => {
        this.updateQuestions(questions);
        sub.unsubscribe();
      },
      error => {}); // to add error handling
  }

  onNext(): void {
    this.loading = true;

    Object.assign(this.questionsAnswered, this.questionsForm.value);
    console.log(this.questionsAnswered);

    const sub = this.questionnaireService.postAnswers(this.questionsAnswered)
      .subscribe(
        questions => {
          this.updateQuestions(questions);
          sub.unsubscribe();
        },
        error => {}); // to add error handling
  }
}

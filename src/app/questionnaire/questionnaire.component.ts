import {Component, OnInit } from '@angular/core';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireState} from './grant.model';
import { FormGroup } from '@angular/forms';
import { getFormControl } from './question/question.component';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  state: QuestionnaireState;
  questionsAnswered: {[id: number]: any} = {};
  questionsForm = new FormGroup({});
  loading = true;
  showGrantsMet = false;

  constructor(private questionnaireService: QuestionnaireService) { }

  ngOnInit(): void {
    const sub = this.questionnaireService.getQuestions().subscribe(
      state => {
        this.updateQuestions(state);
        sub.unsubscribe();
      },
      error => {
        console.log(error);
      });
  }

  updateQuestions(state: QuestionnaireState): void {
    if (state.current_grant !== null) {
      // First update controls object
      const controls = state.current_grant.questions.reduce((accumulator, question) => {
        const key = question.id;
        const value = getFormControl(question);
        Object.assign(accumulator, {[key]: value});
        return accumulator;
      }, {});
      this.questionsForm = new FormGroup(controls);
    } else {
      this.showGrantsMet = true;
    }

    // update state => dom controls list gets updated
    this.state = state;

    // disable loading/show form
    this.loading = false;
  }

  onNext(): void {
    if (this.questionsForm.valid) {
      this.loading = true;

      // add new answers to list of answered questions
      Object.assign(this.questionsAnswered, this.questionsForm.value);

      console.log(this.questionsAnswered);

      // send answers to api and get next answers
      const sub = this.questionnaireService.postAnswers(this.questionsAnswered)
        .subscribe(
          state => {
            this.updateQuestions(state);
            sub.unsubscribe();
          },
          error => {
            console.log(error);
          });
    } else {
      console.log('invalid');
    }
  }
}

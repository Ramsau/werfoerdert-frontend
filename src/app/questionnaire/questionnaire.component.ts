import {Component, OnInit} from '@angular/core';
import { QuestionnaireService } from './questionnaire.service';
import { FormControl, FormGroup } from '@angular/forms';
import { QuestionnaireState} from './grant.model';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  state: QuestionnaireState;
  questionsForm: FormGroup = new FormGroup({});
  questionsAnswered: {[id: number]: any} = {};
  loading = true;
  showGrantsMet = false;

  constructor(private questionnaireService: QuestionnaireService) { }

  updateQuestions(state: QuestionnaireState): void {
    this.state = state;

    // disable loading/show form
    this.loading = false;
    if (state.current_grant !== null) {
      // create a Form control instance for each Question
      const formControls = state.current_grant.questions.reduce((accumulator, question) => {
        const key = question.id;
        const value = new FormControl('');
        Object.assign(accumulator, {[key]: value});
        return accumulator;
      }, {});
      // update questions Form group
      this.questionsForm = new FormGroup(formControls);
    } else {
      this.showGrantsMet = true;
    }
  }

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

  onNext(): void {
    if (this.questionsForm.valid) {
      this.loading = true;

      Object.assign(this.questionsAnswered, this.questionsForm.value);

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

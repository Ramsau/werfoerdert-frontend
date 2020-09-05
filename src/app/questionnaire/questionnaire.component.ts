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
  questionsHistory: {[id: number]: any}[] = [];
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
        const value = getFormControl(question, this.questionsAnswered);
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

  getNextQuestions(): void {
    this.loading = true;

    // get questions to post from history, not from all answered questions
    // (already answered questions after which back-button gets clicked are stored in questionsAnswered)
    const postQuestions = this.questionsHistory.reduce((accumulator, questions) => {
      Object.assign(accumulator, questions);
      return accumulator;
    }, {});


    // send answers to api and get next answers
    const sub = this.questionnaireService.postAnswers(postQuestions)
      .subscribe(
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
      // push answered questions to history
      this.questionsHistory.push(this.questionsForm.value);

      this.getNextQuestions();
    } else {
      console.log('invalid');
    }
  }

  onBack(): void {
    // remove last questions from history (re-take that part)
    this.questionsHistory = this.questionsHistory.slice(0, -1);

    // re-get questions from server
    this.getNextQuestions();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Question} from './question/question.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  constructor(private httpClient: HttpClient) { }

  private parseQuestions(questionObjs): Question[] {
    if (questionObjs instanceof Array)
    {
      return questionObjs.map(
        questionObj => new Question(questionObj.text, questionObj.type, questionObj.id)
      );
    }
    else{
      return [];
    }
  }

  getQuestions(): Observable<Question[]> {
    return new Observable<Question[]>( subscriber => {
      const sub = this.httpClient.get(
        '/api/questions/next/',
      ).subscribe(questionObjs => {
        subscriber.next(this.parseQuestions(questionObjs));
        sub.unsubscribe();
      });
    });
  }

  postAnswers(postData): Observable<Question[]> {
    return new Observable<Question[]>( subscriber => {
      const sub = this.httpClient.post(
        '/api/questions/next/',
        postData,
      ).subscribe(questionObjs => {
        subscriber.next(this.parseQuestions(questionObjs));
        sub.unsubscribe();
      });
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionnaireState } from './grant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  constructor(private httpClient: HttpClient) { }

  getQuestions(): Observable<QuestionnaireState> {
    return new Observable<QuestionnaireState>( subscriber => {
      const sub = this.httpClient.get(
        '/api/questionnaire/next/',
      ).subscribe((grantObj: QuestionnaireState) => {
        subscriber.next(grantObj);
        sub.unsubscribe();
      });
    });
  }

  postAnswers(postData): Observable<QuestionnaireState> {
    return new Observable<QuestionnaireState>( subscriber => {
      const sub = this.httpClient.post(
        '/api/questionnaire/next/',
        postData,
      ).subscribe((grantObj: QuestionnaireState) => {
        subscriber.next(grantObj);
        sub.unsubscribe();
      });
    });
  }
}

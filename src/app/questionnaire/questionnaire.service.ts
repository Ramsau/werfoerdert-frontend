import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grant } from './grant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  constructor(private httpClient: HttpClient) { }

  getQuestions(): Observable<Grant> {
    return new Observable<Grant>( subscriber => {
      const sub = this.httpClient.get(
        '/api/grants/next/',
      ).subscribe((grantObj: Grant) => {
        subscriber.next(grantObj);
        sub.unsubscribe();
      });
    });
  }

  postAnswers(postData): Observable<Grant> {
    return new Observable<Grant>( subscriber => {
      const sub = this.httpClient.post(
        '/api/grants/next/',
        postData,
      ).subscribe((grantObj: Grant) => {
        subscriber.next(grantObj);
        sub.unsubscribe();
      });
    });
  }
}

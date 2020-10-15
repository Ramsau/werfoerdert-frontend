import { Injectable } from '@angular/core';
import { Question } from '../shared/question.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Grant } from '../shared/grant.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return new Observable<Question[]>( subscriber => {
      const sub = this.httpClient.get(
        '/api/admin/get_questions/',
      ).subscribe((questions: Question[]) => {
        subscriber.next(questions);
        sub.unsubscribe();
      });
    });
  }

  getGrants(): Observable<Grant[]>{
    return new Observable<Grant[]>(subscriber => {
      const sub = this.httpClient.get(
        '/api/admin/get_grants/',
      ).subscribe((grants: Grant[]) => {
        subscriber.next(grants);
        sub.unsubscribe();
      });
    });
  }

  postQuestion(question): Observable<Question[]> {
    return new Observable<Question[]>( subscriber => {
       const sub = this.httpClient.post<Question>(
        '/api/admin/post_question/',
        question,
      ).subscribe((questionsReturn: any) => {
        // post_question returns Array of all Questions
        subscriber.next(questionsReturn);
        sub.unsubscribe();
      });
    });
  }

 deleteQuestion(question): Observable<Question[]>{
  return new Observable<Question[]>( subscriber => {
    const sub = this.httpClient.post<Question>(
      '/api/admin/delete_question/',
      question,
    ).subscribe((questionsReturn: any) => {
      // post_question returns Array of all Questions
      subscriber.next(questionsReturn);
      sub.unsubscribe();
    });
  });
 }
}

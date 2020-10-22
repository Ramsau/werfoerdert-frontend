import { Injectable } from '@angular/core';
import { Question, QuestionType } from '../shared/question.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Grant } from '../shared/grant.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private cachedQuestions: Question[];

  constructor(private httpClient: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return new Observable<Question[]>( subscriber => {
      if (this.cachedQuestions){
        setTimeout(() => {
          // To prevent Error: "cannot access [subscription" - when trying to unsubscribe after getting data
          subscriber.next(this.cachedQuestions.slice());
        }, 0);
      }
      else {
        const sub = this.httpClient.get(
          '/api/admin/get_questions/',
        ).subscribe(
          (questions: Question[]) => {
            this.cachedQuestions = questions;
            subscriber.next(questions);
            sub.unsubscribe();
          },
          error => {
            subscriber.error(error);
          }
        );
      }
    });
  }

  getGrants(): Observable<Grant[]>{
    return new Observable<Grant[]>(subscriber => {
      const sub = this.httpClient.get(
        '/api/admin/get_grants/',
      ).subscribe((grants: Grant[]) => {
        subscriber.next(grants);
        sub.unsubscribe();
      },
        error => {
          subscriber.error(error);
        }
      );
    });
  }

  getQuestionTypes(): Observable<QuestionType[]>{
    return new Observable<QuestionType[]>(subscriber => {
      const sub = this.httpClient.get(
        '/api/admin/get_questiontypes/',
      ).subscribe((questiontypes: QuestionType[]) => {
          subscriber.next(questiontypes);
          sub.unsubscribe();
        },
        error => {
          subscriber.error(error);
        }
      );
    });
  }

  postQuestion(question): Observable<Question[]> {
    return new Observable<Question[]>( subscriber => {
       const sub = this.httpClient.post<Question>(
        '/api/admin/post_question/',
        question,
      ).subscribe(
        (questionsReturn: any) => {
          // post_question returns Array of all Questions, refreshing cache
          this.cachedQuestions = questionsReturn;
          subscriber.next(questionsReturn);
          sub.unsubscribe();
        },
        error => {
          subscriber.error(error);
        }
      );
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
    },
      error => {
        subscriber.error(error);
      }
    );
  });
 }
}

import { Injectable } from '@angular/core';
import { Question, QuestionType, Requirement } from '../shared/question.model';
import { Observable } from 'rxjs';
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

  getQuestion(questionID: number): Observable<Question>{
    return new Observable<Question>( subscriber => {
      let questions: Question[];
      const questionSubscription = this.getQuestions().subscribe(newQuestions => {
          questions = newQuestions;

          questions = questions.filter(question => question.id === questionID);
          if (questions.length > 0){
            subscriber.next(questions[0]);
          }
          else{
            subscriber.error('A question with this ID does\'nt exist');
          }

          questionSubscription.unsubscribe();
      },
      error => {
        subscriber.error(error);
        questionSubscription.unsubscribe();
      });
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

  getRequirements(): Observable<Requirement[]>{
     return new Observable<Requirement[]>(subscriber => {
       const sub = this.httpClient.get(
         '/api/admin/get_requirements',
       ).subscribe((requirements: Requirement[]) => {
         subscriber.next(requirements);
         sub.unsubscribe();
         },
         error => {
         subscriber.error(error);
         }
       );
     });
  }
}

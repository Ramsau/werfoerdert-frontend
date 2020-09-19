import { Injectable } from '@angular/core';
import { Question} from '../shared/question.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

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
}

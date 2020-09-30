import { Component, OnInit } from '@angular/core';
import { Question } from '../shared/question.model';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {

  constructor() {}


  ngOnInit(): void {


  }

}

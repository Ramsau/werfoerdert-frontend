import {Component, EventEmitter, NgModule, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  @Output()
  createQuestion = new EventEmitter<{}>();

  constructor() { }

  model = {textDe: null, textEn: null, questionType: null};

  ngOnInit(): void {
  }

  onQuestionAdd(): void {
    this.createQuestion.emit(this.model);
  }
}

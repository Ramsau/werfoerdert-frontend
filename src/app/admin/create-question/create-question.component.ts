import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  @Output()
  createQuestion = new EventEmitter<{}>();

  constructor() { }

  model: {id: number, textDe: string, textEn: string, questionType: number};

  ngOnInit(): void {
  }

  onQuestionAdd(): void {
    this.createQuestion.emit(this.model);
  }
}

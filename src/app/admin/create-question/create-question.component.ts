import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { QuestionType } from '../../shared/question.model';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  @Input('textDE') textDeInput: string;
  @Input('textEN') textEnInput: string;
  @Input() questionTypeFK: number;
  @Input() id: number;
  @Input() questionTypes: QuestionType[];
  @Output()
  createQuestion = new EventEmitter<{}>();

  constructor() { }

  model = {textDe: null, textEn: null, questionType: null, id: null};

  ngOnInit(): void {
    if (this.textDeInput){
      this.model.textDe = this.textDeInput;
    }
    if (this.textEnInput){
      this.model.textEn = this.textEnInput;
    }
    if (this.questionTypeFK){
      this.model.questionType = this.questionTypeFK;
    }
    if (this.id){
      this.model.id = this.id;
    }
  }

  onQuestionAdd(): void {
    this.createQuestion.emit(this.model);
  }
}

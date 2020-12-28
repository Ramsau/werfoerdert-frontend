import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { QuestionType, Requirement } from '../../shared/question.model';

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
  @Output() createQuestion = new EventEmitter<{}>();
  @Output() createRequirement = new EventEmitter<{}>();

  constructor() { }

  modelQ = {textDe: null, textEn: null, questionType: null, id: null};

  ngOnInit(): void {
    if (this.textDeInput){
      this.modelQ.textDe = this.textDeInput;
    }
    if (this.textEnInput){
      this.modelQ.textEn = this.textEnInput;
    }
    if (this.questionTypeFK){
      this.modelQ.questionType = this.questionTypeFK;
    }
    if (this.id){
      this.modelQ.id = this.id;
    }
  }

  onQuestionAdd(): void {
    this.createQuestion.emit(this.modelQ);
  }
}

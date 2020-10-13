import {Component, EventEmitter, Input, NgModule, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  @Input('textDE') textDeInput: string;
  @Input('textEN') textEnInput: string;
  @Input() questiontype: number;
  @Input() id: number;
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
    if (this.questiontype){
      this.model.questionType = this.questiontype;
    }
    if (this.id){
      this.model.id = this.id;
    }
  }

  onQuestionAdd(): void {
    this.createQuestion.emit(this.model);
  }
}

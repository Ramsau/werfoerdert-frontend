import {Component, Input, OnInit} from '@angular/core';
import {QuestionnaireState} from '../../shared/grant.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() state: QuestionnaireState;

  constructor() { }

  ngOnInit(): void {
  }

}

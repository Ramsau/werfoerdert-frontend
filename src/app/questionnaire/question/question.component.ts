import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import { Question } from './question.model';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuestionComponent),
      multi: true,
    },
  ],
})
export class QuestionComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  private initValue;
  @Input()
  question: Question;
  @ViewChild('valueInput') input: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.value = this.initValue;
  }

  onChange(): void {
    this.propagateChange(this.input.nativeElement.value);
  }

  writeValue(value: any): void {
    if (this.input) {
      this.input.nativeElement.value = value;
    }
    else {
      this.initValue = value;
    }
  }

  propagateChange = (_: any) => {};
  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void {}
}

import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {Question} from './question.model';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator, Validators
} from '@angular/forms';

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
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => QuestionComponent),
      multi: true,
    }
  ],
})
export class QuestionComponent implements OnInit, AfterViewInit, ControlValueAccessor, Validator {
  private initValue;
  @Input()  question: Question;
  @ViewChild('valueInput') input: ElementRef;
  inputType = 'checkbox';
  required = false;


  propagateChange = (_: any) => {};
  onValidationChange: any = () => {};

  constructor() {
  }

  ngOnInit(): void {
    switch (this.question.type) {
      case 1: {
        this.inputType = 'number';
        this.required = true;
        break;
      }
      case 2: {
        this.inputType = 'checkbox';
        this.required = false;
        break;
      }
      case 3: {
        this.inputType = 'date';
        this.required = true;
        break;
      }
    }
  }

  ngAfterViewInit(): void {
    this._setValue(this.initValue);
  }

  onChange(): void {
    let value;
    switch (this.question.type) {
      case 2: {
        value  = this.input.nativeElement.checked;
        break;
      }
      default: {
        value = this.input.nativeElement.value;
      }
    }
    this.propagateChange(value);
    this.onValidationChange();
  }

  _setValue(value: any): void {
    if (this.inputType === 'checkbox') {
      this.input.nativeElement.checked = value;
    } else {
      this.input.nativeElement.value = value;
    }
  }

  writeValue(value: any): void {
    console.log(value);
    if (this.input) {
      this._setValue(value);
    } else {
      this.initValue = value;
    }
  }

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void {
  }

  validate(control: AbstractControl): ValidationErrors {
    if (this.input) {
      return this.input.nativeElement.validity;
    } else {
      if (this.inputType === 'checkbox') {
        return null;
      } else {
        return {notLoaded: true};
      }
    }
  }

  registerOnValidatorChange?(fn: () => void): void{
    this.onValidationChange = fn;
  }
}

export function getFormControl(question: Question, questionsAnswered: {[id: number]: any}): FormControl{
  const validators = [];

  if ([1, 3].indexOf(question.type) > -1) {
    validators.push(Validators.required);
  }

  return new FormControl(questionsAnswered[question.id], validators);
}

import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {Question} from './question.model';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors} from '@angular/forms';

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
export class QuestionComponent implements OnInit, AfterViewInit, ControlValueAccessor {
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
    }
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.value = this.initValue;
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

  writeValue(value: any): void {
    if (this.input) {
      this.input.nativeElement.value = value;
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

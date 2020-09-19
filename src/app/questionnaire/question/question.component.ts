import {AfterViewInit, Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {Question} from '../../shared/question.model';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
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
export class QuestionComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  private initValue;
  @Input()  question: Question;
  @ViewChild('valueInput') input: ElementRef;
  inputType = 'checkbox';
  required = false;


  propagateChange = (_: any) => {};
  onValidationChange: any = () => {};
  onTouched: any = () => {};

  constructor(private element: ElementRef) {
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

    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const target = mutation.target as HTMLElement;
        const classList = Array.from(target.classList);
        try {
          if (classList.indexOf('ng-touched') > -1 && classList.indexOf('ng-invalid') > -1) {
            this.element.nativeElement.previousSibling.classList.add('nextInvalid');
          } else {
            this.element.nativeElement.previousSibling.classList.remove('nextInvalid');
          }
        }
        catch (TypeError) {}  // if previousSibling doesn't exist
      });
    }).observe(this.element.nativeElement, {
      attributes: true,
    });
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
    this.onTouched();
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
    if (this.input) {
      this._setValue(value);
    } else {
      this.initValue = value;
    }
  }

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  validate(): ValidationErrors {
    // real validation gets done elsewhere
    return null;
  }
}

export function getFormControl(question: Question, questionsAnswered: {[id: number]: any}): FormControl{
  const validators = [];

  if ([1, 3].indexOf(question.type) > -1) {
    validators.push(Validators.required);
  }

  return new FormControl(questionsAnswered[question.id], validators);
}

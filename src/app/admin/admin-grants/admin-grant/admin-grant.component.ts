import {Component, ElementRef, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import { Grant } from '../../../shared/grant.model';
import get = Reflect.get;
import {Question} from '../../../shared/question.model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin-grant',
  templateUrl: './admin-grant.component.html',
  styleUrls: ['./admin-grant.component.scss']
})
export class AdminGrantComponent implements OnInit {
  @Input() grant: Grant;
  @Input() questionsLoading: boolean;
  @ViewChild('collapseContent') collapseContent: ElementRef;
  @ViewChild('collapseQuestion') collapseQuestion: ElementRef;

  constructor() {
  }

  ngOnInit(): void {

  }

  onClick(): void {
    this.collapseContent.nativeElement.classList.toggle('active');
  }

  onClick_addQ(): void {
    this.collapseQuestion.nativeElement.classList.toggle('active_addQ');
  }

  onAddQ(): void{

  }

}



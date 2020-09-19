import { Component, OnInit } from '@angular/core';
import {Question} from '../shared/question.model';
import {AdminService} from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  questions: Question[];


  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    const sub = this.adminService.getQuestions().subscribe(
      questions => {
        this.questions = questions;
        sub.unsubscribe();
      },
      error => {
        console.log(error);
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Grant } from '../../shared/grant.model';
import { AdminService } from '../admin.service';
import { Question } from '../../shared/question.model';


@Component({
  selector: 'app-admin-grants',
  templateUrl: './admin-grants.component.html',
  styleUrls: ['./admin-grants.component.scss']
})
export class AdminGrantsComponent implements OnInit {
  grants: Grant[];
  questions: Question[];
  questionLoading = true;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    const subG = this.adminService.getGrants().subscribe(
      grants => {
        this.grants = grants;
        subG.unsubscribe();
      },
      error => {
        console.log(error);
      }
    );
    const subQ = this.adminService.getQuestions().subscribe(
      questions => {
        this.questions = questions;
        subQ.unsubscribe();
        this.questionLoading = false;
      },
      error => {
        console.log(error);
      }
    );
  }
}

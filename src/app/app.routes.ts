import { RouterModule, Routes } from '@angular/router';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { IndexComponent } from './index/index.component';
import { AdminComponent } from './admin/admin.component';
import {AdminGrantsComponent} from './admin/admin-grants/admin-grants.component';
import {AdminQuestionsComponent} from './admin/admin-questions/admin-questions.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'admin', component: AdminComponent, children: [
      {path: '', redirectTo: '/admin/grants', pathMatch: 'full'},
      {path: 'grants', component: AdminGrantsComponent},
      {path: 'questions', component: AdminQuestionsComponent},
  ]},
];

export const routing = RouterModule.forRoot(routes);

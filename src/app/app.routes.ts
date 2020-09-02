import { RouterModule, Routes } from '@angular/router';
import {QuestionnaireComponent} from './questionnaire/questionnaire.component';
import {IndexComponent} from './index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
];

export const routing = RouterModule.forRoot(routes);

import { RouterModule, Routes } from '@angular/router';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { IndexComponent } from './index/index.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'admin', component: AdminComponent  }
];

export const routing = RouterModule.forRoot(routes);

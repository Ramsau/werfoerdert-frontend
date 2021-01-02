import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { QuestionComponent } from './questionnaire/question/question.component';
import {HttpClient, HttpClientModule, } from '@angular/common/http';
import { LoadingComponent } from './shared/loading/loading.component';
import { routing } from './app.routes';
import { IndexComponent } from './index/index.component';
import { ResultsComponent } from './questionnaire/results/results.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGrantsComponent } from './admin/admin-grants/admin-grants.component';
import { AdminQuestionsComponent } from './admin/admin-questions/admin-questions.component';
import { AdminGrantComponent } from './admin/admin-grants/admin-grant/admin-grant.component';
import { CreateQuestionComponent } from './admin/create-question/create-question.component';
import { MessageComponent } from './shared/message/message.component';
import {ClickOutsideModule} from 'ng-click-outside';

@NgModule({
  declarations: [
    AppComponent,
    QuestionnaireComponent,
    QuestionComponent,
    LoadingComponent,
    IndexComponent,
    ResultsComponent,
    AdminComponent,
    AdminGrantsComponent,
    AdminQuestionsComponent,
    AdminGrantComponent,
    CreateQuestionComponent,
    MessageComponent,
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      routing,
      FormsModule,
      ClickOutsideModule,
    ],
  providers: [HttpClient ],
  bootstrap: [AppComponent]
})
export class AppModule { }

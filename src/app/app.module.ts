import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { QuestionComponent } from './questionnaire/question/question.component';
import {HttpClient, HttpClientModule, } from '@angular/common/http';
import { LoadingComponent } from './shared/loading/loading.component';
import {routing} from './app.routes';
import { IndexComponent } from './index/index.component';
import { ResultsComponent } from './questionnaire/results/results.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionnaireComponent,
    QuestionComponent,
    LoadingComponent,
    IndexComponent,
    ResultsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
  ],
  providers: [HttpClient ],
  bootstrap: [AppComponent]
})
export class AppModule { }

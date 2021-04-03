import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Student } from './model/student';
import { AdminComponent } from './page/admin/admin.component';
import { HomeComponent } from './page/home/home.component';
import { QuestionEditorComponent } from './page/question-editor/question-editor.component';
import { QuizEditorComponent } from './page/quiz-editor/quiz-editor.component';
import { QuizComponent } from './page/quiz/quiz.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'quiz/:id',
    component: QuizComponent,
  },
  {
    path: 'edit-quiz/:id',
    component: QuizEditorComponent,
  },
  {
    path: 'edit-question/:id/:qid',
    component: QuestionEditorComponent,
  },
  {
    path: '**',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

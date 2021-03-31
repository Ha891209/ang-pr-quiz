import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Answer } from 'src/app/model/answer';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/service/question-service.service';
import { QuizService } from 'src/app/service/quiz-service.service';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss']
})
export class QuestionEditorComponent implements OnInit {

  quiz: number = 0;
  lastID: number = 0;

  question$: Observable<Question> = this.activatedRoute.params.pipe(
    switchMap(params => {
      this.quiz = params.qid;
      if (Number(params.id) === 0) {
        return of(new Question());
      }
      return this.questionService.get(Number(params.id));

    })
  );

  defaultAnswer: Answer[] = [
    { "id": 1, "content": "", "correct": false },
    { "id": 2, "content": "", "correct": false },
    { "id": 3, "content": "", "correct": false }
  ];

  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void { }

  onFormSubmit(question: Question): void {
    try {
      if (question.id == 0) {
        question.answers = this.defaultAnswer;
        this.questionService.create(question).subscribe(
          () => {
            this.quizService.get(this.quiz).subscribe(
              data => {
                this.questionService.getAll().subscribe(
                  item => {
                    this.lastID = item.slice(-1)[0].id;
                    data.questions.push(this.lastID);
                    this.quizService.update(data).subscribe(
                      () => {
                        this.router.navigate(['/edit-quiz/' + this.quiz]);
                      });
                  });
              })
          })
      }
      else {
        this.questionService.update(question).subscribe(
          () => this.router.navigate(['/edit-quiz/' + this.quiz])
        );
      }
    } catch (error) {
    }
  }

}
function switchMap(arg0: (params: any) => any): any {
  throw new Error('Function not implemented.');
}


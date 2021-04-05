import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Question } from 'src/app/model/question';
import { Quiz } from 'src/app/model/quiz';
import { QuestionService } from 'src/app/service/question-service.service';
import { QuizService } from 'src/app/service/quiz-service.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quizList$ = this.quizService.list$;
  currentPoints: number = 0;
  tempPoints: number = 0;
  questionIDArray: number[] = [];
  questionArrayLength: number = 0;
  questionArray: Question[] = [];
  currentPosition: number = 0;
  quizID: number = 0;
  quiz: Quiz = new Quiz();
  quizQuestionsAsNumbers: number[] = [];
  questionList$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
  currentQuestion$: BehaviorSubject<Question> = new BehaviorSubject<Question>(new Question());
  numberOfQuestion: number = 1;
  selectedAnswer: number = 0;
  finishedQuiz: boolean = false;
  checkedAnswer: boolean = false;
  points: number = 0;
  correctAnswers: number = 0;

  quiz$: Observable<Quiz> = this.activatedRoute.params.pipe(
    switchMap(params => {

      if (Number(params.id) === 0) {
        return of(new Quiz());
      }
      return this.quizService.get(Number(params.id)).pipe(
        tap(
          item => {
            this.quizID = params.id;
            this.questionIDArray = item.questions;
            this.questionArrayLength = item.questions.length;
            item.questions.forEach(element => {
              this.questionService.get(element).subscribe(
                data => {
                  this.questionArray.push(data);
                })
              console.table(this.questionArray);
            })
          }
        )
      );

    })
  );


  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void { }

  checkPoints(checkedA: number): void {
    let question = this.questionArray[this.currentPosition - 1];
    let answers = question.answers;
    if (answers[checkedA].correct === true) this.tempPoints += question.points;
    else this.tempPoints += 0;
  }

  nextPosition(): void {
    let prevID = this.questionIDArray[this.currentPosition - 1];
    let currID = this.questionIDArray[this.currentPosition];
    this.currentPoints = this.tempPoints;
    if (this.currentPosition === this.questionArrayLength) {
      document.querySelector('#q_' + prevID)?.classList.add('hide');
      document.querySelector('.next__button')?.classList.add('hide');
    } else {
      document.querySelector('#q_' + prevID)?.classList.add('hide');
      document.querySelector('#q_' + currID)?.classList.remove('hide');
      this.currentPosition++;
    }
  }



}

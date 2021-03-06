import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Quiz } from 'src/app/model/quiz';
import { QuizService } from 'src/app/service/quiz-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  selectedItemToDelete: Quiz = new Quiz();

  constructor(private quizSrv: QuizService) { }
  phrase: string = "";
  currentCol: string = "";


  quizzes$: Observable<Quiz[]> = this.quizSrv.getAll();

  ngOnInit(): void {
  }

  setToDelete(item: Quiz): void {
    this.selectedItemToDelete = item;
  }
  onChangePhrase(event: Event) {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onColumnClick(columnName: string) {
    this.currentCol = columnName;
  }
}
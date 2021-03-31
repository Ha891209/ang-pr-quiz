import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from 'src/app/model/quiz';
import { QuizService } from 'src/app/service/quiz-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  quizList$: BehaviorSubject<Quiz[]> = this.quizService.list$;

  phrase: string = '';
  filterKey: string = 'title';
  sorterKey: string = '';
  sorterDirection: number = 1;

  constructor(
    private quizService: QuizService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.quizService.getAll();
  }

  onRemove(quiz: Quiz): void {
    this.quizService.remove(quiz).subscribe(
      () => {
        this.quizService.getAll();
        this.router.navigate(['/admin']);
      }
    )
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onSort(key: string): void {
    if (key === this.sorterKey) {
      this.sorterDirection *= -1;
    } else {
      this.sorterDirection = 1;
    }

    this.sorterKey = key;
  }

}

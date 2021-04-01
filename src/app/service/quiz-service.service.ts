import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Quiz } from '../model/quiz';
import { ConfigService } from './config-service.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  apiUrl: string = 'http://localhost:3000/quizzes';
  list$: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>([]);

  constructor(private http: HttpClient,
    public config: ConfigService) { }

  getAll(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}`);
  }

  get(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/${id}`);
  }

  remove(quiz: Quiz): Observable<Quiz> {
    return this.http.delete<Quiz>(`${this.apiUrl}/${quiz.id}`);
  }

  create(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.apiUrl}`, quiz);
  }

  update(quiz: Quiz): Observable<Quiz> {
    return this.http.patch<Quiz>(`${this.apiUrl}/${quiz.id}`, quiz);
  }

}
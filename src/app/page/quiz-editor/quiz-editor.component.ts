import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/model/quiz';
import { QuizService } from 'src/app/service/quiz-service.service';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.scss']
})
export class QuizEditorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private quizSrv: QuizService,
    private router: Router) { }

  quiz: Quiz = new Quiz();
  title: string = '';

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.id == 0) {
        this.quiz = new Quiz();
        this.title = "New";
      }
      else {
        this.quizSrv.get(params.id).subscribe(item => {
          this.quiz = item;
        })

        this.title = "Edit";
      }
    })
  }

  onUpdate(form: NgForm, item: Quiz): void {

    //try {
    if (item.id == 0) {
      this.quizSrv.create(item);
      //this.toastr.warning('Sikeresen hozzáadásra került');
      this.router.navigate(['/admin']);
    }
    else {
      this.quizSrv.update(item);
      /// this.toastr.success('Sikeres módosítás :)');
      this.router.navigate(['/admin']);
    }
  }

}

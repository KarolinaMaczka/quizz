import {Component, OnInit} from '@angular/core';
import {QuizService} from "./quiz.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';

  quizzes: any[] = [];

  constructor(private quizService: QuizService) {}

  async ngOnInit() {
    await this.fetchQuizzes();
  }

  async fetchQuizzes() {
    try {
      this.quizzes = await this.quizService.getQuizzes();
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  }

}

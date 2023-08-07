import {Component, Inject, OnInit} from '@angular/core';
import {QuizService} from "./services/quiz.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';

  quizzes: any[] = [];

  constructor(@Inject(QuizService) private quizService: QuizService) {}

  async ngOnInit() {
    await this.fetchQuizzes();
  }

  async fetchQuizzes() {
    try {
      this.quizzes = await this.quizService.getTests('VurpEz2Z5HFnoMc4UZT4');
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  }

}

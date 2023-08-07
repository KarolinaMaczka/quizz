import {Component, OnInit} from '@angular/core';
import {QuizService} from "../services/quiz.service";
import { Test } from '../models/test.model';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  userId = 'VurpEz2Z5HFnoMc4UZT4'; // Replace with the actual user ID
  tests: Test[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.getTestsForUser();
  }

  getTestsForUser(): void {
    this.quizService.getTests(this.userId)
      .then(tests => {
        this.tests = tests;
      })
      .catch(error => {
        console.error('Error fetching tests:', error);
      });
  }
}

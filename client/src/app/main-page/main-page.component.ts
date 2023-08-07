import {Component, OnInit} from '@angular/core';
import {QuizService} from "../services/quiz.service";
import { Test } from '../models/test.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  userId = 'VurpEz2Z5HFnoMc4UZT4'; // Replace with the actual user ID
  tests: Test[] = [];
  links: { title: string; id: string; isActive: boolean }[] = [];


  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.getTestsForUser();
  }

  getTestsForUser(): void {
    this.quizService.getTests(this.userId)
      .then(tests => {
        this.tests = tests;
        this.links = this.tests.map(test => ({
          title: test.title,
          id: test.id,
          isActive: false
        }));
      })
      .catch(error => {
        console.error('Error fetching tests:', error);
      });
  }

  showInfo(testId: string): void {
    this.router.navigateByUrl(`/view-test/${testId}`);
  }
}

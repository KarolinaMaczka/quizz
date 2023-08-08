import {Component, OnInit} from '@angular/core';
import {QuizService} from "../services/quiz.service";
import { Test } from '../models/test.model';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  userId = '';
  tests: Test[] = [];
  links: { title: string; id: string; isActive: boolean }[] = [];

  constructor(private quizService: QuizService,
              private router: Router,
              private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = <string>params.get('id')
    });
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

  createNewTest(): void {
    const newTestTitle = prompt('Enter the title for the new test:');
    if (newTestTitle !== null) {
      this.quizService.createTest(this.userId, { title: newTestTitle, id: 'a' })
        .then(( )=>{this.getTestsForUser()})
        .catch(error => {
          console.error('Error creating test:', error);
        });
    }
  }
}

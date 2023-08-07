import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Card } from '../models/card.model';

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.css']
})
export class ViewTestComponent implements OnInit {
  testId = 'p8RNyv97BarJaQA3mEg4'; // Replace with the actual test ID
  userId = 'VurpEz2Z5HFnoMc4UZT4'; // Replace with the actual user ID
  cards: Card[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.getCardsForTest();
  }

  getCardsForTest(): void {
    this.quizService.getCards(this.userId,this.testId)
      .then(cards => {
        this.cards = cards;
      })
      .catch(error => {
        console.error('Error fetching cards:', error);
      });
  }
}

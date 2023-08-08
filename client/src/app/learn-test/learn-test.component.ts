import { Component, OnInit } from '@angular/core';
import {QuizService} from "../services/quiz.service";
import {Card} from "../models/card.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-learn-test',
  templateUrl: './learn-test.component.html',
  styleUrls: ['./learn-test.component.css']
})
export class LearnTestComponent implements OnInit {
  userId = '';
  flashcards: Card[] = [];
  currentCardIndex: number =0;
  showFlashcard: boolean = true;
  showCongratulations: boolean = false;
  testId: string = '';
  testTitle: string= '';
  constructor(private quizService: QuizService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.testId = <string>params.get('id');
      this.testTitle = <string>params.get('title');
      this.userId =<string>params.get('userId')
    });
    this.quizService.getCards(this.userId, this.testId)
      .then(cards => {
        this.flashcards = cards;
      })
      .catch(error => {
        console.error('Error fetching flashcards:', error);
      });
  }

  nextCard(): void {
    this.currentCardIndex++;
    if (this.currentCardIndex === this.flashcards.length) {
      this.showFlashcard = false;
      this.showCongratulations = true;
    } else {
      this.showFlashcard = true;
      this.showCongratulations = false;
    }
  }

  prevCard(): void {
    this.currentCardIndex--;
    if (this.currentCardIndex < 0) {
      this.currentCardIndex = 0;
    }
    this.showFlashcard = true;
    this.showCongratulations = false;
  }




}


import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Card } from '../models/card.model';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.css']
})
export class ViewTestComponent implements OnInit {
  testId = 'p8RNyv97BarJaQA3mEg4';
  userId = 'VurpEz2Z5HFnoMc4UZT4';
  cards: Card[] = [];
  testTitle: string ='';
  newCardTerm: string = '';
  newCardDefinition: string = '';
  showAddCardForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService
  ) {}
  ngOnInit(): void {
    this.loadTest();
  }

  loadTest(): void {
    this.quizService.getCards(this.userId,this.testId)
      .then(test => {
        console.log(test)
        this.cards = test;
      })
      .catch(error => {
        console.error('Error fetching test details:', error);
        this.router.navigate(['/']);
      });
  }

  addCard(): void {
    this.quizService.createCard(this.userId, this.testId,{term: this.newCardTerm, definition: this.newCardDefinition, id:'-1'})
      .then(() => {
        this.loadTest();
        this.showAddCardForm = false;
        this.newCardTerm = '';
        this.newCardDefinition = '';
      })
      .catch(error => {
        console.error('Error adding card:', error);
      });
  }

  deleteCard(id: string){
    this.quizService.deleteCard(this.userId, this.testId, id).then(
      ()=> {
        this.loadTest();
      }
    ).catch(error => {
      console.error('Error deleting card:', error);
    });
  }

}

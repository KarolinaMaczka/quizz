import {Component, OnInit, ViewChild} from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Card } from '../models/card.model';
import {ActivatedRoute, Router} from "@angular/router";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {Test} from "../models/test.model";

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.css']
})
export class ViewTestComponent implements OnInit {
  testId: string = 'p8RNyv97BarJaQA3mEg4';
  userId = 'VurpEz2Z5HFnoMc4UZT4';
  cards: Card[] = [];
  testTitle: string | null ='';
  newCardTerm: string = '';
  newCardDefinition: string = '';
  showAddCardForm: boolean = false;
  @ViewChild('confirmationDialog') confirmationDialog: any;
  test: Test |undefined


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private dialog: MatDialog,
) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.testId = <string>params.get('id');
      this.testTitle = params.get('title');
    });
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

  editCard(card: Card) {
    card.edit = true;
  }

  updateCard(card: Card) {
    this.quizService.updateCard(this.userId, this.testId, card.id, card)
    card.edit = !card.edit;
  }

  discardChanges(): void {
    this.showAddCardForm = false;
    this.newCardTerm = '';
    this.newCardDefinition = '';
  }

  deleteTest(): void {
    const confirmation = window.confirm('Are you sure you want to delete this test?');

    if (confirmation) {
      this.quizService.deleteTest(this.userId, this.testId)
        .then(() => {
          this.router.navigate(['/main-page']);
        })
        .catch((error:any) => {
          console.error('Error deleting test:', error);
        });    }

  }

}




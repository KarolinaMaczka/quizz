import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private baseUrl = 'https://quizz-service.onrender.com/api';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Promise<any> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return Promise.reject(errorMessage);
  }

  async createUser(user: any): Promise<any> {
    const url = `${this.baseUrl}/users`;
    return firstValueFrom(this.http.post<any>(url, user).pipe(
      catchError(this.handleError)
    ));
  }

  async createTest(userId: string, test: any): Promise<any> {
    const url = `${this.baseUrl}/users/${userId}/tests`;
    return firstValueFrom(this.http.post<any>(url, test).pipe(
      catchError(this.handleError)
    ));
  }

  async createCard(userId: string, testId: string, card: any): Promise<any> {
    const url = `${this.baseUrl}/users/${userId}/tests/${testId}/cards`;
    return firstValueFrom(this.http.post<any>(url, card).pipe(
      catchError(this.handleError)
    ));
  }

  async getTests(userId: string): Promise<any> {
    const url = `${this.baseUrl}/users/${userId}/tests`;
    return firstValueFrom(this.http.get<any[]>(url).pipe(
      catchError(this.handleError)
    ));
  }

  async getCards(userId: string, testId: string): Promise<any> {
    const url = `${this.baseUrl}/users/${userId}/tests/${testId}/cards`;
    return firstValueFrom(this.http.get<any[]>(url).pipe(
      catchError(this.handleError)
    ));
  }

  async getUsers(): Promise<any> {
    const url = `${this.baseUrl}/users`;
    return firstValueFrom(this.http.get<any[]>(url).pipe(
      catchError(this.handleError)
    ));
  }

  async updateCard(userId: string, testId: string, cardId: string, card: any): Promise<any> {
    const url = `${this.baseUrl}/users/${userId}/tests/${testId}/cards/${cardId}`;
    return firstValueFrom(this.http.put<any>(url, card).pipe(
      catchError(this.handleError)
    ));
  }

  async deleteCard(userId: string, testId: string, cardId: string): Promise<any> {
    const url = `${this.baseUrl}/users/${userId}/tests/${testId}/cards/${cardId}`;
    return firstValueFrom(this.http.delete<any>(url).pipe(
      catchError(this.handleError)
    ));
  }

  async deleteTest(userId: string, testId: string){
    const url = `${this.baseUrl}/users/${userId}/tests/${testId}`;
    return firstValueFrom(this.http.delete<any>(url).pipe(
      catchError(this.handleError)
    ));
  }

}


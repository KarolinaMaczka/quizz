import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = 'http://localhost:3000/api/quizzes';
  constructor(private http: HttpClient) { }

  async getQuizzes(): Promise<any[]> {
    const response = await firstValueFrom(this.http.get<any[]>(this.apiUrl));
    return response || [];
  }


}

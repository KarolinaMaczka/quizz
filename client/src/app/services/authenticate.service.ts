import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../models/user.model";
import {firstValueFrom} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private baseUrl = 'https://quizz-service.onrender.com/api';
  authenticated: boolean = false;
  user: User = {id: '', login: '', password: ''};
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

  setAuthenticated(value: boolean) {
    this.authenticated = value;
  }

  isAuthenticatedUser() {
    return this.authenticated;
  }

  async login(username: string, password: string): Promise<User>{
    const url = `${this.baseUrl}/users`;

    try {
      const users = await firstValueFrom(this.http.get<any[]>(url).pipe(
        catchError(this.handleError)
      ));

      console.log(users)
      console.log(users[0].login)
      const user = users.find((u: any) => u.login === username && u.password === password);
      if (user) {
        this.user = user;
        return user;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }  }

  createUser(login: string, password: string): Promise<any> {
    const user = { login: login, password: password, id: '-1' };
    console.log(user)
    const url = `${this.baseUrl}/users`;
    return firstValueFrom(this.http.post<any>(url, user).pipe(
      catchError(this.handleError)
    ));
  }
}

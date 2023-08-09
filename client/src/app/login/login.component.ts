import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {QuizService} from "../services/quiz.service";
import {AuthenticateService} from "../services/authenticate.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private quizService: QuizService, private router: Router, private authService: AuthenticateService) {}

  async login() {
    try {
      const user = await this.authService.login(this.username, this.password);
      if (user) {
        await this.router.navigateByUrl(`/main-page/${user.id}`);
      } else {
        console.log('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  signUp(){
    this.router.navigateByUrl(`/create-user`)
  }
}

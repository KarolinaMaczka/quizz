import {Component, OnInit} from '@angular/core';
import {AuthenticateService} from "../services/authenticate.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuizService} from "../services/quiz.service";
import {CreateUserValidators} from "./create-user-validators";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit{
  user = {
    login: '',
    password: ''
  };
  existingLogins: string[] = [];
  userForm: FormGroup = new FormGroup<any>({}, {}, );

  constructor(private authService: AuthenticateService,
              private router: Router,
              private formBuilder: FormBuilder,
              private quizService: QuizService) {
    this.userForm = this.formBuilder.group({
      login: ['', {
        validators: [Validators.required, CreateUserValidators.uniqueLogin(this.existingLogins)],
        updateOn: 'submit'
      }],
      password: ['', {validators: [Validators.required, CreateUserValidators.passwordFormat], updateOn: 'submit'}]
    });
  }

  async ngOnInit() {
    console.log(this.quizService.getUsers())
    const users = await this.quizService.getUsers();
    this.existingLogins = users.map((user: any) => user.login);
    console.log(this.existingLogins);

  }


  async onSubmit() {
    if (this.userForm.invalid) {
      console.log("on submit invalid")
      return;
    }

    const login = this.userForm.value.login;
    const password = this.userForm.value.password;

    if (this.existingLogins.includes(login)) {
      this.userForm.get('login')?.setErrors({ uniqueLogin: true });
      return;
    }

    try {
      console.log("trying to create a user")
      const user = await this.authService.createUser(login, password);
      if (user) {
        this.existingLogins.push(login)
        await this.router.navigateByUrl(``);
        console.log('User created');
      }
    } catch (error) {
      console.error('Error during creating user:', error);
    }
  }

  LogIn() {
    this.router.navigateByUrl(`/`)
  }
}

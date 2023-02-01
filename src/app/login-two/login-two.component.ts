import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';

import { AuthService } from '../auth.service';
import { first } from 'rxjs';
import { AccountService, AlertService } from '../_services';
@Component({
  selector: 'app-login-two',
  templateUrl: './login-two.component.html',
  styleUrls: ['./login-two.component.css']
})
export class LoginTwoComponent {
  authForm!: FormGroup;
  isSubmitted = false;
  userSubject: any;
  loading: boolean | undefined;


  constructor(private authService: AuthService, private route: ActivatedRoute, private accountService: AccountService, private alertService: AlertService, private router: Router, private formBuilder: FormBuilder) {

  }
  ngOnInit() {
    this.steup()

    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40)
        ]
      ]
    });
  }
  get formControls(): { [key: string]: AbstractControl } {
    return this.authForm.controls;
  }
  signIn() {
    this.isSubmitted = true;
    this.alertService.clear();
    console.log(this.formControls);
    if (this.authForm.invalid) {
      return;
    }


    console.log(this.authForm.value["username"]);
    console.log(this.authForm.value["password"]);
    this.accountService.login(this.authForm.value["username"], this.authForm.value["password"]).pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
          this.router.navigateByUrl(returnUrl);
          //  this.router.navigateByUrl('/admin');
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
    this.authService.signIn(this.authForm.value);
  }
  steup() {
    console.log("try first constructor LoginComponent");
    const jsonData = [{ "firstName": "admin", "lastName": "gmail", "username": "admin@gmail.com", "password": "Admin", "id": 1 }];
    localStorage.setItem('user', JSON.stringify(jsonData));
    localStorage.setItem('triosuite_task_abualwafa', JSON.stringify(jsonData));
    this.accountService.register(jsonData as User);
    //  console.log(this.accountService.userValue);
    if (!this.accountService.userValue) {
      location.reload()
    }
  }
}

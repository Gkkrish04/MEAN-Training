import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  noLogin(form: NgForm){
    if(form.invalid){
      return;
    }

    this.authService.loginUser(form.value.email, form.value.passwd);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSub:Subscription;


  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus =>{
      this.isLoading = false;
    })
  }

  noLogin(form: NgForm){
    if(form.invalid){
      return;
    }

    this.authService.loginUser(form.value.email, form.value.passwd);
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}

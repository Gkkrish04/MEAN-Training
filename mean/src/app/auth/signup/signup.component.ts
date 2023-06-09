import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub:Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus =>{
        this.isLoading = false;
      }
    );
  }

  noSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(
      form.value.userName,
      form.value.email,
      form.value.passwd
    );
    form.resetForm();
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}

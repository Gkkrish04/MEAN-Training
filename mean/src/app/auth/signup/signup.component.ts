import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoading = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  noSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser(
      form.value.userName,
      form.value.email,
      form.value.passwd
    );
    form.resetForm();
  }
}

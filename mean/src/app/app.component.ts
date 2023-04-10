import { Component, OnInit } from '@angular/core';
import { Post } from './model/post.model';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authServe: AuthService){}

  ngOnInit(): void {
    this.authServe.autoAuthUser();
  }
}

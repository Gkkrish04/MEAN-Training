import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAuthendicate = false;
  userName:any;
  private authListenerSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userAuthendicate = this.authService.getIsAuth();
    this.authListenerSub = this.authService.getAuthStatusListener().subscribe(isAuthendicate => {
      this.userAuthendicate = isAuthendicate;
    });
    this.userName = localStorage.getItem('username');
  }

  onLogout(){
    this.userName = '';
    this.authService.logoutUser();
  }

  ngOnDestroy(): void {
    this.authListenerSub.unsubscribe();
  }
}

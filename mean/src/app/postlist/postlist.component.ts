import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Post } from '../model/post.model';
import { CommonService } from '../service/common.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss'],
})
export class PostlistComponent implements OnInit, OnDestroy {
  isLoading = false;

  totalPost = 0;
  postPerPage = 2;
  currPage = 1;
  pageSizeOpt = [1, 2, 5, 10];

  posts: Post[] = [];
  userAuthendicate = false;
  userId: string;
  private postsSub: Subscription | undefined;
  private authListenerStatusSub: Subscription;

  constructor(public commonService: CommonService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    this.isLoading = true;
    this.commonService.getPost(this.postPerPage, this.currPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.commonService
      .getPostUpdateListner()
      .subscribe((postData:{posts:Post[], postCount: number}) => {
        this.totalPost = postData.postCount;
        this.posts = postData.posts;
        this.isLoading = false;
      });

      this.userAuthendicate = this.authService.getIsAuth();

     this.authListenerStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthendication => {
      this.userAuthendicate = isAuthendication;
      this.userId = this.authService.getUserId();
     });
  }

  onChangePage(pageData: PageEvent) {
    // console.log(pageData);
    // this.isLoading = true;
    this.currPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.commonService.getPost(this.postPerPage, this.currPage);
  }

  onDelete(postId: any) {
    // this.isLoading = true;
    this.commonService.deletePost(postId).subscribe((response) => {
      console.log(response.message);
      this.commonService.getPost(this.postPerPage, this.currPage);
    });
  }

  ngOnDestroy() {
    this.postsSub?.unsubscribe();
    this.authListenerStatusSub.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Post } from '../model/post.model';
import { CommonService } from '../service/common.service';
import { Subscription } from 'rxjs';

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
  private postsSub: Subscription | undefined;

  constructor(public commonService: CommonService) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    this.isLoading = true;
    this.commonService.getPost(this.postPerPage, this.currPage);
    this.postsSub = this.commonService
      .getPostUpdateListner()
      .subscribe((postData:{posts:Post[], postCount: number}) => {
        this.totalPost = postData.postCount;
        this.posts = postData.posts;
        this.isLoading = false;
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
  }
}

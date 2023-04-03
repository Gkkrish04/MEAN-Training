import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Post } from '../model/post.model';
import { CommonService } from '../service/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit, OnDestroy {

  isLoading = false;

  totalPost = 10;
  postPerPage = 2;
  pageSizeOpt = [1, 2, 5, 10];
  
  posts:Post[] = [];
  private postsSub: Subscription | undefined;

  constructor(public commonService:CommonService ) { }

  ngOnInit(): void {
    this.getPost();
  }

  onChangePage(pageData: PageEvent){
    console.log(pageData);
  }

  getPost(){
    this.isLoading = true;
    this.commonService.getPost();
    this.postsSub = this.commonService.getPostUpdateListner().subscribe((posts)=>{
      this.posts = posts;
      this.isLoading = false;
    })
  }

  onDelete(postId:any){
    this.commonService.deletePost(postId);
  }

  ngOnDestroy(){
    this.postsSub?.unsubscribe();
  }

}

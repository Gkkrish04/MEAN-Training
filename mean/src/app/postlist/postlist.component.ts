import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../model/post.model';
import { CommonService } from '../service/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit, OnDestroy {
  
  posts:Post[] = [];
  private postsSub: Subscription | undefined;

  constructor(public commonService:CommonService ) { }

  ngOnInit(): void {
    this.posts = this.commonService.getPost();
    //subscribe have three arguments 1: function of data emmited 2: error of emmited 3: when observable completed
    this.postsSub = this.commonService.getPostUpdateListner().subscribe((posts)=>{
      this.posts = posts;
    });
  }

  ngOnDestroy(){
    this.postsSub?.unsubscribe();
  }

}

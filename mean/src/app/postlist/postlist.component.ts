import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post.model';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {

posts:Post[] = [];

  constructor(public commonService:CommonService ) { }

  ngOnInit(): void {
    this.posts = this.commonService.getPost();
  }

}

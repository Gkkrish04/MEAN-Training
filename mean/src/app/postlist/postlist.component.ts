import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {

  posts:any;

  constructor() { }

  ngOnInit(): void {

    this.posts = [
      {title:'sample title 1', content: 'sample content data!'},
      {title:'sample title 2', content: 'sample content data!'},
      {title:'sample title 3', content: 'sample content data!'},
    ]
  }

}

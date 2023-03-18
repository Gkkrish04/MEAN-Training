import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {

  @Input() posts:Post[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

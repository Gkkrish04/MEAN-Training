import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
  
  @Output() postCreate = new EventEmitter<Post>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddPost(){
    const post: Post = {title: this.enteredTitle, content: this.enteredContent};
    this.postCreate.emit(post);
  }
}

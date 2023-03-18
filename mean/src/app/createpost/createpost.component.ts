import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  onAddPost(form:NgForm){
    if(form.invalid){
      return;
    }
    const post: Post = {title: form.value.title, content: form.value.content};
    this.postCreate.emit(post);
  }

  //using form tag for get data from all input field and also we do validation for input fields, we using the local referance tag to set default angular ngForm element, this tag give as entire html form element. this ngForm object give as all the parameters, we pass this local referance tag element to addpost() parameter.
}

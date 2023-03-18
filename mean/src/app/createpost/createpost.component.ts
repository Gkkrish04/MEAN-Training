import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
  
  @Output() postCreate = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAddPost(){
    const post = {title: this.enteredTitle, content: this.enteredContent};
    console.log('child', post);
    this.postCreate.emit(post);
  }


  //using event emitter to transfer the data to other components, using emit to passing the post as an argument of emit() then we using @output decorater for passing the data to outside of the component.
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit {

  newPost = 'NO CONTENT!';

  constructor() { }

  ngOnInit(): void {
  }

  onAddPost(){
    this.newPost = 'This user post';
  }
}

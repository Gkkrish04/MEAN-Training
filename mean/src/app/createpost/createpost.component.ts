import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit {
  
  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
  }

  onAddPost(form:NgForm){
    if(form.invalid){
      return;
    }
    this.commonService.addPost(form.value.title, form.value.content);
  }

  //now we using service to get and list the data form input, if we using multiple components the data transfer is difficult to handle with the help of event emitter. so we inject the service file to angular. we using this service file to get and add the post data from input this method is called dependency injection.
}

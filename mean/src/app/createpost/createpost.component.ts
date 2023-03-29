import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit {

  post: any;
  private mode = 'create';
  private postId: any;
  
  constructor(public commonService: CommonService, public activeroute: ActivatedRoute) { }

  //we using the activated route to find this form used by which purpose like post create or post edit, this activated route will give as an routing object.

  ngOnInit(): void {
    //we using paramMap it's basically observable, we using this paramMap to find the statis of routing url and if url has postId we get the data from routing url.

    this.activeroute.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.commonService.getSinglePost(this.postId);
      }else{
        this.mode = 'create';
        this.postId = null;
      }
    })
  }

  onSavePost(form:NgForm){
    if(form.invalid){
      return;
    }

    if(this.mode == 'create'){
      this.commonService.addPost(form.value.title, form.value.content);
      form.resetForm();
    }else if(this.mode == 'edit'){
      this.commonService.updatePost(this.postId, form.value.title, form.value.content);
      form.resetForm();
    }
  }
}

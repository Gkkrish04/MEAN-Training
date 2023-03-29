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
  isLoading = false;
  
  constructor(public commonService: CommonService, public activeroute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activeroute.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.commonService.getSinglePost(this.postId).subscribe((postData)=>{
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
           }
        })
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
    this.isLoading = true;
    if(this.mode == 'create'){
      this.commonService.addPost(form.value.title, form.value.content);
      form.resetForm();
    }else if(this.mode == 'edit'){
      this.commonService.updatePost(this.postId, form.value.title, form.value.content);
      form.resetForm();
    }
  }
}

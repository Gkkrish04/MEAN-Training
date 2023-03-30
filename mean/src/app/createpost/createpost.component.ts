import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss'],
})
export class CreatepostComponent implements OnInit {
  //now we going to do reactive form, so we can create our form Dynamically, so first we need to create form group, this from group is top level of the from its group all the form

  formgp: FormGroup;

  post: any;
  private mode = 'create';
  private postId: any;
  isLoading = false;

  constructor(
    public commonService: CommonService,
    public activeroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //initialization of from group, this will create new object, this takes that object as an argument, we can assign the key values to take control like title, once assign key then create the form control() object, this form control has arguments, first argument is begining state of field, we assign null like empty value, this form only for creation if in a edit form we need to set the value for the form

    this.formgp = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      'content': new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.activeroute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.commonService.getSinglePost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
          
          // here we set the form value for the edit form
          this.formgp.setValue({'title': this.post.title, 'content': this.post.content})
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  // onSavePost(form: NgForm) {
  //   if (form.invalid) {
  //     return;
  //   }
  //   this.isLoading = true;
  //   if (this.mode == 'create') {
  //     this.commonService.addPost(form.value.title, form.value.content);
  //     form.resetForm();
  //   } else if (this.mode == 'edit') {
  //     this.commonService.updatePost(
  //       this.postId,
  //       form.value.title,
  //       form.value.content
  //     );
  //     form.resetForm();
  //   }
  // }

  //here we change the ng form to our form group

  onSavePost() {
    if (this.formgp.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode == 'create') {
      this.commonService.addPost(this.formgp.value.title, this.formgp.value.content);
    } else if (this.mode == 'edit') {
      this.commonService.updatePost(
        this.postId,
        this.formgp.value.title,
        this.formgp.value.content
      );
    }
    this.formgp.reset();
  }
}

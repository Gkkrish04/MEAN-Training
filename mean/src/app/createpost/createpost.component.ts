import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss'],
})
export class CreatepostComponent implements OnInit {
  formgp: FormGroup;
  post: any;
  private mode = 'create';
  private postId: any;
  isLoading = false;

  imagePreview: string;

  constructor(
    public commonService: CommonService,
    public activeroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formgp = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
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
          this.formgp.setValue({
            title: this.post.title,
            content: this.post.content,
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  //getting the image file on DOM event but the 'event.target' not getting so we tell to typescript with the help of event paranthises, that 'event.target' is html input element, this is called type convertion, here i am patching the file value to formGroup control, then we check the file update validation

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.formgp.patchValue({image: file});
    this.formgp.get('image').updateValueAndValidity();
    // console.log(file);
    // console.log(this.formgp);

    //need to convert the image object to image URL

    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.formgp.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode == 'create') {
      this.commonService.addPost(
        this.formgp.value.title,
        this.formgp.value.content
      );
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

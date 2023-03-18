import { Injectable } from '@angular/core';
import { Post } from '../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private posts: Post[] = [];

  constructor() { }

  getPost(){
    return this.posts;
  }

  addPost(title: string, content: string){
    const post: Post = {title: title, content: content};
    this.posts.push(post);
  }
}

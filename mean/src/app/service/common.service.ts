import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private posts: Post[] = [];
  private postUpdate = new Subject<Post[]>();

  constructor() { }

  getPost(){
    return [...this.posts];
  }

  getPostUpdateListner(){
    return this.postUpdate.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = {title: title, content: content};
    this.posts.push(post);
    this.postUpdate.next([...this.posts]);
  }

  //here we directly access the original posts data so we need to duplicate the post data but if do this the new added new post will insert before duplicate so the added date not available in the copy data, so we using event driven approach, so we use observables to pass the object data arount this is RXJS concept. with the help of observable to emit the data out side.
}

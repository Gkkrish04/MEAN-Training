import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private posts: Post[] = [];
  private postUpdate = new Subject<Post[]>();

  constructor(private http : HttpClient) { }

  getPost(){
    this.http.get<any>('http://localhost:3000/api/posts').subscribe((response)=>{
      this.posts = response.data;
      this.postUpdate.next([...this.posts]);
    })
  }

  getPostUpdateListner(){
    return this.postUpdate.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = {id: null, title: title, content: content};
    this.posts.push(post);
    this.postUpdate.next([...this.posts]);
  }
}

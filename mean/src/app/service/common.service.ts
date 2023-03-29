import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../model/post.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private posts: Post[] = [];
  private postUpdate = new Subject<Post[]>();

  constructor(private http: HttpClient, public router: Router) {}

  getPost() {
    this.http.get<{message: string, data:any}>('http://localhost:3000/api/posts')
    .pipe(map((response) => {
      return response.data.map((dataVal:any) =>{
        const post = {
          title: dataVal.title,
          content: dataVal.content,
          id: dataVal._id,
        }
        return post;
      })
    }))
    .subscribe((response) => {
        this.posts = response;
        this.postUpdate.next([...this.posts]);
      });
  }

  getPostUpdateListner() {
    return this.postUpdate.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http.post<{ message: string, postId:string }>('http://localhost:3000/api/posts', post)
    .subscribe((response) => {
        console.log(response.message);
        const id = response.postId;
        post.id = id;
        this.posts.push(post);
        this.postUpdate.next([...this.posts]);
      });
  }

  getSinglePost(id:string){
    return {... this.posts.find(p => p.id === id)};
  }

  updatePost(id:any, title: string, content: string){
    const post: Post = {id:id, title:title, content:content};
    this.http.put<{message: string}>('http://localhost:3000/api/posts/' + id, post).subscribe((response)=>{
      console.log(response.message);
      this.router.navigate(['postList']);
    });
  }

  deletePost(postId:any){
    this.http.delete<{ message: string }>('http://localhost:3000/api/posts/' + postId).subscribe((response) =>{
      console.log(response.message);
      const updatePost = this.posts.filter(post=> post.id !== postId);
      this.postUpdate.next([...updatePost]);
      this.router.navigate(['postList']);
    })
  }


}

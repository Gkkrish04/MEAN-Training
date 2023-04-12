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
  baseUrl: any = 'http://localhost:3000/api/';

  //here we going to create interceptor for handlong the token

  private posts: Post[] = [];
  private postUpdate = new Subject<{ posts: Post[]; postCount: any }>();

  constructor(private http: HttpClient, public router: Router) {}

  getPost(postPerPage: number, currPage: number) {
    const queryParam = `?pagesize=${postPerPage}&page=${currPage}`;
    this.http
      .get<{ message: string; data: any; maxPost: any }>(
        this.baseUrl + 'posts' + queryParam
      )
      .pipe(
        map((response) => {
          return {
            posts: response.data.map((dataVal: any) => {
              const post = {
                title: dataVal.title,
                content: dataVal.content,
                id: dataVal._id,
                imagePath: dataVal.imagePath,
                creator: dataVal.creator,
              };
              return post;
            }),
            maxPost: response.maxPost,
          };
        })
      )
      .subscribe((transformPostData) => {
        // console.log(transformPostData);
        this.posts = transformPostData.posts;
        this.postUpdate.next({
          posts: [...this.posts],
          postCount: transformPostData.maxPost,
        });
      });
  }

  getPostUpdateListner() {
    return this.postUpdate.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe((response) => {
        console.log(response.message);
        this.router.navigate(['postList']);
      });
  }

  getSinglePost(id: string) {
    return this.http.get<{
      _id: any;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>(this.baseUrl + 'posts/' + id);
  }

  updatePost(id: any, title: string, content: string, image: File | string) {
    // const post: Post = {id:id, title:title, content:content, imagePath: null};
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put<{ message: string }>(
        'http://localhost:3000/api/posts/' + id,
        postData
      )
      .subscribe((response) => {
        console.log(response.message);
        this.router.navigate(['postList']);
      });
  }

  deletePost(postId: any) {
    return this.http.delete<{ message: string }>(
      'http://localhost:3000/api/posts/' + postId
    );
  }
}

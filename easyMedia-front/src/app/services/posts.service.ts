import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = (environment.production) ? environment.prod_url : environment.dev_url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( private http:HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'token': this.token
      }
    }
  }

  getPosts( from:number = 0 ) {
    return this.http.get(`${base_url}/posts?from=${from}`, this.headers).pipe(
      map( (resp:any) => {
        return {
          total: resp.total,
          posts: resp.posts
        }
      })
    );
  }

  createPost( postData:any ) {
    return this.http.post(`${base_url}/posts`, postData, this.headers)
  }

  getMyPosts(value:any) {
    return this.http.get(`${base_url}/search/creatorPosts/${value}`, this.headers).pipe(
      map( (resp:any) => resp.posts)
    )
  }

  searchPosts(value:any) {
    return this.http.get(`${base_url}/search/posts/${value}`, this.headers).pipe(
      map( (resp:any) => resp.posts)
    )
  }
}

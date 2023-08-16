import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  public myPosts = [];
  public tempPosts = [];

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  getCreator(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  loadPosts() {
    const creator = this.getCreator(localStorage.getItem('token'));
    this.postsService.getMyPosts(creator.uid).subscribe({
      next: (resp: any) => {
        this.myPosts = resp;        
        this.tempPosts = resp;
      }
    });
  }

  searchTerms(dateValue: any) {
    if (dateValue.length === 0) {
      this.myPosts = this.tempPosts
    }
    this.postsService.searchPosts(dateValue).subscribe({
      next: (resp) => {        
        this.myPosts = resp
      }
    });
  }

  clear(clearFitler:boolean) {
    if (clearFitler) {
      this.loadPosts()
    }
  }

}

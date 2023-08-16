import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {

  public title = 'Words to Search?'
  public allPosts = [];
  public tempPosts = [];
  public from: number = 0;
  public totalPosts: number = 0;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postsService.getPosts(this.from).subscribe({
      next: ({ total, posts }) => {
        this.totalPosts = total;
        this.allPosts = posts;
        this.tempPosts = posts;
      }
    })
  }

  changePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from > this.totalPosts) {
      this.from -= value;
    }

    this.loadPosts();
  }

  searchTerms(dateValue: any) {
    if (dateValue.length === 0) {
      this.allPosts = this.tempPosts
    }
    this.postsService.searchPosts(dateValue).subscribe({
      next: (resp) => {
        this.allPosts = resp
      }
    });
  }

  clear(clearFitler: boolean) {
    if (clearFitler) {
      this.loadPosts()
    }
  }
}

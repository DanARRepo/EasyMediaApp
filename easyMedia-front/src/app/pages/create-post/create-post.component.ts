import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  postForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(30)]],
    body: ['', [Validators.required, Validators.maxLength(300)]],
    date: [new Date().toJSON().slice(0, 10)]
  })

  public postPreview = {
    title: 'Your post title',
    body: 'Create message for share with your friends.',
    date: '',
    creator: {
      name: ''
    }
  };

  constructor(
    private fb: FormBuilder,
    private postsService:PostsService
  ) { }

  getCreator(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  viewPost() {
    const creator = this.getCreator(localStorage.getItem('token'));
    this.postPreview = {
      title: this.postForm.get('title')?.value!,
      body: this.postForm.get('body')?.value!,
      date: this.postForm.get('date')?.value!,
      creator: {
        name: creator.userName
      }
    }
  }

  createPost() {
    const creator = this.getCreator(localStorage.getItem('token'));
    this.postPreview = {
      title: this.postForm.get('title')?.value!,
      body: this.postForm.get('body')?.value!,
      date: this.postForm.get('date')?.value!,
      creator: creator.uid
    }
    this.postsService.createPost(this.postPreview).subscribe({
      next: (resp:any) => {
        Swal.fire({
          title: 'Post Created',
          imageUrl: 'src/assets/images/icon_tick_circle.png',
          imageWidth: 76,
          imageHeight: 76,
          imageAlt: 'check image',
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Uppss Try Later',
          imageUrl: 'src/assets/images/icon_close circle.png',
          imageWidth: 76,
          imageHeight: 76,
          imageAlt: 'check image',
        });
      }
    });    
  }
}

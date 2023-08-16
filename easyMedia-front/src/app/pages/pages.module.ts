import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllPostsComponent } from './all-posts/all-posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AllPostsComponent,
    CreatePostComponent,
    MyPostsComponent,
    PagesComponent,
  ],
  exports: [
    AllPostsComponent,
    CreatePostComponent,
    MyPostsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }

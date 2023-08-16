import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { authGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component';


const routes: Routes = [
    { 
        path: 'pages', component: PagesComponent,
        canActivate: [ authGuard ],
        children: [
            { path: '', component: AllPostsComponent },
            { path: 'all-posts', component: AllPostsComponent },
            { path: 'my-posts', component: MyPostsComponent },
            { path: 'create-post', component: CreatePostComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule { }
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'post-list' },
    // { path: '', loadComponent: () => import('./app.component').then(m => m.AppComponent) },
    { path: 'create-post', loadComponent: () => import('./features/post/create/create.component').then(m => m.CreateComponent) },
    { path: 'post-details', loadComponent: () => import('./features/post/post-details/post-details.component').then(m => m.PostDetailsComponent) },
    { path: 'post-list', loadComponent: () => import('./features/post/list-posts/list-posts.component').then(m => m.ListPostsComponent) },
    { path: 'post-comment', loadComponent: () => import('./features/post/comments/comments.component').then(m => m.CommentsComponent) },
    { path: 'profile', loadComponent: () => import('./features/user-profile/user-profile.component').then(m => m.UserProfileComponent) },
    { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
    { path: 'register', loadComponent: () => import('./features/auth/signup/signup.component').then(m => m.SignupComponent) },
    { path: '**', redirectTo: 'post-list' }
];

import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'post-comment' },
    { path: 'create-post', loadComponent: () => import('./features/post/create/create.component').then(m => m.CreateComponent) },
    { path: 'post-details', loadComponent: () => import('./features/post/post-details/post-details.component').then(m => m.PostDetailsComponent) },
    { path: 'post-comment', loadComponent: () => import('./features/post/comments/comments.component').then(m => m.CommentsComponent) },
    { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
    { path: 'register', loadComponent: () => import('./features/auth/signup/signup.component').then(m => m.SignupComponent) },
    { path: '**', redirectTo: 'post-comment' }
];

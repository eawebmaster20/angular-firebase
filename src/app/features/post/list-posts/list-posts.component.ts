import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IPost } from '../../../core/interfaces/posts.interface';
import { PostService } from '../../../core/services/post/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.scss'
})
export class ListPostsComponent implements OnInit {
  posts:any = [  ]
  newPost:IPost = {
    title: '',
    content: '',
    date: new Date,
    category: '' ,
  }
  constructor(private postService:PostService) { }
  ngOnInit(): void {
    this.getPosts()
  }
  deletePost(id: string): void {
    this.postService.deletePost(id).subscribe({
      next: () => {
        console.log('Post deleted successfully');
      },
      error: error => {
        console.error('Error deleting post:', error);
      }
    })
  }
  createPost() {
    this.postService.createPost(this.newPost).subscribe({
      next: () => {
        console.log('Post created successfully');
      },
      error: (error) => {
        console.error('Error creating post:', error);
      }
    })
  }
  onSubmit(){
    console.log(this.newPost);
    this.createPost();
    this.getPosts();
  }

  getPosts(){
    this.postService.getAllPosts().subscribe({
      next: (snapshot) => {
        snapshot.forEach(childSnapshot => {
          this.posts.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
      },
      error: error => console.error('Error getting posts:', error)
    })
  }
}

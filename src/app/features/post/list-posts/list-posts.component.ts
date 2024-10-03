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
  newPost = {
    title: '',
    content: '',
    category: '' ,
  }
  constructor(private postService:PostService) { }
  ngOnInit(): void {
    this.postService.getAllPosts().subscribe({
      next: (snapshot) => {
        snapshot.forEach(childSnapshot => {
          this.posts.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
      },
      error: error => console.error('Error getting posts:', error)
    })
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

  onSubmit(){
    console.log(this.newPost)
  }
}

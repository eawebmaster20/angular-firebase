import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IPost } from '../../../core/interfaces/posts.interface';
import { PostService } from '../../../core/services/post/post.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../../../core/services/profile/profile.service';

@Component({
  selector: 'app-list-posts',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.scss'
})
export class ListPostsComponent implements OnInit {
  posts:IPost[] = [
    {
      title: 'First Post',
      content: 'Lorem ipsum dolor sit amet...',
      date: '2023-01-01',
      userId: 'Author',
      category: 'Development'
    },
  ];
  newPost:IPost = {
    title: '',
    content: '',
    userId:'',
    date: (new Date).toDateString(),
    category: '' ,
  }
  selectedPost:IPost = { ...this.posts[0] };
  constructor(
    private postService:PostService, 
    private router: Router,
    public profileService:ProfileService
  ) { }


  // Edit the selected post (immutable copy)
  editPost(post:IPost) {
    this.selectedPost = { ...post }; 
  }
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

  goToDetail(post:IPost){
    this.postService.selectedPost = post;
    this.router.navigate(['/post-details']);
  }
}

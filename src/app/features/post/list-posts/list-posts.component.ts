import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IPost } from '../../../core/interfaces/posts.interface';
import { PostService } from '../../../core/services/post/post.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../../../core/services/profile/profile.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-list-posts',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.scss'
})
export class ListPostsComponent implements OnInit {
  posts:IPost[] = [];
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
    public profileService:ProfileService,
    public authService: AuthService,
  ) { }


  // Edit the selected post (immutable copy)
  ngOnInit(): void {
    this.getPosts()
  }

  getMyPosts(){
    return this.posts.filter((post)=>post.userId === this.profileService.user?.uid)
  }
  editPost(post:IPost) {
    this.selectedPost = { ...post }; 
  }
  deletePost(id: string): void {
    this.postService.deletePost(id).subscribe({
      next: () => {
        console.log('Post deleted successfully');
        this.getPosts()
      },
      error: error => {
        console.error('Error deleting post:', error);
      }
    })
  }
  createPost() {
    this.newPost.userId = this.profileService.user?.uid; 
    this.postService.createPost(this.newPost).subscribe({
      next: () => {
        console.log('Post created successfully');
        this.getPosts();
        this.newPost = {
          title: '',
          content: '',
          userId:'',
          date: (new Date).toDateString(),
          category: ''
        }
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
    this.posts =[]
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
  updatePost(){
    this.postService.updatePost(this.selectedPost.id!, this.selectedPost)
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }
}

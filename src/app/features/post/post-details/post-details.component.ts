import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PostService } from '../../../core/services/post/post.service';
import { IPost } from '../../../core/interfaces/posts.interface';
import { CommentsComponent } from '../comments/comments.component';
import { LocalstorageService } from '../../../core/services/localStorage/localstorage.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommentsComponent, RouterLink],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {
  post:IPost|null = null;
  constructor(
    private metaService: Meta, 
    private titleService: Title, 
    public postService:PostService,
    private localStorage: LocalstorageService,
    private router: Router
  ){}

  ngOnInit(): void {
    // Set title and meta tags when the component is initialized
    if (!this.localStorage.getItem('selectedPost')) {
      this.router.navigate(['']);
      return;
    }
    this.post = this.localStorage.getItem('selectedPost');
    this.updateMetaTags();
    // this.postService.getSinglePost('-O8CVQluvYeLhSFwI1nj').subscribe({
    //   next: (snapshot) => {
    //     console.log({ id: snapshot.key, ...snapshot.val() });
    //   },
    //   error: error => console.error('Error getting post:', error)
    // })
  }

  updateMetaTags() {
    this.titleService.setTitle(this.post!.title);
    this.metaService.updateTag({ name: 'description', content: this.post!.content.substring(0, 150) });
    this.metaService.updateTag({ name: 'keywords', content: this.post!.title });
    // this.metaService.addTag({ name: 'author', content: this.post!.title });
    // this.metaService.removeTag('name="keywords"'); 
  }
}

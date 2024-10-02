import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PostService } from '../../../core/services/post/post.service';
import { IPost } from '../../../core/interfaces/posts.interface';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {

  constructor(private metaService: Meta, private titleService: Title, private postService:PostService){}

  ngOnInit(): void {
    // Set title and meta tags when the component is initialized
    this.updateMetaTags();
    this.postService.getSinglePost('-O8CVQluvYeLhSFwI1nj').subscribe({
      next: (snapshot) => {
        console.log({ id: snapshot.key, ...snapshot.val() });
      },
      error: error => console.error('Error getting post:', error)
    })
  }

  updateMetaTags() {
    this.titleService.setTitle('My Sample Page Title');

    // Add or update meta tags
    this.metaService.updateTag({ name: 'description', content: 'This is a sample description for SEO purposes.' });
    this.metaService.updateTag({ name: 'keywords', content: 'Angular, SEO, MetaService' });

    // You can also add or remove tags dynamically
    this.metaService.addTag({ name: 'author', content: 'Your Name' });
    this.metaService.removeTag('name="keywords"');  // Example: remove the 'keywords' tag
  }
}

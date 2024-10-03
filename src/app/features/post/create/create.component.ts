import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Database, ref, set, push, child, get, update, remove } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { IPost } from '../../../core/interfaces/posts.interface';
import { PostService } from '../../../core/services/post/post.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
  /*
  creating crud operations with angular realtime database,
  create a new post in the realtime Collection,
  read all post from the realtime post Collection,
  update a post in the realtime post Collection,
  and delete a post in the realtime post Collection.
  */
export class CreateComponent{
  post: IPost = {
    title: '',
    body: '',
    date:new Date(),
    userId: ''
  };

  constructor(private newDb: Database, private postService:PostService) {}
  createPost() {
    this.postService.createPost(this.post).subscribe({
      next: () => {
        console.log('Post created successfully');
      },
      error: (error) => {
        console.error('Error creating post:', error);
      }
    })
  }


 
  getSinglePost(postId: string) {
    const postRef = ref(this.newDb, `posts/${postId}`);
      get(postRef)
        .then(snapshot => {
          if (snapshot.exists()) {
           console.log(snapshot.val());
          } else {
          console.log('No post found');
          }
        })
  }


  // getAllPosts() {
  //   const postsRef = ref(this.newDb, 'posts');
  //   return new Observable(observer => {
  //     get(postsRef)
  //       .then(snapshot => {
  //         const posts:IPost[] = [];
  //         snapshot.forEach(childSnapshot => {
  //           posts.push({ id: childSnapshot.key, ...childSnapshot.val() });
  //         });
  //         observer.next(posts);
  //       })
  //       .catch(error => observer.error(error));
  //   });
  // }

  // addPost() {
  //   const postsRef = ref(this.newDb, 'posts');
  //   const newPostRef = push(postsRef);
  //   set(newPostRef, { title: this.title, body: this.body })
  //     .then(() => {
  //       console.log('Post added successfully');
  //     })
  //     .catch(error => {
  //       console.error('Error adding post:', error);
  //     });
  // }


  // deletePost(postId: string) {
  //   const postRef = ref(this.newDb, `posts/${postId}`);
  //   remove(postRef)
  //     .then(() => {
  //       console.log('Post deleted successfully');
  //     })
  //     .catch(error => {
  //       console.error('Error deleting post:', error);
  //     });
  // }


  // updatePost(postId: string, title: string, body: string) {
  //   const postRef = ref(this.newDb, `posts/${postId}`);
  //   update(postRef, { title, body })
  //     .then(() => {
  //       console.log('Post updated successfully');
  //     })
  //     .catch(error => {
  //       console.error('Error updating post:', error);
  //     });
  // }
}

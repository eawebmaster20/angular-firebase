import { Injectable } from '@angular/core';
import { Database, ref, set, push, child, get, update, remove } from '@angular/fire/database';
import { IPost } from '../../interfaces/posts.interface';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  selectedPost:IPost = {
    title: '',
    content: '',
    date: '2023-01-01',
    userId: 'Author',
    category: 'Development'
  }
  constructor(private newDb: Database) { }

  createPost(post: IPost){
    const postsRef = ref(this.newDb, 'posts');
    const newPostRef = push(postsRef); 
    return from(set(newPostRef, post))
  }

  getSinglePost(postId: string) {
    const postRef = ref(this.newDb, `posts/${postId}`);
      return from(get(postRef));
  }

  getAllPosts() {
    const postsRef = ref(this.newDb, 'posts');
    return from(get(postsRef));
  }

  addPost(post:IPost) {
    const postsRef = ref(this.newDb, 'posts');
    const newPostRef = push(postsRef);
    return from(set(newPostRef, post))
  }

  deletePost(postId: string) {
    const postRef = ref(this.newDb, `posts/${postId}`);
    return from(remove(postRef));
  }

  updatePost(postId: string, post:Partial<IPost>) {
    const postRef = ref(this.newDb, `posts/${postId}`);
    update(postRef, post)
  }
}

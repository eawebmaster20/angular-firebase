import { Injectable } from '@angular/core';
import { Database, ref, set, push, child, get, update, remove } from '@angular/fire/database';
import { IPost } from '../../interfaces/posts.interface';
import { from, Observable } from 'rxjs';
import { addDoc, collection, collectionData, doc, Firestore } from '@angular/fire/firestore';
import { IComment } from '../../interfaces/comment.interface';
import { deleteDoc } from 'firebase/firestore';

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
  constructor(
    private newDb: Database,
    private firestore: Firestore
  ) { }

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

  createComment(comment:IComment){
    const commentCollection = collection(this.firestore, 'comments');
    return from(addDoc(commentCollection, comment))
  }
  
  getAllPostComments(postId:string): Observable<IComment[]> {
    const commentsCollection = collection(this.firestore, 'comments');
    return collectionData(commentsCollection, { idField: 'id' }) as Observable<IComment[]>;
  }

  deleteComment(commentId: string) {
    const commentDocRef = doc(this.firestore, `comments/${commentId}`);
    return from(deleteDoc(commentDocRef));
  }
}

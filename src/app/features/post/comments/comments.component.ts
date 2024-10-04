import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { IComment } from '../../../core/interfaces/comment.interface';
import { PostService } from '../../../core/services/post/post.service';
import { IPost } from '../../../core/interfaces/posts.interface';
import { ProfileService } from '../../../core/services/profile/profile.service';
import { forkJoin, from, map, mergeMap } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { IUser } from '../../../core/interfaces/user.interface';
import { LocalstorageService } from '../../../core/services/localStorage/localstorage.service';

// interface userComment extends IComment{
//   username: string;
// }
@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {
  /*
  creating crud operations with angular firestore,
  create a new comment in the Comments Collection,
  read all comments from the Comments Collection,
  update a comment in the Comments Collection,
  and delete a comment in the Comments Collection.
  */
  comment:IComment= { 
    postId: this.localStorage.getItem('selectedPost').id || '', 
    userId: this.profileService.user?.uid||'', body: '', date: (new Date()).toDateString(), }
  comments: IComment[] = [];

  constructor(
    private firestore: Firestore,
    public localStorage: LocalstorageService,
    public profileService: ProfileService,
    public postService: PostService,
    private authService: AuthService,
  ){ }

  ngOnInit(): void {
    this.postService.getAllPostComments().subscribe({
      next: (comments) => {
        this.comments = comments.map(comment => ({
          id: comment.id,
          postId: comment['postId'] || '',
          body: comment['body'] || '', 
          date: comment['date'] || '', 
          userId: comment['userId'] || '' 
        })) as IComment[];
        console.log('Comments:', comments);
      },
      error: (error) => {
        console.error('Error getting comments:', error);
      }
    })
  }

  
  
  create(){
    this.postService.createComment(this.comment).subscribe({
      next: (comment) => {
        console.log('Comment added successfully', comment);
      },
      error: (error) => {
        console.error('Error adding comment:', error);
      }
    })
  }

  read(){
    const commentCollection =  collection(this.firestore, 'comments');
    collectionData(commentCollection, {idField: 'id'}).subscribe({
      next: (comments) => {
        this.comments = comments.map(comment => ({
          id: comment.id,
          postId: comment['postId'] || '',
          body: comment['body'] || '', 
          date: comment['date'] || '', 
          userId: comment['userId'] || '' 
        })) as IComment[];
        console.log('Comments:', comments);
      },
      error: (error) => {
        console.error('Error getting comments:', error);
      }
    })
  }

  update(commentId: string){
    // const commentDocRef = doc(this.firestore, `comments/${commentId}`);
    // updateDoc(commentDocRef, this.comment).then(() => {
    //   console.log('Comment updated successfully');
    // }).catch(error => {
    //   console.error('Error updating comment:', error);
    // });
  }

  deleteComment(commentId: string){
    const commentDocRef = doc(this.firestore, `comments/${commentId}`);
    deleteDoc(commentDocRef).then(() => {
      console.log('Comment deleted successfully');
    }).catch(error => {
      console.error('Error deleting comment:', error);
    });
  }
}

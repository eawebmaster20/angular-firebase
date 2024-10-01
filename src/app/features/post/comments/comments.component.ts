import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  /*
  creating crud operations with angular firestore,
  create a new comment in the Comments Collection,
  read all comments from the Comments Collection,
  update a comment in the Comments Collection,
  and delete a comment in the Comments Collection.
  */
  comment= { post_id: '', text: '', user_id: '' }
  comments: any[] = [];

  constructor(
    private firestore: Firestore
  ){ }

  create(){
    const commentCollection = collection(this.firestore, 'comments');
    addDoc(commentCollection, this.comment).then(() => {
      console.log('Comment added successfully');
    }).catch(error => {
      console.error('Error adding comment:', error);
    });
  }

  read(){
    const commentCollection =  collection(this.firestore, 'comments');
    collectionData(commentCollection, {idField: 'id'}).subscribe({
      next: (comments) => {
        this.comments = comments;
        console.log('Comments:', comments);
      },
      error: (error) => {
        console.error('Error getting comments:', error);
      }
    })
  }

  update(commentId: string){
    const commentDocRef = doc(this.firestore, `comments/${commentId}`);
    updateDoc(commentDocRef, this.comment).then(() => {
      console.log('Comment updated successfully');
    }).catch(error => {
      console.error('Error updating comment:', error);
    });
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

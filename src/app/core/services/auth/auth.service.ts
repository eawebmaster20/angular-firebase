import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: Auth) { }

  register(email: string, password: string){
    return from(createUserWithEmailAndPassword(this.firebaseAuth, email, password))
  }
  login(email:string, password:string) {
    return from(signInWithEmailAndPassword(this.firebaseAuth,email, password))
    
  }
  logout(){
    return from(this.firebaseAuth.signOut())
  }
  
  googleAuth(){
    return from( signInWithPopup(this.firebaseAuth,new GoogleAuthProvider()))
    }

    getUserById(userId:string){
      return this.firebaseAuth.currentUser?.uid === userId? this.firebaseAuth.currentUser : null
      // return this.firebaseAuth.
    }
}

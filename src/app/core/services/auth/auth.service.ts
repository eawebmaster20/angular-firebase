import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: Auth) { }
  login(email:string, password:string) {
    return from(signInWithEmailAndPassword(this.firebaseAuth,email, password))
    
  }
  logout(){
    return from(this.firebaseAuth.signOut())
  }
  
  googleAuth(){
    return from( signInWithPopup(this.firebaseAuth,new GoogleAuthProvider()))
    }
}

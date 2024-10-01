import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
email=''
password=''

constructor(private firebaseAuth: Auth){}
login(){
  signInWithEmailAndPassword(this.firebaseAuth,this.email, this.password)
  .then((res:any)=>{console.log(res);})
}
logout(){
  this.firebaseAuth.signOut()
}

googleAuth(){
  signInWithPopup(this.firebaseAuth,new GoogleAuthProvider()).then((res:any)=>{console.log(res)})
  }
}

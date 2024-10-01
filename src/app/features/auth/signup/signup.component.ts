import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { catchError, from, Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
username=''
email=''
password=''
constructor(private firebaseAuth: Auth){
 
}
signup(){
  console.log(this.username, this.email, this.password)
  const promise = createUserWithEmailAndPassword(this.firebaseAuth, this.email, this.password)
  .then((res:any) => updateProfile(res.user, {displayName: this.username}))
  from(promise).pipe(
    catchError(() => {throw new Error('dijos')})
  ).subscribe({
    next: (value) => {
      console.log('Success', value);
    },
    error: (error) => {
      console.error('Error', error);
    }
  })
}
}

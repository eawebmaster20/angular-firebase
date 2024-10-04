import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { catchError, concatMap, from, Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../../core/services/profile/profile.service';

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
constructor(
  private firebaseAuth: Auth,
  private authService: AuthService,
  private profileService: ProfileService,
  private router: Router
){
 
}
signup(){
  console.log(this.username, this.email, this.password)
  this.authService.register(this.email, this.password).pipe(
    concatMap((res)=>this.profileService.updateUserProfile(res.user, {displayName:this.username}))
  ).
  subscribe({
    next:(result) => {
      console.log(result);
      this.router.navigateByUrl('')
    },
    error:()=>console.log('error occured during registration')
  })
}

googleAuth(){
  this.authService.googleAuth().subscribe({
    next: (value) => {
      console.log(value);
      this.router.navigateByUrl('')
    },
    error: (error) => {console.error(error)} 
  })
  }
}

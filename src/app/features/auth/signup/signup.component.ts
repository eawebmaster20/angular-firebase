import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { catchError, concatMap, from, Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../../../core/services/profile/profile.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, ToastModule, ButtonModule, RippleModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [MessageService]
})
export class SignupComponent implements OnInit {
username=''
email=''
password=''
constructor(
  private firebaseAuth: Auth,
  private authService: AuthService,
  private profileService: ProfileService,
  private router: Router,
  private primengConfig: PrimeNGConfig,
  private messageService: MessageService
){}

ngOnInit(): void {
  this.primengConfig.ripple = true;
}
signup(){
  console.log(this.username, this.email, this.password)
  this.authService.register(this.email, this.password).pipe(
    // concatMap((res)=>this.profileService.updateUserProfile(res.user, {displayName:this.username}))
  ).
  subscribe({
    next:(result) => {
      console.log(result);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'registration successful' })
      setTimeout(() => {
        this.router.navigate([''])
      }, 1500);
    },
    error:(err)=>{
      console.log('error occured during registration', err)
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'registration failed' })
    }
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

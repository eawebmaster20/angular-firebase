import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../../../core/services/profile/profile.service';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
email=''
password=''
@ViewChild('liveToast') toastLiveExample!: ElementRef;
constructor(
  private authService:AuthService,
  private router:Router,
  private profileService:ProfileService
){}

ngOnInit(): void {
  if(this.profileService.user){
    this.router.navigateByUrl('')
  }
}
login(){
  this.authService.login(this.email, this.password).subscribe({
    next: (value) => {
      console.log(value);
      const toastBootstrap = new Toast(this.toastLiveExample.nativeElement);
      toastBootstrap.show();
      this.router.navigate([])
    },
    error: (error) => {console.error(error)}
  })
}
logout(){
  this.authService.logout().subscribe({
    next: (value) => {
      this.router.navigate([''])
    },
    error: (error) => {console.error(error)}
  });
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

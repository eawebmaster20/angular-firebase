import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

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

constructor(
  private authService:AuthService,
  private router:Router
){}
login(){
  this.authService.login(this.email, this.password).subscribe({
    next: (value) => {console.log(value)},
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
    next: (value) => {console.log(value)},
    error: (error) => {console.error(error)} 
  })
  }
}

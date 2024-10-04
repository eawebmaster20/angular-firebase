import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../../../core/services/profile/profile.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, ToastModule, ButtonModule, RippleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
email=''
password=''
@ViewChild('.liveToast') toastLiveExample!: ElementRef;
constructor(
  private authService:AuthService,
  private router:Router,
  private profileService:ProfileService,
  private primengConfig: PrimeNGConfig,
  private messageService: MessageService
){}

ngOnInit(): void {
  if(this.profileService.user){
    this.router.navigateByUrl('')
  }
  this.primengConfig.ripple = true;
}
login(){
  this.authService.login(this.email, this.password).subscribe({
    next: (value) => {
      console.log(value);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'login successful' })
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 1500);
    },
    error: (error) => {
      console.error(error);
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: error.message||'error occured' })
    }
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

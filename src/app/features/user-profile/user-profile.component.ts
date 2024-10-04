import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { ProfileService } from '../../core/services/profile/profile.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  constructor(
    public authService: AuthService,
    public profileService: ProfileService,
    private router: Router,
  ) {}

  ngOnInit() {
    
  }

  logout() {
    this.authService.logout().subscribe({
      next:()=>{
        this.router.navigateByUrl('/home')
      },
      error: (err) => console.error('Error logging out:', err)
    });
      
  }

  goToHome() {
    this.router.navigateByUrl('/home')
  }

  updateProfile(url:string, username:string) {
    this.profileService.updateUserProfile(this.profileService.user!,  { displayName: username, photoURL: url })
  }
}
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../core/services/profile/profile.service';
type User = import('firebase/auth').User;

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
username = 'user\'s username'
postCount = '25'
email = 'user\'s email';
constructor(private profileService: ProfileService) { }

ngOnInit(){ }

updateProfile(){
  if (this.profileService.user) {
    this.profileService.updateUserProfile(
      this.profileService.user, 
      { 
        displayName: 'newly set name', 
        photoURL:'com/blog/image-url-for-testing/'
      });
  }
  }
}

import { Injectable } from '@angular/core';
import { updateProfile } from 'firebase/auth';
import { from } from 'rxjs';

type User = import('firebase/auth').User;
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user!:User|null
  constructor() { }
  updateUserProfile(user: User, profileData: { displayName?: string; photoURL?: string }) {
    console.log(user)
    return from(updateProfile(user, profileData))
  }
}

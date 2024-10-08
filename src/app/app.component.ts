import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Auth, linkWithCredential, PhoneAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, updateProfile, user } from '@angular/fire/auth';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FirebaseApp, initializeApp } from '@angular/fire/app'; // Import FirebaseApp
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { ListPostsComponent } from './features/post/list-posts/list-posts.component';
import { TextEditorComponent } from './features/CVA/text-editor/text-editor.component';
import { FormsModule } from '@angular/forms';
import { PostService } from './core/services/post/post.service';
import { IResponseUser } from './core/interfaces/user.interface';
import { ProfileService } from './core/services/profile/profile.service';
import { AuthService } from './core/services/auth/auth.service';

type User = import('firebase/auth').User;
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TextEditorComponent, FormsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  user$ = user(this.firebaseAuth)
  recaptchaVerifier!: RecaptchaVerifier;
  texteditor = ''
  constructor(
    private firebaseAuth: Auth, 
    private authService: AuthService, 
    public postService:PostService,
    private profileService: ProfileService,
  ) {} 

  ngOnInit(): void {
    this.user$.subscribe({
      next: (user: User|null) => {
        console.log(user);
          this.profileService.user = user || null;
      },
      error: error => {},
      complete: () => {}
    })
  }
  log(){
    console.log(this.texteditor)
  }
  ngAfterViewInit(): void {
    // this.setupPhoneVerification();
  }

  logout(){
    this.authService.logout().subscribe({
      next: (value) => {console.log(value)},
      error: (error) => {console.error(error)}
    });
  }
  updateUserProfile(user: User, profileData: { displayName?: string; photoURL?: string }): void {
    console.log(user)
    updateProfile(user, profileData).then(() => {
      console.log('User profile updated successfully');
    }).catch(error => {
      console.error('Error updating user profile: ', error);
    });
  }

  setupPhoneVerification(): void {
    // Setup the reCAPTCHA verifier using FirebaseApp, not Auth
    this.recaptchaVerifier = new RecaptchaVerifier(this.firebaseAuth,'recaptcha-container', 
      {
        'size': 'normal',
        'callback': (response:any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
        }
      }
    );

    // Start phone number verification process
    const phoneNumber = '+233555355620'; // Example phone number (should be input by the user)
    const appVerifier = this.recaptchaVerifier;

    signInWithPhoneNumber(this.firebaseAuth, phoneNumber, appVerifier)
      .then(confirmationResult => {
        // Ask the user for the SMS verification code
        const verificationCode = window.prompt('Please enter the verification code sent to your phone:');

        // Verify the code and sign in
        if (verificationCode) {
          confirmationResult.confirm(verificationCode)
            .then((userCredential) => {
              console.log('Phone number verified and user signed in:', userCredential);
            })
            .catch(error => {
              console.error('Error verifying the phone number:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error during phone number verification:', error);
      });
  }
}

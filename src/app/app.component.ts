import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Auth, linkWithCredential, PhoneAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, updateProfile, user } from '@angular/fire/auth';
import { RouterOutlet } from '@angular/router';
import { FirebaseApp, initializeApp } from '@angular/fire/app'; // Import FirebaseApp

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  user$ = user(this.firebaseAuth)
  recaptchaVerifier!: RecaptchaVerifier;
  title = 'firebase-crud';

  constructor(private firebaseAuth: Auth, private firebaseApp: FirebaseApp) {} // Inject FirebaseApp

  ngOnInit(): void {
    this.user$.subscribe({
      next: user => {
        console.log(user);
        // if (user) {
        //   this.updateUserProfile(
        //     user, 
        //     { 
        //       displayName: 'newly set name', 
        //       photoURL:'https://www.yttags.com/blog/image-url-for-testing/'
        //     });
        // } else {
        //   console.log('No user is signed in');
        // }
      },
      error: error => {},
      complete: () => {}
    })
  }

  ngAfterViewInit(): void {
    // this.setupPhoneVerification();
  }
  updateUserProfile(user: any, profileData: { displayName?: string; photoURL?: string }): void {
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

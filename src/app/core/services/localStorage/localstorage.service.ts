import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  setItem(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    return null; // Fallback in case localStorage is unavailable
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }
}

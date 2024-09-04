import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  errorMessage = signal('');

  setError(msg: string): void {
    this.errorMessage.set(msg);
  }

  resetError(): void {
    this.errorMessage.set('');
  }

  getError(): string {
    return this.errorMessage();
  }
}

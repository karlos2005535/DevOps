export class MockAuthService {
  isLoggedIn(): boolean {
    return false;
  }

  login(username: string, password: string): boolean {
    return true;
  }

  logout(): void {}

  getCurrentUser(): any {
    return { username: 'testuser' };
  }

  register(username: string, password: string): boolean {
    return true;
  }
}

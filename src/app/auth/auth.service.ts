import { Injectable } from '@angular/core';

export interface MockUserProfile {
  displayName: string;
  role: string;
  community: string;
}

interface MockAccount {
  accountId: string;
  profile: MockUserProfile;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly mockUserProfileKey = 'buena_rosa_9_mock_user_profile';
  private readonly mockAccounts: MockAccount[] = [
    {
      accountId: 'admin001',
      profile: {
        displayName: 'Rafter Kent',
        role: 'admin',
        community: 'Buena Rosa 9',
      },
    },
  ];

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  login(accountId: string): MockUserProfile | null {
    const profile = this.findMockProfile(accountId);

    if (!profile) {
      return null;
    }

    this.getStorage()?.setItem(this.mockUserProfileKey, JSON.stringify(profile));

    return profile;
  }

  logout(): void {
    this.getStorage()?.removeItem(this.mockUserProfileKey);
  }

  getCurrentUser(): MockUserProfile | null {
    const rawProfile = this.getStorage()?.getItem(this.mockUserProfileKey);

    if (!rawProfile) {
      return null;
    }

    try {
      const profile = JSON.parse(rawProfile) as Partial<MockUserProfile>;

      if (!profile.displayName || !profile.role || !profile.community) {
        return null;
      }

      return {
        displayName: profile.displayName,
        role: profile.role,
        community: profile.community,
      };
    } catch {
      return null;
    }
  }

  findMockProfile(accountId: string): MockUserProfile | null {
    const normalizedAccountId = accountId.trim().toLowerCase();
    const account = this.mockAccounts.find((mockAccount) => mockAccount.accountId === normalizedAccountId);

    return account?.profile ?? null;
  }

  private getStorage(): Storage | null {
    try {
      return sessionStorage;
    } catch {
      return null;
    }
  }
}

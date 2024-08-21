class TokenService {
  getter = (key: string): string | null => {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  };
  setter = (key: string, token: string): void => {
    localStorage.setItem(key, JSON.stringify(token));
  };

  getAccessToken(): string | null {
    return this.getter('accessToken');
  }

  setAccessToken(token: string) {
    this.setter('accessToken', token);
  }

  removeToken(): void {
    localStorage.removeItem('accessToken');
  }
}

export default new TokenService();

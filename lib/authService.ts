
export interface UserProfile {
  firstName: string;
  lastName: string;
  dob: string;
  gmail: string;
  phone: string;
  password?: string;
}

export const authService = {
  getUsers: (): UserProfile[] => JSON.parse(localStorage.getItem('cignifi_users') || '[]'),
  
  saveUser: (user: UserProfile) => {
    const users = authService.getUsers();
    users.push(user);
    localStorage.setItem('cignifi_users', JSON.stringify(users));
  },

  signUp: async (profile: UserProfile) => {
    await new Promise(r => setTimeout(r, 1200));
    const users = authService.getUsers();
    if (users.find((u) => u.gmail === profile.gmail)) {
      throw new Error("A user with this Gmail already exists");
    }
    authService.saveUser(profile);
    return { gmail: profile.gmail };
  },

  signIn: async (gmail: string, password: string) => {
    await new Promise(r => setTimeout(r, 1000));
    const users = authService.getUsers();
    const user = users.find((u) => u.gmail === gmail && u.password === password);
    if (!user) throw new Error("Invalid credentials. Please check your Gmail or password.");
    return user;
  },

  sendResetEmail: async (gmail: string) => {
    await new Promise(r => setTimeout(r, 1000));
    const users = authService.getUsers();
    if (!users.find((u) => u.gmail === gmail)) {
      throw new Error("Gmail address not found in our records.");
    }
    return true;
  }
};

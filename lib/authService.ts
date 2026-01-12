
export const authService = {
  getUsers: () => JSON.parse(localStorage.getItem('cignifi_users') || '[]'),
  
  saveUser: (user: any) => {
    const users = authService.getUsers();
    users.push(user);
    localStorage.setItem('cignifi_users', JSON.stringify(users));
  },

  signUp: async (email: string, password: string) => {
    // Artificial delay for realism
    await new Promise(r => setTimeout(r, 800));
    const users = authService.getUsers();
    if (users.find((u: any) => u.email === email)) {
      throw new Error("User already exists");
    }
    authService.saveUser({ email, password });
    return { email };
  },

  signIn: async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 800));
    const users = authService.getUsers();
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid email or password");
    return user;
  },

  sendResetEmail: async (email: string) => {
    await new Promise(r => setTimeout(r, 1000));
    const users = authService.getUsers();
    if (!users.find((u: any) => u.email === email)) {
      throw new Error("Email not found");
    }
    return true;
  }
};

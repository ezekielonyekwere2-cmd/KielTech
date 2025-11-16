import { User } from '../types';

const USERS_KEY = 'kieltech_users';
const SESSION_KEY = 'kieltech_session';

// Helper to get users from localStorage
const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Helper to save users to localStorage
const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const signUp = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        return reject(new Error('User with this email already exists.'));
      }
      
      // In a real app, you'd hash the password. We'll just store the user.
      const newUser: User = { email };
      const updatedUsers = [...users, newUser];
      saveUsers(updatedUsers);

      // Automatically log in the user upon successful signup
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
      
      resolve(newUser);
    }, 500); // Simulate network delay
  });
};


export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      const user = users.find(u => u.email === email);
      
      // In a real app, you'd verify the hashed password.
      // For this mock, we just check if the user exists.
      if (!user) {
        return reject(new Error('Invalid email or password.'));
      }

      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      resolve(user);
    }, 500); // Simulate network delay
  });
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const getCurrentUser = (): User | null => {
  const sessionJson = localStorage.getItem(SESSION_KEY);
  return sessionJson ? JSON.parse(sessionJson) : null;
};
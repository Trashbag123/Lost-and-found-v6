import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * User Type Definition
 */
interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

/**
 * AuthContext Type Definition
 * Manages authentication state for both admin and regular users
 */
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_CREDENTIALS = {
  username: 'lnf_staff',
  password: 'F0und!t$2024'
};

// key used to store registered users in localStorage
const USERS_STORAGE_KEY = 'registeredUsers';

export function AuthProvider({ children }: { children: ReactNode }) {
  // initialize from localStorage so the user stays logged in on refresh
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const stored = localStorage.getItem('isAuthenticated');
    return stored === 'true';
  });

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  });

  const getRegisteredUsers = (): User[] => {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const saveRegisteredUsers = (users: User[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  // keep localStorage in sync whenever auth state changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [isAuthenticated, user]);

  const register = (username: string, email: string, password: string): { success: boolean; error?: string } => {
    const users = getRegisteredUsers();

    // check for duplicate username or email before creating account
    if (users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, error: 'Username already exists' };
    }

    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser: User = {
      id: Date.now().toString(), // using timestamp as id since there's no database
      username,
      email,
      isAdmin: false,
      createdAt: new Date().toISOString()
    };

    // storing passwords separately so they don't get mixed into the user object
    // TODO: would need proper hashing if this were a real backend
    const userPasswords = JSON.parse(localStorage.getItem('userPasswords') || '{}');
    userPasswords[newUser.id] = password;
    localStorage.setItem('userPasswords', JSON.stringify(userPasswords));

    users.push(newUser);
    saveRegisteredUsers(users);

    setIsAuthenticated(true);
    setUser(newUser);

    return { success: true };
  };

  const login = (username: string, password: string): boolean => {
    // check admin credentials first
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const adminUser: User = {
        id: 'admin',
        username: 'admin',
        email: 'admin@school.edu',
        isAdmin: true,
        createdAt: new Date().toISOString()
      };
      setIsAuthenticated(true);
      setUser(adminUser);
      return true;
    }

    // then check regular registered users
    const users = getRegisteredUsers();
    const foundUser = users.find((u) => u.username.toLowerCase() === username.toLowerCase());

    if (foundUser) {
      const userPasswords = JSON.parse(localStorage.getItem('userPasswords') || '{}');
      if (userPasswords[foundUser.id] === password) {
        setIsAuthenticated(true);
        setUser(foundUser);
        return true;
      }
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth Hook
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
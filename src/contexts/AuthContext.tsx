
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call - replace with actual authentication
      if (email === 'admin@dms.com' && password === 'admin123') {
        const userData = {
          id: 1,
          name: 'John Doe',
          email: 'admin@dms.com',
          role: 'Admin'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      } else if (email === 'user@dms.com' && password === 'user123') {
        const userData = {
          id: 2,
          name: 'Jane Smith',
          email: 'user@dms.com',
          role: 'User'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      // Simulate API call - replace with actual registration
      const userData = {
        id: Date.now(),
        name,
        email,
        role: 'User'
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

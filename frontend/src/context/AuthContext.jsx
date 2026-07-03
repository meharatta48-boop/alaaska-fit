import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch, setAccessToken } from '../utils/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check login state on startup
  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        // Try getting new access token via cookies
        const data = await apiFetch('/auth/me');
        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.log('No active session.');
      } finally {
        setLoading(false);
      }
    };
    bootstrapAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      
      setAccessToken(data.accessToken);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        permissions: data.permissions
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });
      
      setAccessToken(data.accessToken);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        permissions: data.permissions
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      setAccessToken('');
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

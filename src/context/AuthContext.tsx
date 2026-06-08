import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../utils/mockData';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('rbac_sim_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (role: UserRole) => {
    // Find representative user or fallback
    const matched = mockUsers.find(u => u.role === role) || {
      id: `u-fallback-${role}`,
      name: `${role.charAt(0).toUpperCase() + role.slice(1)} Tester`,
      email: `${role}@company.com`,
      role: role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      title: `${role.charAt(0).toUpperCase() + role.slice(1)} Operator`,
      department: 'Corporate',
      status: 'active' as const
    };
    setUser(matched);
    localStorage.setItem('rbac_sim_user', JSON.stringify(matched));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rbac_sim_user');
  };

  const hasRole = (allowedRoles: UserRole[]) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

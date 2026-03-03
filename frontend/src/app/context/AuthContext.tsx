import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  role: 'ADMIN' | 'MANAGER' | 'COMPTABLE' ;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (mail: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: number, user: Partial<User>) => void;
  deleteUser: (id: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial users database


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
 const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Check local storage for persisted session
    const storedUser = localStorage.getItem('idms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  

  const login = async (email: string, password: string) => {
  try {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return false;

    const data = await res.json();

    // sauvegarder token + user
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);

    return true;
  } catch (error) {
    return false;
  }
};

  const logout = () => {
  setUser(null);

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("idms_user");
};

  const addUser = (newUser: Omit<User, 'id'>) => {
    const id = Math.max(...users.map((u) => u.id), 0) + 1;
    setUsers([...users, { ...newUser, id }]);
  };

  const updateUser = (id: number, updatedData: Partial<User>) =>{
    setUsers(users.map((u) => (u.id === id ? { ...u, ...updatedData } : u)));
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      users,
      addUser,
      updateUser,
      deleteUser,
    }}>
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
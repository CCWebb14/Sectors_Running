import React, { createContext, useContext, useState } from "react";

export interface ProfileProps {
  name: string;
  photoUrl: string;
  username: string;
  memberSince: string;
  distanceTravelled: number;
  team: string;
}

interface AuthContextProps {
  isLoggedIn: boolean;
  profile: ProfileProps | null;
  login: (credentials: { userId: string; password: string }) => Promise<void>;
  logout: () => void;
  setProfile: (profile: ProfileProps) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const loginUser = async (credentials: { userId: string; password: string }) => {
  const response = await fetch("http://localhost:6000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }
  return data;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [profile, setProfile] = useState<ProfileProps | null>(null);

  const login = async (credentials: { userId: string; password: string }) => {
    try {
      const data = await loginUser(credentials);
      // data.user should come from your backend after successful login
      setProfile(data.user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  

  const logout = () => {
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!profile,
        profile,
        login,
        logout,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
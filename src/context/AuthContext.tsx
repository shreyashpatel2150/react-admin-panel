import { createContext, ReactNode, useContext, useState } from "react";
import type { UserInterface } from "../interfaces/UserInterface";

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserInterface | null;
  updateUser: (userData: UserInterface) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("token");
    const [user, setUser] = useState<UserInterface | null>(null);

    const updateUser = (userData: UserInterface) => {
        setUser(userData);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthContext, useAuth };
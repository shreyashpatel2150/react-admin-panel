import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";

interface AurhGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AurhGuardProps) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export default AuthGuard;
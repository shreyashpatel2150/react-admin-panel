import { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import type { UserInterface } from '../interfaces/UserInterface'
import { useLazyGetUserQuery } from '../apis/UserApi'

type AuthContextType = {
    isAuthenticated: boolean
    user: UserInterface | null
    updateUser: (userData: UserInterface) => void
    refreshUser: () => void
    isLoadingUser: boolean
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token')
    const [user, setUser] = useState<UserInterface | null>(null)

    // Use lazy query for manual on-demand fetching
    const [fetchUser, { data: fetchedUser, isLoading: isLoadingUser }] = useLazyGetUserQuery()

    // Update local user state when fetched data changes
    useEffect(() => {
        if (fetchedUser) {
            setUser(fetchedUser)
        }
    }, [fetchedUser])

    const updateUser = (userData: UserInterface) => {
        setUser(userData)
    }

    // Manually refresh user data from server (call this when you need user data)
    const refreshUser = () => {
        if (isAuthenticated) {
            fetchUser(void 0) // Trigger the lazy query
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)

        // need to make api call to destroy server session
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, updateUser, refreshUser, isLoadingUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthContext, useAuth };
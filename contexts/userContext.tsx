'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { setTokens } from '@/service/api';

/**
 * Interface representing the Decoded JWT Payload
 */
interface UserData {
    sub: string;
    jti: string;
    FullName: string;
    Owner: string; // This represents the Role based on the example provided
    exp: number;
    isVerified: boolean;
    iss: string;
    aud: string;
}

/**
 * Interface for Login Response
 */
interface AuthResponse {
    access_token: string;
    refresh_token: string; // Maintain typo from user's request
}

interface UserContextType {
    user: UserData | null;
    accessToken: string | null;
    refreshToken: string | null;
    login: (tokens: AuthResponse) => void;
    logout: () => void;
    isVerified: boolean;
    setIsVerified: (isVerified: boolean) => void;
    isLoading: boolean; 
}

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Dynamic JWT Decoder
 * Safely decodes the payload of a JWT string.
 */
const decodeJWT = (token: string): UserData | null => {
    try {
        const base64Url = token.split('.')[1];
        if (!base64Url) return null;

        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Failed to decode JWT:', error);
        return null;
    }
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    // Relying solely on state variables for token management.
    // Note: This will reset the session on page refresh.
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('access_token');
        const storedRefreshToken = localStorage.getItem('refresh_token');

        if (storedAccessToken && storedRefreshToken) {
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
            setTokens(storedAccessToken, storedRefreshToken);
            const decoded = decodeJWT(storedAccessToken);
            setUser(decoded);
        }
        setIsLoading(false);
    }, []);

    /**
     * Log into the application
     * Updates context state and sets API client headers.
     */
    const login = (tokens: AuthResponse) => {
        localStorage.setItem('access_token', tokens.access_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);

        setAccessToken(tokens.access_token);
        setRefreshToken(tokens.refresh_token);

        // Sync with API Client
        setTokens(tokens.access_token, tokens.refresh_token);

        // Decode and set User Data
        const decoded = decodeJWT(tokens.access_token);
        setUser(decoded);
    };

    /**
     * Log out of the application
     * Resets context state and resets API client headers.
     */
    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);

        // Clear API Client Tokens
        setTokens(null, null);
    };

    return (
        <UserContext.Provider value={{ user, accessToken, refreshToken,isVerified,setIsVerified, login, logout, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

/**
 * Custom hook to use the UserContext
 */
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
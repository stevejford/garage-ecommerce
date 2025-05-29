"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk, SignedIn, SignedOut } from "@clerk/nextjs";

// Define the auth context type
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  isClerkLoaded: boolean;
  hasError: boolean;
  user: any | null;
  signOut: () => Promise<void>;
};

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  isClerkLoaded: false,
  hasError: false,
  user: null,
  signOut: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isLoaded: isUserLoaded } = useUser();
  const { signOut: clerkSignOut } = useClerk();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isClerkLoaded, setIsClerkLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Check if Clerk is loaded properly
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        try {
          // Check if Clerk is available in the window object
          if ((window as any).__clerk) {
            setIsClerkLoaded(true);
          } else {
            console.error("Clerk failed to initialize");
            setHasError(true);
          }
        } catch (error) {
          console.error("Error checking Clerk initialization:", error);
          setHasError(true);
        } finally {
          setIsLoading(false);
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Update loading state when user data is loaded
  useEffect(() => {
    if (isUserLoaded) {
      setIsLoading(false);
    }
  }, [isUserLoaded]);

  // Sign out function
  const signOut = async () => {
    try {
      if (isClerkLoaded) {
        await clerkSignOut();
      }
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Auth context value
  const value: AuthContextType = {
    isAuthenticated: !!user,
    isLoading,
    isClerkLoaded,
    hasError,
    user,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Auth guard component for protected content
export function AuthGuard({ 
  children, 
  fallback 
}: { 
  children: ReactNode, 
  fallback?: ReactNode 
}) {
  const defaultFallback = (
    <div className="p-4 text-center">
      <p>Please sign in to access this content.</p>
    </div>
  );

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>{fallback || defaultFallback}</SignedOut>
    </>
  );
}

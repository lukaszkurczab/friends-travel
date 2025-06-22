"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";

type AuthContextType = {
  userEmail: string | null;
  userId: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  userEmail: null,
  userId: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setLoading(false);
        setUserId(user.uid);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ userEmail, userId, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const useRegister = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const register = async (
    email: string,
    password: string,
    termsAccepted: boolean
  ): Promise<void> => {
    if (!termsAccepted) {
      alert("Musisz zaakceptować warunki umowy.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        isLinked: false,
        createdAt: new Date(),
      });

      router.push("/login");
    } catch (error) {
      console.error("Błąd rejestracji:", error);
      alert("Nie udało się utworzyć konta.");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};

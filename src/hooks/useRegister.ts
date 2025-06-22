import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";

export const useRegister = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
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
        firstName: firstName,
        lastName: lastName,
        isLinked: false,
        createdAt: new Date(),
      });

      const tripRef = doc(db, "trips", "trip1");
      await updateDoc(tripRef, {
        members: arrayUnion(user.uid),
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

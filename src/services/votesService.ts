import { db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
} from "firebase/firestore";
import { VoteEntry } from "../types";

export async function updateUserVotes(
  tripId: string,
  userId: string,
  selectedDates: Date[]
) {
  const docRef = doc(db, "trips", tripId, "dateVotes", userId);

  const voteStrings = selectedDates.map((date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  await setDoc(docRef, { UID: userId, votes: voteStrings }, { merge: true });
}

export async function getUserVotes(tripId: string, userId: string) {
  const docRef = doc(db, "trips", tripId, "dateVotes", userId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return [];

  return (snapshot.data().votes || []) as string[];
}

export async function getAllVotes(tripId: string) {
  const colRef = collection(db, "trips", tripId, "dateVotes");
  const snapshot = await getDocs(query(colRef));

  const result: VoteEntry[] = [];

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const uid = data.UID;

    let firstName = "Nieznany";
    let lastName = "Użytkownik";

    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        firstName = userData.firstName || firstName;
        lastName = userData.lastName || lastName;
      }
    } catch (error) {
      console.warn(`Nie udało się pobrać danych użytkownika ${uid}:`, error);
    }

    if (uid && Array.isArray(data.votes)) {
      result.push({
        uid,
        firstName,
        lastName,
        votes: data.votes,
      });
    }
  }

  return result;
}

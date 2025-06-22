import { db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
} from "firebase/firestore";

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

  const result: Record<string, string[]> = {};

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.UID && Array.isArray(data.votes)) {
      result[data.UID] = data.votes;
    }
  });

  return result;
}

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { User } from "../types";

export const fetchStudentById = async (nmId: string) => {
  try {
    const studentRef = doc(db, "users", nmId); // Reference to document
    const studentSnap = await getDoc(studentRef); // Fetch the document

    if (!studentSnap.exists()) {
      console.log("No student found with this ID.");
      return null;
    }

    const studentData = { id: studentSnap.id, ...studentSnap.data() } as User;
    // console.log("Fetched Student:", studentData);
    return studentData;
  } catch (error) {
    console.error("Error fetching student:", error);
    return null;
  }
};

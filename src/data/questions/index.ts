import { Question } from "../../types";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

// Function to transform Firestore data to Question type
const transformFirestoreData = (doc: any): Question => {
  const data = doc.data();
  const _options = [data.OptionA, data.OptionB, data.OptionC, data.OptionD];

  const answerIndexMap: { [key: string]: number } = { A: 0, B: 1, C: 2, D: 3 };
  const correctAnswerIndex = answerIndexMap[data.CorrectAnswer] ?? -1;

  return {
    id: data.Id,
    text: data.Question,
    options: _options,
    correctAnswer:
      correctAnswerIndex >= 0 ? _options[correctAnswerIndex] : "Invalid Answer", // Keep as string
    section: data.Section,
  };
};

// Function to fetch questions for a specific course
const fetchQuestions = async (courseType: string): Promise<Question[]> => {
  // console.log(courseType);
  const q = query(
    collection(db, "questions"),
    where("TestId", "==", courseType)
  );

  try {
    const querySnapshot = await getDocs(q);
    const questions = querySnapshot.docs.map((doc) => {
      // console.log(doc.data());
      return transformFirestoreData(doc);
    });
    return questions.sort((a, b) => a.id - b.id); // Sort by question ID
  } catch (error) {
    console.error(`Error fetching ${courseType} questions:`, error);
    return [];
  }
};

// Cache for storing fetched questions
let questionsCache: Record<string, Question[]> = {};

// Function to get questions with caching
export const getQuestions = async (courseId: string): Promise<Question[]> => {
  // If questions are already in cache, return them
  if (questionsCache[courseId]) {
    return questionsCache[courseId];
  }

  // Fetch questions and store in cache
  const questions = await fetchQuestions(courseId);
  questionsCache[courseId] = questions;
  return questions;
};

// Default export for backward compatibility
const QuizQuestions: Record<string, Question[]> = {};
export default QuizQuestions;

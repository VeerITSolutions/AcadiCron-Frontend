import Questions from "@/components/questions";
import { categoryOptions, difficultyOptions } from "@/constants";
import { redirect, notFound } from "next/navigation";
import PageProps from "next"; // Import PageProps
import "./questions.css";

export const fetchCache = "force-no-store";

async function getData(category: string, difficulty: string, limit: string) {
  const res = await fetch(
    `https://the-trivia-api.com/api/questions?categories=${category}&limit=${limit}&type=multiple&difficulty=${difficulty}`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  return res.json();
}

const QuestionsPage = async ({ searchParams }: any) => {
  // Ensure values are valid strings
  const category =
    typeof searchParams?.category === "string" ? searchParams.category : "";
  const difficulty =
    typeof searchParams?.difficulty === "string" ? searchParams.difficulty : "";
  const limit =
    typeof searchParams?.limit === "string" ? searchParams.limit : "";

  // Validation Functions
  const validateCategory = (category: string) =>
    categoryOptions.some((option) => option.value === category);

  const validateDifficulty = (difficulty: string) =>
    difficultyOptions.some((option) => option.value === difficulty);

  const validateLimit = (limit: string) => {
    const parsedLimit = parseInt(limit, 10);
    return !isNaN(parsedLimit) && parsedLimit >= 5 && parsedLimit <= 50;
  };

  // Redirect if invalid
  if (
    !validateCategory(category) ||
    !validateDifficulty(difficulty) ||
    !validateLimit(limit)
  ) {
    return notFound(); // Alternative: return redirect("/");
  }

  // Fetch Data
  const response = await getData(category, difficulty, limit);

  return (
    <Questions
      questions={response}
      limit={parseInt(limit, 10)}
      category={category}
    />
  );
};

export default QuestionsPage;
